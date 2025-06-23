import React, { useEffect, useState } from "react";

const UNSPLASH_ACCESS_KEY = "zc9ngfvCVjFHOXh02NiOKSvSs5eYzTrEP2zlmReieDo"; // Your Unsplash key

const Itinerary = () => {
  const [loading, setLoading] = useState(true);
  const [itinerary, setItinerary] = useState({});
  const [error, setError] = useState(null);

  const tripPreferences = JSON.parse(localStorage.getItem("tripPreferences"));

  // Generic image fetcher from Unsplash
  const fetchImages = async (items, getNameFn) => {
    const imageMap = {};
    for (const item of items) {
      const name = getNameFn(item);
      try {
        const res = await fetch(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
            name
          )}&client_id=${UNSPLASH_ACCESS_KEY}`
        );
        const data = await res.json();
        imageMap[name] = data.results[0]?.urls.small || null;
      } catch {
        imageMap[name] = null;
      }
    }
    return imageMap;
  };

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
          // Fix markdown-style ```json blocks
          let cleanedText = data.itineraryText.trim();
          if (cleanedText.startsWith("```")) {
            cleanedText = cleanedText.replace(/```json|```/g, "").trim();
          }

          const parsed = JSON.parse(cleanedText);

          // Fetch all images
          const [placeImages, hotelImages, activityImages] = await Promise.all([
            fetchImages(parsed.topPlaces || [], (p) => p.name),
            fetchImages(parsed.topHotels || [], (h) => h.name),
            fetchImages(parsed.activities || [], (a) => a),
          ]);

          parsed.placeImages = placeImages;
          parsed.hotelImages = hotelImages;
          parsed.activityImages = activityImages;

          setItinerary(parsed);
        } else {
          setError("No itinerary received.");
        }
      } catch (err) {
        console.error(err);
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
    <div className="max-w-6xl mx-auto mt-12 p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">
        Your Personalized Travel Itinerary
      </h1>

      {loading && <p className="text-center text-gray-500">Generating your itinerary...</p>}
      {error && <p className="text-center text-red-600 font-semibold">{error}</p>}

      {!loading && !error && (
        <div className="space-y-10">
          {/* Top Places */}
          <div>
            <h2 className="text-2xl font-bold text-blue-600 mb-4">🏞️ Top Places</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {itinerary.topPlaces?.slice(0, 5).map((place, idx) => {
                const imgSrc =
                  itinerary.placeImages?.[place.name] || "/images/places/default.jpg";
                return (
                  <div
                    key={idx}
                    className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center"
                  >
                    <img
                      src={imgSrc}
                      alt={place.name}
                      className="w-full h-40 object-cover rounded-md mb-3"
                    />
                    <h3 className="text-lg font-semibold text-gray-800 text-center">
                      {place.name}
                    </h3>
                    <p className="text-sm text-gray-600 text-center">📍 {place.state}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hotels */}
          <div>
            <h2 className="text-2xl font-bold text-blue-600 mb-4">🏨 Top Hotels</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {itinerary.topHotels?.slice(0, 3).map((hotel, idx) => {
                const imgSrc =
                  itinerary.hotelImages?.[hotel.name] || "/images/hotel-default.jpg";
                return (
                  <div
                    key={idx}
                    className="bg-white border p-5 rounded-xl shadow hover:shadow-md transition"
                  >
                    <img
                      src={imgSrc}
                      alt={hotel.name}
                      className="w-full h-40 object-cover rounded-md mb-3"
                    />
                    <h3 className="text-lg font-semibold text-gray-800">{hotel.name}</h3>
                    <p className="text-sm text-gray-600">📍 {hotel.location}</p>
                    <p className="text-sm text-gray-600">💲 {hotel.pricePerNight}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Activities */}
          <div>
            <h2 className="text-2xl font-bold text-blue-600 mb-4">🎯 Activities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {itinerary.activities?.slice(0, 3).map((activity, idx) => {
                const imgSrc =
                  itinerary.activityImages?.[activity] || "/images/activity-default.jpg";
                return (
                  <div
                    key={idx}
                    className="bg-purple-50 p-5 rounded-xl shadow hover:shadow-lg transition"
                  >
                    <img
                      src={imgSrc}
                      alt={activity}
                      className="w-full h-40 object-cover rounded-md mb-3"
                    />
                    <h3 className="text-md font-medium text-gray-700 text-center">
                      {activity}
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Itinerary;
