import React from 'react';
import './AboutUs.css';  // Ensure the CSS file is correctly linked

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-content">
        <div className="about-header">
          <h1>About Our Airplane Booking System</h1>
          <p>Revolutionizing the way you book flights with ease and comfort!</p>
        </div>
        <div className="mission-section">
          <h2>Our Vision</h2>
          <p>
            Established with a vision to make air travel more accessible and
            convenient, our airplane booking system aims to provide an easy and
            seamless flight booking experience. We offer real-time flight
            availability, quick booking confirmations, and competitive prices for
            a variety of routes. No more long waits or confusing booking forms! 🙂
          </p>
        </div>
        <div className="why-choose-us">
          <h2>Why Choose Our Airplane Booking System?</h2>
          <ul>
            <li>Simple and easy flight search system</li>
            <li>Instant flight booking confirmation</li>
            <li>Multiple payment options for your convenience</li>
            <li>Real-time flight availability updates</li>
            <li>24/7 customer support to assist with bookings</li>
          </ul>
        </div>
      </div>

      {/* Right-side image */}
      <div className="about-us-image">
        <img src="https://i.pinimg.com/736x/66/a5/b9/66a5b988cdec82c96bd2f9f07539ec25.jpg" alt="Airplane" />
      </div>
    </div>
  );
};

export default AboutUs;
