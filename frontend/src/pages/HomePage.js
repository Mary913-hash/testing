import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="video-background">
        <video className="home-page-video" autoPlay loop muted>
          <source src="https://assets.mixkit.co/videos/4083/4083-720.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="home-page-content">
        <h1>Welcome to Our Airplane Booking System!</h1>
        <p>Book your flights with ease and comfort. Explore destinations and take flight today!</p>
      </div>
    </div>
  );
};

export default HomePage;

