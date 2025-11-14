import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Bengali prayer names
const bengaliPrayerNames: Record<string, string> = {
  fajr: 'ফজর',
  dhuhr: 'যুহর',
  asr: 'আসর',
  maghrib: 'মাগরিব',
  isha: 'এশা'
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🕌 Send prayer notification endpoint called');
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const vapidPublicKey = Deno.env.get('VAPID_PUBLIC_KEY')!;
    const vapidPrivateKey = Deno.env.get('VAPID_PRIVATE_KEY')!;

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { prayerName, prayerTime } = await req.json();
    
    if (!prayerName) {
      return new Response(
        JSON.stringify({ error: 'Prayer name is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`📢 Sending ${prayerName} prayer notification`);

    // Get all active subscriptions with prayer notifications enabled
    const { data: subscriptions, error: fetchError } = await supabase
      .from('push_subscriptions')
      .select('*')
      .eq('prayer_notifications_enabled', true);

    if (fetchError) {
      console.error('❌ Error fetching subscriptions:', fetchError);
      throw fetchError;
    }

    if (!subscriptions || subscriptions.length === 0) {
      console.log('ℹ️ No active subscriptions found');
      return new Response(
        JSON.stringify({ success: true, message: 'No active subscriptions', sent: 0 }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`📱 Found ${subscriptions.length} active subscriptions`);

    let successCount = 0;
    let failureCount = 0;

    const bengaliName = bengaliPrayerNames[prayerName.toLowerCase()] || prayerName;
    const notification = {
      title: `${bengaliName} নামাজের সময়`,
      body: `${bengaliName} নামাজের সময় হয়ে গেছে। নামাজ পড়ুন।`,
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      tag: `prayer-${prayerName}`,
      requireInteraction: true,
      vibrate: [200, 100, 200, 100, 200],
      data: {
        prayerName,
        type: 'prayer-time',
        url: '/',
        timestamp: Date.now()
      },
      actions: [
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

    // Send notifications to all subscriptions
    for (const sub of subscriptions) {
      try {
        const pushSubscription = {
          endpoint: sub.endpoint,
          keys: sub.keys
        };

        // Use web-push to send notification
        const response = await fetch('https://fcm.googleapis.com/fcm/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `key=${vapidPublicKey}`,
            'TTL': '86400'
          },
          body: JSON.stringify({
            notification: notification,
            to: pushSubscription.endpoint
          })
        });

        if (response.ok) {
          successCount++;
          console.log(`✅ Notification sent to ${sub.user_id}`);
        } else {
          failureCount++;
          console.error(`❌ Failed to send notification to ${sub.user_id}:`, await response.text());
        }
      } catch (error) {
        failureCount++;
        console.error(`❌ Error sending notification to ${sub.user_id}:`, error);
      }
    }

    // Log the notification send
    await supabase
      .from('prayer_notifications_log')
      .insert({
        prayer_name: prayerName,
        prayer_time: prayerTime || new Date().toISOString(),
        recipients_count: subscriptions.length,
        success_count: successCount,
        failure_count: failureCount
      });

    console.log(`📊 Notification summary: ${successCount} sent, ${failureCount} failed`);

    return new Response(
      JSON.stringify({
        success: true,
        sent: successCount,
        failed: failureCount,
        total: subscriptions.length
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('❌ Error in send-prayer-notification function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
