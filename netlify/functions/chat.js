exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { prompt } = JSON.parse(event.body);
    const API_KEY = process.env.KEY_1;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://protonsharp.netlify.app",
        "X-Title": "Proton# AI_CORE"
      },
      body: JSON.stringify({
        "model": "mistralai/mistral-7b-instruct:free", 
        "messages": [
          { 
            "role": "system", 
            "content": "You are the Proton# Support Lead. Proton# is a custom coding language and game engine by Xynox1. We are NOT Proton Mail. The CEO is 11, the dev is 10. Be a legend. Privacy first." 
          },
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
    console.error("CRITICAL ERROR:", error.message);
    return { 
      statusCode: 500, 
      body: JSON.stringify({ error: "UPLINK_FAILURE", details: error.message }) 
    };
  }
};
