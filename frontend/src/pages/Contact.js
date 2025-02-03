import React, { useState } from 'react';
import './Contact.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'; // Importing the icons

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-wrapper">
      <h1 className="contact-title">Contact Us</h1>

      <div className="contact-content">
        <div className="contact-form-container">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />

            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email address"
              required
            />

            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message or complaint"
              required
            ></textarea>

            <button type="submit">Send Message</button>
          </form>
        </div>

        <div className="contact-details">
          <h3>Get in Touch</h3>
          <p><FaPhoneAlt /> Phone: +254 700 000000</p>
          <p><FaEnvelope /> Email: info@bookmyflight.com</p>
          <p><FaMapMarkerAlt /> Location: Nairobi, Kenya</p>
          <h4>Follow Us</h4>
          <div className="social-links">
            <FaFacebookF className="social-icon" />
            <FaTwitter className="social-icon" />
            <FaInstagram className="social-icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
