// Simple Web Push implementation for Deno
// Based on web-push specification

interface PushSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

interface PushPayload {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  requireInteraction?: boolean;
  vibrate?: number[];
  data?: any;
  actions?: Array<{
    action: string;
    title: string;
  }>;
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

async function generateVAPIDHeaders(
  endpoint: string,
  vapidPublicKey: string,
  vapidPrivateKey: string
): Promise<Record<string, string>> {
  const url = new URL(endpoint);
  const audience = `${url.protocol}//${url.host}`;
  
  const jwtHeader = {
    typ: 'JWT',
    alg: 'ES256'
  };
  
  const jwtPayload = {
    aud: audience,
    exp: Math.floor(Date.now() / 1000) + 12 * 60 * 60, // 12 hours
    sub: 'mailto:admin@example.com'
  };
  
  // Simple base64 encoding for header and payload
  const headerEncoded = btoa(JSON.stringify(jwtHeader)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const payloadEncoded = btoa(JSON.stringify(jwtPayload)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  
  const unsignedToken = `${headerEncoded}.${payloadEncoded}`;
  
  // For simplicity, we'll use the public key in Authorization header
  // In production, you'd properly sign the JWT with the private key
  
  return {
    'Authorization': `vapid t=${unsignedToken}, k=${vapidPublicKey}`,
    'Crypto-Key': `p256ecdsa=${vapidPublicKey}`,
    'TTL': '86400'
  };
}

export async function sendWebPushNotification(
  subscription: PushSubscription,
  payload: PushPayload,
  vapidPublicKey: string,
  vapidPrivateKey: string
): Promise<boolean> {
  try {
    const payloadString = JSON.stringify(payload);
    
    // Generate VAPID headers
    const vapidHeaders = await generateVAPIDHeaders(
      subscription.endpoint,
      vapidPublicKey,
      vapidPrivateKey
    );
    
    // Send push notification
    const response = await fetch(subscription.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Encoding': 'aes128gcm',
        ...vapidHeaders
      },
      body: payloadString
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Push failed (${response.status}):`, errorText);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('❌ Error sending push notification:', error);
    return false;
  }
}
