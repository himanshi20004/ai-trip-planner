const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyBI2JVOeY3Hx70PzykrRsRIcnqMF8vNqCM");

async function generateTripPlan({ destination, days, budget, companion }) {
  const prompt = `
You are a travel assistant. Based on the following preferences, generate a customized travel itinerary in **valid JSON format only**.

Preferences:
- Destination: ${destination}
- Duration: ${days} days
- Budget: ${budget}
- Traveling With: ${companion}

Respond with only a JSON object matching the structure below. Do not include any commentary, markdown formatting, or text before/after it.

{
  "topPlaces": [
    { "name": "Place 1", "state": "State 1" },
    { "name": "Place 2", "state": "State 2" },
    { "name": "Place 3", "state": "State 3" },
    { "name": "Place 4", "state": "State 4" },
    { "name": "Place 5", "state": "State 5" }
  ],
  "topHotels": [
    { "name": "Hotel 1", "pricePerNight": "Approx price", "location": "City, State" },
    { "name": "Hotel 2", "pricePerNight": "Approx price", "location": "City, State" },
    { "name": "Hotel 3", "pricePerNight": "Approx price", "location": "City, State" }
  ],
  "activities": [
    "Activity 1",
    "Activity 2",
    "Activity 3"
  ]
}
`;


  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = await response.text();
  return text;
}

module.exports = generateTripPlan;
