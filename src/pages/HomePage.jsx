
import React from 'react';
import { Link } from 'react-router-dom';
import './Pages.css';
import { 
  CarRental, 
  LocalShipping, 
  Build, 
  Home,
  Phone,
  Email,
  LocationOn
} from '@mui/icons-material';

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1><CarRental style={{ fontSize: '3rem', marginRight: '1rem', color: 'var(--primary-color)' }} /> Welcome to Garage Service Pro</h1>
        <p>Professional car repair with pickup and drop service at your home</p>
        <div className="hero-buttons">
          <Link to="/request-service" className="btn-primary">Request Service Now</Link>
          <Link to="/track-service" className="btn-secondary">Track Your Service</Link>
        </div>
      </div>

      <div className="features-section">
        <h2>How It Works</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon"><Phone style={{ fontSize: '3rem', color: 'var(--primary-color)' }} /></div>
            <h3>1. Request Service</h3>
            <p>Tell us about your car issues and schedule pickup</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><LocalShipping style={{ fontSize: '3rem', color: 'var(--secondary-color)' }} /></div>
            <h3>2. Free Pickup</h3>
            <p>Garage person picks up your car from home</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Build style={{ fontSize: '3rem', color: 'var(--accent-color)' }} /></div>
            <h3>3. Expert Repair</h3>
            <p>Professional mechanics fix all issues</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Home style={{ fontSize: '3rem', color: 'var(--primary-color)' }} /></div>
            <h3>4. Drop at Home</h3>
            <p>Car delivered back to your doorstep</p>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <div className="stat">
          <h3>500+</h3>
          <p>Cars Repaired</p>
        </div>
        <div className="stat">
          <h3>50+</h3>
          <p>Expert Mechanics</p>
        </div>
        <div className="stat">
          <h3>24/7</h3>
          <p>Support Available</p>
        </div>
        <div className="stat">
          <h3>100%</h3>
          <p>Satisfied Customers</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
