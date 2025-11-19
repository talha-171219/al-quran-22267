const NTE_ORIGIN = 'https://silent-notify-engine2.vercel.app';

type Handler = (data?: any, error?: any) => void;

class NTEClient {
  iframe: HTMLIFrameElement | null = null;
  isReady = false;
  messageHandlers = new Map<string, Handler>();

  // Optional callbacks
  onReady?: () => void;
  onPermissionResponse?: (data: any) => void;
  onSubscription?: (data: any) => void;
  onError?: (err: any) => void;

  constructor() {
    window.addEventListener('message', this.handleMessage.bind(this));
  }

  init() {
    this.iframe = document.getElementById('nte-iframe') as HTMLIFrameElement | null;

    if (!this.iframe) {
      console.error('[NTE Client] Iframe not found');
      return false;
    }

    console.log('[NTE Client] Initialized');
    return true;
  }

  handleMessage(event: MessageEvent) {
    if (event.origin !== NTE_ORIGIN) {
      return;
    }

    const { type, data, error } = event.data || {};
    console.log('[NTE Client] Message received:', type);

    switch (type) {
      case 'NTE_READY':
        this.isReady = true;
        this.onReady && this.onReady();
        break;

      case 'PERMISSION_RESPONSE':
        this.onPermissionResponse && this.onPermissionResponse(data);
        break;

      case 'SUBSCRIPTION_RESPONSE':
        this.onSubscription && this.onSubscription(data);
        break;

      case 'ERROR':
        console.error('[NTE Client] Error:', error);
        this.onError && this.onError(error);
        break;

      case 'PONG':
        console.log('[NTE Client] Pong received');
        break;
    }

    const handler = this.messageHandlers.get(type);
    if (handler) {
      handler(data, error);
    }
  }

  sendMessage(message: any) {
    if (!this.iframe || !this.iframe.contentWindow) {
      console.error('[NTE Client] Iframe not initialized');
      return false;
    }

    this.iframe.contentWindow.postMessage(message, NTE_ORIGIN);
    return true;
  }

  requestPermission() {
    return this.sendMessage({ type: 'REQUEST_PERMISSION' });
  }

  getSubscription() {
    return this.sendMessage({ type: 'GET_SUBSCRIPTION' });
  }

  triggerEvent(eventName: string, eventData?: any, notificationConfig?: any) {
    return this.sendMessage({
      type: 'TRIGGER_EVENT',
      payload: {
        eventName,
        eventData,
        notificationConfig,
      },
    });
  }

  sendForegroundNotification(title: string, body: string, options: any = {}) {
    return this.sendMessage({
      type: 'SEND_FOREGROUND_NOTIFICATION',
      payload: {
        title,
        body,
        icon: options.icon || '/icon-192.png',
        badge: options.badge || '/icon-192.png',
        tag: options.tag || 'notification',
        data: options.data || {},
      },
    });
  }

  ping() {
    return this.sendMessage({ type: 'PING' });
  }

  on(messageType: string, handler: Handler) {
    this.messageHandlers.set(messageType, handler);
  }

  off(messageType: string) {
    this.messageHandlers.delete(messageType);
  }
}

const nteClient = new NTEClient();

export default nteClient;
