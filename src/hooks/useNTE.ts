// Consolidated clean implementation of the useNTE hook
import { useState, useEffect, useCallback } from 'react';
import nteClient from '../lib/nteClient';

interface UseNTEHook {
  ready: boolean;
  permission: NotificationPermission | 'unknown';
  subscription: any | null;
  error: any;
  requestPermission: () => Promise<any>;
  getSubscription: () => Promise<any>;
  sendForegroundNotification: (title: string, body: string, options?: object) => Promise<any>;
  triggerEvent: (eventName: string, eventData: object, notificationConfig: object) => Promise<any>;
  ping: () => Promise<any>;
}

const NTE_PERMISSION_KEY = 'nteNotificationPermission';

const useNTE = (): UseNTEHook => {
  const [ready, setReady] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission | 'unknown'>(() => {
    try {
      return (localStorage.getItem(NTE_PERMISSION_KEY) as NotificationPermission) || 'unknown';
    } catch (e) {
      return 'unknown';
    }
  });
  const [subscription, setSubscription] = useState<any | null>(null);
  const [error, setError] = useState<any>(null);

  const updatePermission = useCallback((newPermission: NotificationPermission | 'unknown') => {
    setPermission(newPermission);
    try { localStorage.setItem(NTE_PERMISSION_KEY, newPermission); } catch (e) {}
  }, []);

  useEffect(() => {
    // initialize iframe (create if missing)
    nteClient.init({ iframeId: 'nte-iframe', createIfMissing: true });

    nteClient.onReady = () => {
      setReady(true);
      // Sync permission
      if (Notification && Notification.permission) {
        updatePermission(Notification.permission as NotificationPermission);
      }
    };

    nteClient.onPermissionResponse = (data: any) => {
      const p = data && data.permission ? data.permission : (Notification && Notification.permission) || 'unknown';
      updatePermission(p);
    };

    nteClient.onSubscription = (data: any) => {
      setSubscription(data && data.subscription ? data.subscription : null);
    };

    nteClient.onError = (err: any) => {
      setError(err);
      console.error('[useNTE] NTE Error:', err);
    };

    // initial sync
    if (Notification && Notification.permission && Notification.permission !== permission) {
      updatePermission(Notification.permission as NotificationPermission);
    }

    return () => {
      nteClient.onReady = undefined;
      nteClient.onPermissionResponse = undefined;
      nteClient.onSubscription = undefined;
      nteClient.onError = undefined;
    };
  }, [permission, updatePermission]);

  const requestPermission = useCallback(() => {
    return nteClient.requestPermission().then((r) => {
      const p = r && r.permission ? r.permission : (Notification && Notification.permission) || 'unknown';
      updatePermission(p);
      return r;
    }).catch((err) => { throw err; });
  }, [updatePermission]);

  const getSubscription = useCallback(() => {
    return nteClient.getSubscription().then((r) => {
      if (r && r.subscription) setSubscription(r.subscription);
      return r;
    });
  }, []);

  const sendForegroundNotification = useCallback((title: string, body: string, options?: object) => {
    return nteClient.sendForegroundNotification(title, body, (options && (options as any).icon) || '/icon-192.png', options || {});
  }, []);

  const triggerEvent = useCallback((eventName: string, eventData: object, notificationConfig: object) => {
    return nteClient.triggerEvent(eventName, eventData, notificationConfig);
  }, []);

  const ping = useCallback(() => nteClient.ping(), []);

  return {
    ready,
    permission,
    subscription,
    error,
    requestPermission,
    getSubscription,
    sendForegroundNotification,
    triggerEvent,
    ping
  };
};

export default useNTE;
