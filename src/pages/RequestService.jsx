import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pages.css';
import { CheckCircle, Person, DirectionsCar, Build, LocationOn, Schedule, Phone } from '@mui/icons-material';

const RequestService = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ownerName: '',
    carModel: '',
    carNumber: '',
    issue: '',
    pickupAddress: '',
    pickupDate: '',
    pickupTime: '',
    phone: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save to localStorage for demo
    const serviceRequest = {
      id: Date.now(),
      ...formData,
      status: 'Pending',
      assignedGarage: null,
      createdAt: new Date().toISOString()
    };
    
    const existingRequests = JSON.parse(localStorage.getItem('serviceRequests') || '[]');
    existingRequests.push(serviceRequest);
    localStorage.setItem('serviceRequests', JSON.stringify(existingRequests));
    
    setSubmitted(true);
    setTimeout(() => {
      navigate('/track-service');
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="success-container">
        <div className="success-card">
          <h2><CheckCircle style={{ fontSize: '2.5rem', marginRight: '1rem', color: 'var(--secondary-color)' }} /> Service Request Submitted!</h2>
          <p>Your request has been sent to nearby garages. A garage person will contact you shortly.</p>
          <p>Redirecting to tracking page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="request-container">
      <h1>Request Service</h1>
      <p>Fill the details below and we'll pick up your car from your home</p>
      
      <form onSubmit={handleSubmit} className="service-form">
        <div className="form-group">
          <label><Person style={{ fontSize: '1rem', marginRight: '0.5rem', verticalAlign: 'middle' }} /> Owner Name *</label>
          <input type="text" name="ownerName" required onChange={handleChange} />
        </div>

        <div className="form-group">
          <label><DirectionsCar style={{ fontSize: '1rem', marginRight: '0.5rem', verticalAlign: 'middle' }} /> Car Model *</label>
          <input type="text" name="carModel" placeholder="e.g., Toyota Camry" required onChange={handleChange} />
        </div>

        <div className="form-group">
          <label><DirectionsCar style={{ fontSize: '1rem', marginRight: '0.5rem', verticalAlign: 'middle' }} /> Car Number *</label>
          <input type="text" name="carNumber" placeholder="e.g., MH 12 AB 1234" required onChange={handleChange} />
        </div>

        <div className="form-group">
          <label><Build style={{ fontSize: '1rem', marginRight: '0.5rem', verticalAlign: 'middle' }} /> Issue Description *</label>
          <textarea name="issue" rows="4" placeholder="Describe the problem with your car..." required onChange={handleChange}></textarea>
        </div>

        <div className="form-group">
          <label><LocationOn style={{ fontSize: '1rem', marginRight: '0.5rem', verticalAlign: 'middle' }} /> Pickup Address *</label>
          <textarea name="pickupAddress" rows="2" placeholder="Your home address where car needs to be picked up" required onChange={handleChange}></textarea>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label><Schedule style={{ fontSize: '1rem', marginRight: '0.5rem', verticalAlign: 'middle' }} /> Pickup Date *</label>
            <input type="date" name="pickupDate" required onChange={handleChange} />
          </div>
          <div className="form-group">
            <label><Schedule style={{ fontSize: '1rem', marginRight: '0.5rem', verticalAlign: 'middle' }} /> Pickup Time *</label>
            <input type="time" name="pickupTime" required onChange={handleChange} />
          </div>
        </div>

        <div className="form-group">
          <label><Phone style={{ fontSize: '1rem', marginRight: '0.5rem', verticalAlign: 'middle' }} /> Phone Number *</label>
          <input type="tel" name="phone" placeholder="Your contact number" required onChange={handleChange} />
        </div>

        <button type="submit" className="submit-btn">Request Service</button>
      </form>
    </div>
  );
};

export default RequestService;