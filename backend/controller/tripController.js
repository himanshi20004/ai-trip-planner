const generateTripPlan = require("../AImodel");

exports.generateTrip = async (req, res) => {
  try {
    const { destination, days, budget, companion } = req.body;

    if (!destination || !days || !budget || !companion) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const itineraryText = await generateTripPlan({ destination, days, budget, companion });

    res.json({ itineraryText });
  } catch (error) {
    console.error("Error generating trip plan:", error);
    res.status(500).json({ error: "Failed to generate trip plan" });
  }
};
