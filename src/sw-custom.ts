/// <reference lib="webworker" />
declare const self: ServiceWorkerGlobalScope;

// Extended NotificationOptions to include vibrate and actions
interface ExtendedNotificationOptions extends NotificationOptions {
  vibrate?: number[] | number;
  actions?: Array<{
    action: string;
    title: string;
    icon?: string;
  }>;
}

// Handle push notifications
self.addEventListener('push', (event: PushEvent) => {
  console.log('🔔 Push notification received:', event);

  if (!event.data) {
    console.log('❌ No data in push event');
    return;
  }

  try {
    const data = event.data.json();
    console.log('📱 Push notification data:', data);

    const options: ExtendedNotificationOptions = {
      body: data.body || 'নামাজের সময় হয়ে গেছে',
      icon: data.icon || '/icon-192.png',
      badge: data.badge || '/icon-192.png',
      vibrate: data.vibrate || [200, 100, 200, 100, 200],
      tag: data.tag || 'prayer-notification',
      requireInteraction: data.requireInteraction !== false,
      data: data.data || {},
      actions: data.actions || [
        {
          action: 'open',
          title: 'অ্যাপ খুলুন'
        },
        {
          action: 'play-adhan',
          title: '🔊 আযান শুনুন'
        }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(
        data.title || 'নামাজের সময়',
        options
      )
    );
  } catch (error) {
    console.error('❌ Error showing notification:', error);
    
    // Fallback notification
    const fallbackOptions: ExtendedNotificationOptions = {
      body: 'নামাজের সময় হয়ে গেছে',
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      vibrate: [200, 100, 200],
      requireInteraction: true
    };
    
    event.waitUntil(
      self.registration.showNotification('নামাজের সময়', fallbackOptions)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event: NotificationEvent) => {
  console.log('🔔 Notification clicked:', event.action);

  event.notification.close();

  if (event.action === 'play-adhan') {
    // Open app and play adhan
    event.waitUntil(
      self.clients.openWindow('/?play-adhan=true')
    );
  } else {
    // Just open the app
    event.waitUntil(
      self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
        // Focus existing window if available
        for (const client of clientList) {
          if (client.url === self.registration.scope && 'focus' in client) {
            return client.focus();
          }
        }
        // Otherwise open new window
        if (self.clients.openWindow) {
          return self.clients.openWindow('/');
        }
      })
    );
  }
});

// Handle push subscription changes
self.addEventListener('pushsubscriptionchange', (event: any) => {
  console.log('📱 Push subscription changed');

  event.waitUntil(
    self.registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: event.oldSubscription?.options?.applicationServerKey
    }).then((subscription) => {
      console.log('✅ Re-subscribed to push notifications');
      return fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscription)
      });
    })
  );
});

export {};
