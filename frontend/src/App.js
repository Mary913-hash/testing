import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import FlightsPage from './pages/FlightsPage';
import BookRoute from './pages/BookRoute';
import Contact from './pages/Contact';
import AboutUs from './pages/AboutUs';
import More from './pages/More';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/flights" element={<FlightsPage />} />
        <Route path="/book-route" element={<BookRoute />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/more" element={<More />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
