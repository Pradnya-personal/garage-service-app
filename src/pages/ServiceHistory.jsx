import React, { useState, useEffect } from 'react';
import './Pages.css';

const ServiceHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem('serviceRequests') || '[]');
    const completedHistory = storedRequests.filter(req => req.status === 'Dropped');
    setHistory(completedHistory.reverse());
  }, []);

  return (
    <div className="history-container">
      <h1>Service History</h1>
      
      {history.length === 0 ? (
        <div className="no-history">
          <p>No service history found.</p>
          <p>Your completed services will appear here.</p>
        </div>
      ) : (
        <div className="history-list">
          {history.map((service) => (
            <div key={service.id} className="history-card">
              <div className="history-header">
                <h3>{service.carModel} - {service.carNumber}</h3>
                <span className="completed-badge">✅ Completed</span>
              </div>
              <div className="history-details">
                <p><strong>Issue:</strong> {service.issue}</p>
                <p><strong>Pickup Date:</strong> {service.pickupDate}</p>
                <p><strong>Address:</strong> {service.pickupAddress}</p>
                <p><strong>Completed on:</strong> {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceHistory;
