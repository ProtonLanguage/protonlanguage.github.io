export async function onRequestPost(context) {
  // Pulls your secret from Cloudflare Env Variables
  const API_KEY = context.env.KEY_1; 

  try {
    const { prompt } = await context.request.json();

    const response = await fetch("openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://protonlanguage.github.io", // Required by OpenRouter
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo", 
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
