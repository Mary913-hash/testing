import React from 'react';
import { FaShieldAlt, FaClock, FaMapMarkerAlt, FaPlane } from 'react-icons/fa';
import './More.css';

const More = () => {
  return (
    <div className="more-container">
      <h1 className="more-title">Why Choose Our Airplane Booking Service?</h1>

      <div className="why-choose">
        <div className="choose-item">
          <FaShieldAlt className="choose-icon" />
          <h3>Safe Flights</h3>
          <p>We prioritize passenger safety with well-maintained aircraft and experienced pilots.</p>
        </div>
        <div className="choose-item">
          <FaClock className="choose-icon" />
          <h3>Punctuality Guaranteed</h3>
          <p>Our flights follow reliable schedules with real-time updates on departure and arrival times.</p>
        </div>
        <div className="choose-item">
          <FaMapMarkerAlt className="choose-icon" />
          <h3>Extensive Routes</h3>
          <p>We cover multiple cities and airports, making it easy to book your next flight from anywhere.</p>
        </div>
        <div className="choose-item">
          <FaPlane className="choose-icon" />
          <h3>Comfortable Flights</h3>
          <p>Our modern planes offer comfort and luxury to ensure a pleasant flying experience.</p>
        </div>
      </div>

      <h2 className="faq-title">Frequently Asked Questions</h2>

      <div className="faq-container">
        <div className="faq-item">
          <h4>How do I book a flight?</h4>
          <p>Simply visit our website, choose your departure and destination cities, select a date, and confirm your booking.</p>
        </div>
        <div className="faq-item">
          <h4>What payment methods do you accept?</h4>
          <p>We accept payment via credit/debit cards, PayPal, and other secure payment methods.</p>
        </div>
        <div className="faq-item">
          <h4>Can I change my flight details?</h4>
          <p>Yes, you can change your flight details up to 24 hours before departure for a small fee.</p>
        </div>
      </div>
    </div>
  );
};

export default More;
