import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <h2>Airplane Booking</h2>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/flights">Flights</Link></li>
        <li><Link to="/book-route">Book Route</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/about-us">About Us</Link></li>
        <li><Link to="/more">More</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
