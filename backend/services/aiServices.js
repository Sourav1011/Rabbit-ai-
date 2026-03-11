const axios = require("axios");

async function generateSummary(data) {

  const prompt = `
  Analyze the following sales data and create a short executive summary.

  ${JSON.stringify(data).slice(0,2000)}
  `;

  const response = await axios.post(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + process.env.GEMINI_API_KEY,
    {
      contents: [{ parts: [{ text: prompt }] }]
    }
  );

  return response.data.candidates[0].content.parts[0].text;

}

module.exports = generateSummary;