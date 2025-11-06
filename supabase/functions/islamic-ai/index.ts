import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, useCustomKey, customApiKey } = await req.json();
    
    let apiKey: string;
    let apiUrl: string;
    let model: string;
    let requestBody: any;

    if (useCustomKey && customApiKey) {
      // Use custom Gemini API key
      apiKey = customApiKey;
      apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';
      
      // Convert messages to Gemini format
      const contents = messages.map((msg: any) => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));
      
      requestBody = {
        contents,
        systemInstruction: {
          parts: [{
            text: "আপনি একজন ইসলামিক বিশেষজ্ঞ যিনি ইসলাম সম্পর্কিত যেকোনো প্রশ্নের উত্তর দিতে পারেন। আপনার উত্তর কুরআন ও হাদিসের আলোকে হতে হবে। বাংলায় উত্তর দিন।"
          }]
        },
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
        }
      };
    } else {
      // Use Lovable AI
      const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
      if (!LOVABLE_API_KEY) {
        throw new Error('LOVABLE_API_KEY is not configured');
      }
      
      apiKey = LOVABLE_API_KEY;
      apiUrl = 'https://ai.gateway.lovable.dev/v1/chat/completions';
      model = 'google/gemini-2.5-flash';
      
      requestBody = {
        model,
        messages: [
          {
            role: 'system',
            content: 'আপনি একজন ইসলামিক বিশেষজ্ঞ যিনি ইসলাম সম্পর্কিত যেকোনো প্রশ্নের উত্তর দিতে পারেন। আপনার উত্তর কুরআন ও হাদিসের আলোকে হতে হবে। বাংলায় উত্তর দিন।'
          },
          ...messages
        ],
        stream: true
      };
    }

    let response: Response;
    
    if (useCustomKey && customApiKey) {
      // Gemini API request
      response = await fetch(`${apiUrl}?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      
      if (!response.ok) {
        const error = await response.text();
        console.error('Gemini API error:', error);
        return new Response(JSON.stringify({ error: 'AI service error' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      // Convert Gemini response to streaming format
      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      // Create SSE stream
      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(`data: ${JSON.stringify({ choices: [{ delta: { content: text } }] })}\n\n`);
          controller.enqueue(`data: [DONE]\n\n`);
          controller.close();
        }
      });
      
      return new Response(stream, {
        headers: { ...corsHeaders, 'Content-Type': 'text/event-stream' },
      });
    } else {
      // Lovable AI request
      response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        if (response.status === 429) {
          return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
            status: 429,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        if (response.status === 402) {
          return new Response(JSON.stringify({ error: 'Payment required' }), {
            status: 402,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        const error = await response.text();
        console.error('AI gateway error:', error);
        return new Response(JSON.stringify({ error: 'AI service error' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(response.body, {
        headers: { ...corsHeaders, 'Content-Type': 'text/event-stream' },
      });
    }
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
