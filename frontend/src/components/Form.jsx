import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const budgetOptions = [
  { value: "low", label: "Low", emoji: "💸" },
  { value: "medium", label: "Medium", emoji: "💰" },
  { value: "high", label: "High", emoji: "🤑" },
];

const companionOptions = [
  { value: "solo", label: "Solo", icon: "🧑" },
  { value: "couple", label: "Couple", icon: "👫" },
  { value: "family", label: "Family", icon: "👨‍👩‍👧‍👦" },
  { value: "friends", label: "Friends", icon: "👬" },
];

const Form = () => {
  const [form, setForm] = useState({
    destination: "",
    days: "",
    budget: "",
    companion: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBudget = (value) => {
    setForm((prev) => ({ ...prev, budget: value }));
  };

  const handleCompanion = (value) => {
    setForm((prev) => ({ ...prev, companion: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    localStorage.setItem("tripPreferences", JSON.stringify(form));

    try {
      await fetch("http://localhost:5000/api/form/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const response = await fetch("http://localhost:5000/api/trip/generate-trip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (data.itineraryText) {
        localStorage.setItem("itineraryText", data.itineraryText);
        navigate("/itinerary");
      } else {
        alert("Itinerary generation failed. Please try again.");
      }
    } catch (error) {
      console.error("Submission or itinerary generation failed:", error);
      alert("Failed to submit preferences or generate itinerary.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto mt-12 p-8 bg-white rounded-lg shadow-md"
    >
      <h1 className="text-3xl font-bold text-center mb-2">
        TELL US YOUR TRAVEL PREFERENCES
      </h1>
      <p className="text-center text-gray-600 mb-8">
        JUST PROVIDE SOME BASIC INFORMATION AND OUR TRIPPLANNER WILL PROVIDE A CUSTOMISED ITINERARY BASED ON YOUR PREFERENCE.
      </p>

      {/* Destination */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">
          WHAT IS DESTINATION OF CHOICE?
        </label>
        <input
          type="text"
          name="destination"
          value={form.destination}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>

      {/* Days */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">
          HOW MANY DAYS ARE YOU PLANNING YOUR TRIP?
        </label>
        <input
          type="number"
          name="days"
          min="1"
          value={form.days}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>

      {/* Budget */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">
          WHAT IS YOUR BUDGET?
        </label>
        <div className="flex gap-4">
          {budgetOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleBudget(opt.value)}
              className={`flex items-center gap-2 px-4 py-2 border rounded ${
                form.budget === opt.value
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100"
              }`}
            >
              <span>{opt.emoji}</span>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Companion */}
      <div className="mb-8">
        <label className="block font-semibold mb-2">
          WHO DO YOU PLAN ON TRAVELLING WITH ON YOUR NEXT ADVENTURE?
        </label>
        <div className="flex gap-4">
          {companionOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleCompanion(opt.value)}
              className={`flex items-center gap-2 px-4 py-2 border rounded ${
                form.companion === opt.value
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100"
              }`}
            >
              <span>{opt.icon}</span>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Submit with Loader */}
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={loading}
          className={`${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg flex items-center gap-3`}
        >
          {loading ? (
            <>
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Generating...
            </>
          ) : (
            "GENERATE TRIP"
          )}
        </button>
      </div>
    </form>
  );
};

export default Form;
