import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const handlePlanClick = () => {
    navigate("/form");
  };

  return (
    <div
      className="w-full h-screen font-sans flex flex-col items-center justify-center bg-cover bg-center text-white relative px-4"
      style={{ backgroundImage: "url('back.jpg')" }}
    >
      {/* Sign In button - top-right corner */}
      <div className="absolute top-6 right-6">
        <button className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 transition">
          Sign In
        </button>
      </div>

      {/* Header (Centered title only) */}
      <header className="text-xl font-bold italic mb-10">
        Soar<span className="not-italic font-light">ée</span> Travels
      </header>

      {/* Main Section */}
      <main className="flex flex-col items-center text-center">
        <h2 className="text-5xl sm:text-6xl font-bold mb-4 drop-shadow-lg">
          Soar for less
        </h2>
        <p className="text-xl sm:text-2xl mb-6 drop-shadow-md">
          60% off regular seat prices
        </p>
        <button
          onClick={handlePlanClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition"
        >
          Plan the tour
        </button>
      </main>
    </div>
  );
}

export default HomePage;
