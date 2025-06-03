import React, { useEffect, useState } from "react";

const Itinerary = () => {
  const [loading, setLoading] = useState(true);
  const [itinerary, setItinerary] = useState("");
  const [error, setError] = useState(null);

  // Fetch user trip preferences from localStorage
  const tripPreferences = JSON.parse(localStorage.getItem("tripPreferences"));

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/trip/generate-trip", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(tripPreferences),
        });

        const data = await response.json();
        if (data.itineraryText) {
          setItinerary(data.itineraryText);
        } else {
          setError("No itinerary received.");
        }
      } catch (err) {
        setError("Failed to fetch itinerary.");
      } finally {
        setLoading(false);
      }
    };

    if (tripPreferences) {
      fetchItinerary();
    } else {
      setError("No preferences found. Please go back and fill the form.");
      setLoading(false);
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-12 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-4 text-blue-700">
        Your Personalized Travel Itinerary
      </h1>

      {loading && <p className="text-center text-gray-500">Generating your itinerary...</p>}

      {error && (
        <p className="text-center text-red-600 font-semibold">{error}</p>
      )}

      {!loading && !error && (
        <div className="space-y-6">
          {/* Placeholder: Hero Image for Destination */}
          <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-500 text-xl">📷 Destination Image</span>
          </div>

          {/* Parsed AI Text */}
          <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
            {itinerary}
          </div>

          {/* Placeholder: Hotel/Hostel Images */}
          <div>
            <h2 className="text-xl font-semibold mb-2">🏨 Suggested Hotels</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((id) => (
                <div
                  key={id}
                  className="bg-gray-100 rounded-lg h-40 flex items-center justify-center"
                >
                  <span className="text-gray-400">Hotel Image {id}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Itinerary; 