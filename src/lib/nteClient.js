// Single NTE client implementation
// Allow overriding the NTE URL/origin via Vite env vars for production/dev:
// - VITE_NTE_URL (iframe src)
// - VITE_NTE_ORIGIN (origin used for postMessage checks)
const envNteUrl = import.meta.env && import.meta.env.VITE_NTE_URL ? import.meta.env.VITE_NTE_URL : null;
const envNteOrigin = import.meta.env && import.meta.env.VITE_NTE_ORIGIN ? import.meta.env.VITE_NTE_ORIGIN : null;
const NTE_URL = envNteUrl || 'https://silent-notify-engine2.vercel.app';
let computedOrigin = null;
try {
  computedOrigin = new URL(NTE_URL, typeof window !== 'undefined' ? window.location.href : NTE_URL).origin;
} catch (e) {
  computedOrigin = 'https://silent-notify-engine2.vercel.app';
}
const NTE_ORIGIN = envNteOrigin || computedOrigin;

class NTEClient {
  constructor() {
    this.iframe = null;
    this.isReady = false;
    this.messageHandlers = new Map();
    this.pendingRequests = new Map();
    this.requestCounter = 1;
    this.iframeOrigin = null;

    this.responseTimeout = 30000; // ms (increase for production-level reliability)
    this._onMessage = this._onMessage.bind(this);
    window.addEventListener('message', this._onMessage);
    console.debug('[NTE Client] constructed');
  }

  init({ iframeId = 'nte-iframe', createIfMissing = false } = {}) {
    this.iframe = document.getElementById(iframeId);
    if (!this.iframe && createIfMissing) {
      this.iframe = document.createElement('iframe');
      this.iframe.id = iframeId;
      this.iframe.src = NTE_URL;
      this.iframe.style.display = 'none';
      this.iframe.title = 'Notification Engine';
      this.iframe.addEventListener('load', () => {
        console.info('[NTE Client] iframe loaded:', this.iframe && this.iframe.src);
        try {
          const src = this.iframe.getAttribute('src') || this.iframe.src || '';
          if (src) this.iframeOrigin = new URL(src, window.location.href).origin;
        } catch (e) {
          this.iframeOrigin = null;
        }
      });
      document.body.appendChild(this.iframe);
    }

    if (!this.iframe) {
      console.error('[NTE Client] iframe not found');
      return false;
    }

    // compute iframe origin for postMessage target
    try {
      const src = this.iframe.getAttribute('src') || this.iframe.src || '';
      if (src) {
        try {
          this.iframeOrigin = new URL(src, window.location.href).origin;
        } catch (e) {
          this.iframeOrigin = null;
        }
      }
    } catch (e) {
      this.iframeOrigin = null;
    }

    // ping to check readiness. If we created the iframe just now, wait until it finishes loading
    // to improve chances of a timely response from the remote NTE.
    try {
      if (createIfMissing && this.iframe) {
        const loadOrTimeout = new Promise((resolve) => {
          let settled = false;
          const onLoad = () => { if (!settled) { settled = true; resolve(); } };
          this.iframe.addEventListener('load', onLoad, { once: true });
          // Fallback timeout: resolve after 4s so we still attempt to ping
          setTimeout(() => { if (!settled) { settled = true; resolve(); } }, 4000);
        });
        loadOrTimeout.then(() => this.ping()).catch(() => this.ping());
      } else {
        this.ping();
      }
    } catch (e) {
      // ensure we still attempt to ping even on unexpected errors
      this.ping();
    }
    return true;
  }

