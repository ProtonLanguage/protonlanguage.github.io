exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { prompt } = JSON.parse(event.body);
    const API_KEY = process.env.KEY_1;

    // FIX 1: Updated to the correct API endpoint
    const response = await fetch("https://openrouter.ai", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://proton-studio.netlify.app", // Optional but recommended
        "X-Title": "Proton# Support"
      },
      body: JSON.stringify({
        "model": "google/gemma-2-9b-it:free", // FIX 2: Specific free model
        "messages": [
          { "role": "system", "content": "You are the Proton# Support Lead. If you need information on syntaxing its at protonlanguage.github.io/docs. Do not talk about anything that is unethical and unrealted to a programming language. This is for users 13+ Be private and dont ask for any personal information." },
          { "role": "user", "content": prompt }
        ]
      })
    });

    const data = await response.json();

    // Check if OpenRouter returned an error (like Invalid API Key)
    if (!response.ok) {
       return { statusCode: response.status, body: JSON.stringify(data) };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
