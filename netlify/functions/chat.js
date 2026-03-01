// chat.js - Place in your netlify/functions/ folder
exports.handler = async (event) => {
  // 1. Security check: Only allow POST requests
  if (event.httpMethod !== "POST") {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ error: "Method Not Allowed" }) 
    };
  }

  try {
    const { prompt } = JSON.parse(event.body);
    const API_KEY = process.env.KEY_1;

    // 2. Safety check: Ensure API key is present
    if (!API_KEY) {
      console.error("ERROR: KEY_1 is missing from Netlify environment variables.");
      return { 
        statusCode: 500, 
        body: JSON.stringify({ error: "API_KEY_MISSING" }) 
      };
    }

    // 3. The Fetch Request (Using the correct OpenRouter API Endpoint)
    const response = await fetch("https://openrouter.ai", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://protonsharp.netlify.app", // Keeps your API account safe
        "X-Title": "Proton# Support Bot"
      },
      body: JSON.stringify({
        "model": "google/gemma-2-9b-it:free", // Using a stable free model
        "messages": [
          { 
            "role": "system", 
            "content": "You are the Proton# Support Lead. Speak in JetBrains Mono. Be helpful but cool. Privacy first." 
          },
          { "role": "user", "content": prompt }
        ]
      })
    });

    // 4. Handle HTML-style error pages from OpenRouter/Cloudflare
    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouter Error:", errorText);
      return { 
        statusCode: response.status, 
        body: JSON.stringify({ error: "OPENROUTER_REJECTED_REQUEST" }) 
      };
    }

    const data = await response.json();

    // 5. Success! Return the AI's answer
    return {
      statusCode: 200,
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*" // Allows your frontend to talk to this function
      },
      body: JSON.stringify(data)
    };

  } catch (error) {
    // 6. Final Catch-all for crashes
    console.error("CRITICAL FUNCTION ERROR:", error.message);
    return { 
      statusCode: 500, 
      body: JSON.stringify({ 
        error: "UPLINK_FAILURE", 
        details: error.message 
      }) 
    };
  }
};
