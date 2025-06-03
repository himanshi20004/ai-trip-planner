const FormData = require("../models/formModel");
const generateTripPlan = require("../AImodel");

const handleForm = async (req, res) => {
  try {
    console.log("Form Data Received:", req.body);

    // Step 1: Generate AI trip plan
    const aiPlan = await generateTripPlan(req.body);
    
    console.log("AI Trip Plan Generated:\n", aiPlan);
    // Step 2: Save form data + AI response to MongoDB
    const formData = new FormData({
      ...req.body,
      tripPlan: aiPlan,
    });
    await formData.save();

    // Step 3: Return the AI plan as response
    res.json({
      success: true,
      message: "Form data saved and AI trip plan generated!",
      tripPlan: aiPlan,
    });
  } catch (error) {
    console.error("Error in handleForm:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Try again later.",
    });
  }
};

module.exports = { handleForm };
