import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EarthquakeList from './components/EarthquakeList';
import EarthquakeDetails from './components/EarthquakeDetails';
import AddEarthquake from './components/AddEarthquake';

const App: React.FC = () => {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/earthquakes" replace />} />
          <Route path="/earthquakes" element={<EarthquakeList />} />
          <Route path="/earthquake/:id" element={<EarthquakeDetails />} />
          <Route path="/earthquake/add" element={<AddEarthquake />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
