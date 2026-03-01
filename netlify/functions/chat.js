// At the very top, add this if you're on an old Node version (optional)
// const fetch = require('node-fetch'); 

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { prompt } = JSON.parse(event.body);
    const API_KEY = process.env.KEY_1;

    // Safety check: stop if key is missing
    if (!API_KEY) {
      return { statusCode: 500, body: JSON.stringify({ error: "API_KEY (KEY_1) is missing in Netlify settings" }) };
    }

    const response = await fetch("https://openrouter.ai", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://proton-studio.netlify.app",
        "X-Title": "Proton# Support"
      },
      body: JSON.stringify({
        "model": "google/gemma-2-9b-it:free",
        "messages": [
          { "role": "system", "content": "You are the Proton# Support Lead. The CEO is 11, the dev is 10. You are a legend." },
          { "role": "user", "content": prompt }
        ]
      })
    });

    const data = await response.json();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
  } catch (error) {
    // Log the error so you can see it in Netlify Logs > Functions
    console.error("Function Error:", error);
    return { 
      statusCode: 500, 
      body: JSON.stringify({ error: "SERVER_CRASH", details: error.message }) 
    };
  }
};
