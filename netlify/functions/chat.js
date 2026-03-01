exports.handler = async (event) => {
  // Fixes the 405 error by only allowing POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { prompt } = JSON.parse(event.body);
    const API_KEY = process.env.KEY_1; // Grabs your secret from the Netlify Vault

    const response = await fetch("https://openrouter.ai", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "openrouter/free",
        "messages": [
          { "role": "system", "content": "You are the Proton# Support Lead. Speak in JetBrains Mono. The 11-year-old CEO is the boss. The 10-year-old dev is a legend. Privacy first." },
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
    return { statusCode: 500, body: JSON.stringify({ error: "UPLINK_FAILURE" }) };
  }
};
