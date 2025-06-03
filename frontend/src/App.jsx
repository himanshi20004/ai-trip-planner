
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/Homepage';
import Form from './components/Form';
import Itinerary from './components/Itenary';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/itinerary" element={<Itinerary />} />
      </Routes>
    </Router>
  );
};

export default App;
