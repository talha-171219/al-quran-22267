import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('📱 Subscribe push endpoint called');
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { 
      subscription, 
      userId, 
      prayerNotificationsEnabled = true, 
      adhanSoundEnabled = true 
    } = await req.json();

    console.log('📝 Subscription data received:', {
      endpoint: subscription.endpoint,
      userId,
      prayerNotificationsEnabled,
      adhanSoundEnabled
    });

    if (!subscription || !subscription.endpoint) {
      return new Response(
        JSON.stringify({ error: 'Invalid subscription data' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if subscription already exists
    const { data: existing } = await supabase
      .from('push_subscriptions')
      .select('id')
      .eq('endpoint', subscription.endpoint)
      .single();

    if (existing) {
      // Update existing subscription
      const { error: updateError } = await supabase
        .from('push_subscriptions')
        .update({
          keys: subscription.keys,
          prayer_notifications_enabled: prayerNotificationsEnabled,
          adhan_sound_enabled: adhanSoundEnabled,
          user_id: userId || 'anonymous',
          updated_at: new Date().toISOString()
        })
        .eq('endpoint', subscription.endpoint);

      if (updateError) {
        console.error('❌ Error updating subscription:', updateError);
        throw updateError;
      }

      console.log('✅ Subscription updated successfully');
      return new Response(
        JSON.stringify({ success: true, message: 'Subscription updated' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Insert new subscription
    const { error: insertError } = await supabase
      .from('push_subscriptions')
      .insert({
        user_id: userId || 'anonymous',
        endpoint: subscription.endpoint,
        keys: subscription.keys,
        prayer_notifications_enabled: prayerNotificationsEnabled,
        adhan_sound_enabled: adhanSoundEnabled
      });

    if (insertError) {
      console.error('❌ Error inserting subscription:', insertError);
      throw insertError;
    }

    console.log('✅ Subscription saved successfully');
    return new Response(
      JSON.stringify({ success: true, message: 'Subscription saved' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('❌ Error in subscribe-push function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