  _onMessage(event) {
    if (!event || !event.origin) return;
    // Accept messages from configured NTE origin or iframe's real origin (useful in dev where iframe may be proxied)
    if (event.origin !== NTE_ORIGIN && event.origin !== this.iframeOrigin) return;

    const payload = event.data || {};
    const { type, requestId, data, error } = payload;
    console.debug('[NTE Client] message received', { origin: event.origin, type, requestId, data, error });

    if (type === 'NTE_READY') {
      this.isReady = true;
      this.onReady && this.onReady();
    }

    if (requestId && this.pendingRequests.has(requestId)) {
      const entry = this.pendingRequests.get(requestId);
      this.pendingRequests.delete(requestId);
      if (entry && entry.timeoutId) clearTimeout(entry.timeoutId);
      const { resolve, reject } = entry || {};
      if (error) return reject(error);
      return resolve(data);
    }

    // Backwards-compatibility: some NTE implementations reply to PING with a PONG but omit requestId.
    // Treat an un-keyed PONG as success for the oldest pending PING request.
    if (!requestId && type === 'PONG') {
      this.isReady = true;
      this.onReady && this.onReady();
      for (const [rid, entry] of this.pendingRequests.entries()) {
        try {
          if (entry && entry.payload && entry.payload.type === 'PING') {
            if (entry.timeoutId) clearTimeout(entry.timeoutId);
            try { entry.resolve(data || true); } catch(e) {}
            this.pendingRequests.delete(rid);
            break;
          }
        } catch (e) {
          // ignore and continue
        }
      }
    }

    switch (type) {
      case 'PERMISSION_RESPONSE':
        this.onPermissionResponse && this.onPermissionResponse(data);
        break;
      case 'SUBSCRIPTION_RESPONSE':
        this.onSubscription && this.onSubscription(data);
        break;
      case 'ERROR':
        this.onError && this.onError(error || data);
        break;
      default:
        const handler = this.messageHandlers.get(type);
        if (handler) handler(data, error);
        break;
    }
  }

  _postMessage(message, expectResponse = true) {
    if (!this.iframe || !this.iframe.contentWindow) return Promise.reject(new Error('NTE iframe not initialized'));
    const requestId = `r_${Date.now()}_${this.requestCounter++}`;
    const payload = Object.assign({}, message, { requestId });
    return new Promise((resolve, reject) => {
      if (expectResponse) {
        const timeoutId = setTimeout(() => {
          if (this.pendingRequests.has(requestId)) {
            this.pendingRequests.delete(requestId);
            reject(new Error('NTE response timeout'));
          }
        }, this.responseTimeout);
        // store the original payload so we can match legacy responses that omit requestId
        this.pendingRequests.set(requestId, { resolve, reject, timeoutId, payload });
      }

      try {
        // Prefer the iframe's actual origin when available; fall back to configured NTE_ORIGIN.
        // On localhost (dev/preview) the iframe may be proxied and the origin may not match
        // — using '*' avoids uncatchable DOM exceptions in that case while still working.
        const isLocalhost = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
          const targetOrigin = isLocalhost ? '*' : (this.iframeOrigin || NTE_ORIGIN || '*');
        console.debug('[NTE Client] postMessage ->', { payload, targetOrigin });
        this.iframe.contentWindow.postMessage(payload, targetOrigin);
        if (!expectResponse) resolve(true);
      } catch (err) {
        if (expectResponse) this.pendingRequests.delete(requestId);
        console.error('[NTE Client] postMessage error', err);
        reject(err);
      }
    });
  }

  requestPermission() {
    return this._postMessage({ type: 'REQUEST_PERMISSION' }, true).catch(async (err) => {
      console.warn('[NTE Client] requestPermission via iframe failed, falling back to Notification.requestPermission()', err);
      if (typeof window !== 'undefined' && 'Notification' in window && Notification.requestPermission) {
        try {
          const p = await Notification.requestPermission();
          return { permission: p };
        } catch (e) {
          throw e;
        }
      }
      throw err;
    });
  }
  getSubscription() { return this._postMessage({ type: 'GET_SUBSCRIPTION' }, true); }
  triggerEvent(eventName, eventData = {}, notificationConfig = {}) {
    return this._postMessage({ type: 'TRIGGER_EVENT', payload: { eventName, eventData, notificationConfig } }, true);
  }
  sendForegroundNotification(title, body, icon, options = {}) {
    return this._postMessage({ type: 'SEND_FOREGROUND_NOTIFICATION', payload: { title, body, icon, options } }, false);
  }
  async ping() {
    try {
      await this._postMessage({ type: 'PING' }, true);
      return true;
    } catch (err) {
      // retry once after a brief pause before considering it failed
      await new Promise((r) => setTimeout(r, 1000));
      try {
        await this._postMessage({ type: 'PING' }, true);
        return true;
      } catch (err2) {
        // Silently fail - NTE server might be slow or unavailable
        // Only log in development mode
        if (!import.meta.env.PROD) {
          console.warn('[NTE Client] ping failed after retry', err2);
        }
        return null;
      }
    }
  }
  on(messageType, handler) { this.messageHandlers.set(messageType, handler); }
  off(messageType) { this.messageHandlers.delete(messageType); }
}

const nteClient = new NTEClient();
if (typeof window !== 'undefined') window.nteClient = nteClient;
export default nteClient;
