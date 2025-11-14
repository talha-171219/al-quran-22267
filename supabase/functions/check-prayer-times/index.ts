import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Default location: Dhaka, Bangladesh
const DEFAULT_CITY = "Dhaka";
const DEFAULT_COUNTRY = "Bangladesh";
const DEFAULT_METHOD = 2; // Muslim World League

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('⏰ Check prayer times cron job started');
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get current time in Bangladesh timezone
    const now = new Date();
    const bangladeshTime = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Dhaka',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(now);

    console.log(`🕐 Current time in Dhaka: ${bangladeshTime}`);

    // Fetch today's prayer times from Aladhan API
    const date = now.toISOString().split('T')[0];
    const prayerTimesUrl = `https://api.aladhan.com/v1/timingsByCity/${date}?city=${DEFAULT_CITY}&country=${DEFAULT_COUNTRY}&method=${DEFAULT_METHOD}`;
    
    console.log(`📡 Fetching prayer times from: ${prayerTimesUrl}`);
    
    const prayerTimesResponse = await fetch(prayerTimesUrl);
    const prayerTimesData = await prayerTimesResponse.json();

    if (!prayerTimesData.data) {
      throw new Error('Failed to fetch prayer times');
    }

    const timings = prayerTimesData.data.timings;
    console.log('🕌 Prayer times fetched:', timings);

    const prayers = [
      { name: 'fajr', time: timings.Fajr },
      { name: 'dhuhr', time: timings.Dhuhr },
      { name: 'asr', time: timings.Asr },
      { name: 'maghrib', time: timings.Maghrib },
      { name: 'isha', time: timings.Isha }
    ];

    const currentTime = bangladeshTime.split(', ')[1]; // Get HH:MM format
    const [currentHour, currentMinute] = currentTime.split(':').map(Number);

    console.log(`🔍 Checking if any prayer time matches: ${currentHour}:${currentMinute}`);

    // Check if current time matches any prayer time (within 1 minute window)
    for (const prayer of prayers) {
      const [prayerHour, prayerMinute] = prayer.time.split(':').map(Number);
      
      // Check if we're within 1 minute of prayer time
      if (currentHour === prayerHour && Math.abs(currentMinute - prayerMinute) <= 1) {
        console.log(`✅ Prayer time matched: ${prayer.name} at ${prayer.time}`);

        // Check if we already sent this notification today
        const todayStart = new Date(now);
        todayStart.setHours(0, 0, 0, 0);
        
        const { data: recentLog } = await supabase
          .from('prayer_notifications_log')
          .select('id')
          .eq('prayer_name', prayer.name)
          .gte('sent_at', todayStart.toISOString())
          .single();

        if (recentLog) {
          console.log(`ℹ️ Notification already sent for ${prayer.name} today`);
          continue;
        }

        // Send prayer notification
        console.log(`📤 Sending notification for ${prayer.name}`);
        
        const notificationResponse = await fetch(`${supabaseUrl}/functions/v1/send-prayer-notification`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseKey}`
          },
          body: JSON.stringify({
            prayerName: prayer.name,
            prayerTime: new Date().toISOString()
          })
        });

        if (!notificationResponse.ok) {
          console.error(`❌ Failed to send ${prayer.name} notification:`, await notificationResponse.text());
        } else {
          console.log(`✅ ${prayer.name} notification sent successfully`);
        }
      }
    }

    console.log('✅ Prayer times check completed');

    return new Response(
      JSON.stringify({ 
        success: true, 
        checked: prayers.length,
        currentTime: bangladeshTime
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('❌ Error in check-prayer-times function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
