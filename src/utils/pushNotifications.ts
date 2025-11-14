import { supabase } from "@/integrations/supabase/client";

const VAPID_PUBLIC_KEY = "BE0iQCkyxjqUgH0jyffnU9dk6v9fsd2dVvnVqTKuvwBzBR-J4JdD_FyKDcpFrByq5y8XGcQscciqT4--tTtrAso";

/**
 * Convert VAPID public key to Uint8Array
 */
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

/**
 * Check if push notifications are supported
 */
export function isPushNotificationSupported(): boolean {
  return 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
}

/**
 * Request notification permission from user
 */
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!isPushNotificationSupported()) {
    throw new Error('Push notifications are not supported in this browser');
  }

  const permission = await Notification.requestPermission();
  console.log('📱 Notification permission:', permission);
  return permission;
}

/**
 * Subscribe to push notifications
 */
export async function subscribeToPushNotifications(
  userId?: string,
  prayerNotificationsEnabled = true,
  adhanSoundEnabled = true
): Promise<PushSubscription | null> {
  try {
    console.log('🔔 Starting push notification subscription...');

    // Check if supported
    if (!isPushNotificationSupported()) {
      throw new Error('Push notifications not supported');
    }

    // Request permission
    const permission = await requestNotificationPermission();
    if (permission !== 'granted') {
      console.log('❌ Notification permission denied');
      return null;
    }

    // Get service worker registration
    const registration = await navigator.serviceWorker.ready;
    console.log('✅ Service worker ready');

    // Subscribe to push notifications
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY) as BufferSource
    });

    console.log('✅ Push subscription created:', subscription.endpoint);

    // Save subscription to database
    const { data, error } = await supabase.functions.invoke('subscribe-push', {
      body: {
        subscription: subscription.toJSON(),
        userId: userId || `user-${Date.now()}`,
        prayerNotificationsEnabled,
        adhanSoundEnabled
      }
    });

    if (error) {
      console.error('❌ Error saving subscription:', error);
      throw error;
    }

    console.log('✅ Subscription saved to database');
    
    // Store subscription settings locally
    localStorage.setItem('pushNotificationsEnabled', 'true');
    localStorage.setItem('prayerNotificationsEnabled', prayerNotificationsEnabled.toString());
    localStorage.setItem('adhanSoundEnabled', adhanSoundEnabled.toString());

    return subscription;
  } catch (error) {
    console.error('❌ Error subscribing to push notifications:', error);
    throw error;
  }
}

/**
 * Unsubscribe from push notifications
 */
export async function unsubscribeFromPushNotifications(): Promise<void> {
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    if (subscription) {
      await subscription.unsubscribe();
      console.log('✅ Unsubscribed from push notifications');
      
      // Clear local storage
      localStorage.removeItem('pushNotificationsEnabled');
      localStorage.removeItem('prayerNotificationsEnabled');
      localStorage.removeItem('adhanSoundEnabled');
    }
  } catch (error) {
    console.error('❌ Error unsubscribing:', error);
    throw error;
  }
}

/**
 * Check if user is currently subscribed
 */
export async function isSubscribedToPushNotifications(): Promise<boolean> {
  try {
    if (!isPushNotificationSupported()) {
      return false;
    }

    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    
    return subscription !== null;
  } catch (error) {
    console.error('❌ Error checking subscription:', error);
    return false;
  }
}

/**
 * Get current push subscription
 */
export async function getCurrentPushSubscription(): Promise<PushSubscription | null> {
  try {
    if (!isPushNotificationSupported()) {
      return null;
    }

    const registration = await navigator.serviceWorker.ready;
    return await registration.pushManager.getSubscription();
  } catch (error) {
    console.error('❌ Error getting subscription:', error);
    return null;
  }
}

/**
 * Update subscription settings
 */
export async function updateSubscriptionSettings(
  prayerNotificationsEnabled: boolean,
  adhanSoundEnabled: boolean
): Promise<void> {
  try {
    const subscription = await getCurrentPushSubscription();
    if (!subscription) {
      throw new Error('No active subscription found');
    }

    const userId = localStorage.getItem('userId') || `user-${Date.now()}`;

    const { error } = await supabase.functions.invoke('subscribe-push', {
      body: {
        subscription: subscription.toJSON(),
        userId,
        prayerNotificationsEnabled,
        adhanSoundEnabled
      }
    });

    if (error) throw error;

    // Update local storage
    localStorage.setItem('prayerNotificationsEnabled', prayerNotificationsEnabled.toString());
    localStorage.setItem('adhanSoundEnabled', adhanSoundEnabled.toString());

    console.log('✅ Subscription settings updated');
  } catch (error) {
    console.error('❌ Error updating subscription settings:', error);
    throw error;
  }
}
