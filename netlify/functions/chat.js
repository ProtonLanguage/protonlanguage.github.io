exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { prompt } = JSON.parse(event.body);
    const API_KEY = process.env.KEY_1;

    // DEBUG LOG: This will show in your Netlify Logs (it's safe, it hides the key)
    console.log("API Key exists:", !!API_KEY);

    const response = await fetch("https://openrouter.ai", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "google/gemma-2-9b-it:free", 
        "messages": [
          { "role": "system", "content": "You are the Proton# Support Lead." },
          { "role": "user", "content": prompt }
        ]
      })
    });

    const data = await response.json();
    console.log("OpenRouter Response Status:", response.status);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
  } catch (error) {
    // THIS LOG IS KEY: Check your Netlify logs for this red text!
    console.error("CRITICAL ERROR:", error.message);
    return { 
      statusCode: 500, 
      body: JSON.stringify({ error: "UPLINK_FAILURE", message: error.message }) 
    };
  }
};
