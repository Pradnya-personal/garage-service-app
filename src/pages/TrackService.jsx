import React, { useState, useEffect } from 'react';
import './Pages.css';
import { 
  HourglassEmpty, 
  LocalShipping, 
  Build, 
  CheckCircle, 
  Home,
  Description,
  Close
} from '@mui/icons-material';

const TrackService = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem('serviceRequests') || '[]');
    setRequests(storedRequests.reverse());
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'status-pending';
      case 'Picked Up': return 'status-pickup';
      case 'In Repair': return 'status-repair';
      case 'Ready for Drop': return 'status-ready';
      case 'Dropped': return 'status-dropped';
      default: return '';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Pending': return <HourglassEmpty style={{ fontSize: '1.2rem' }} />;
      case 'Picked Up': return <LocalShipping style={{ fontSize: '1.2rem' }} />;
      case 'In Repair': return <Build style={{ fontSize: '1.2rem' }} />;
      case 'Ready for Drop': return <CheckCircle style={{ fontSize: '1.2rem' }} />;
      case 'Dropped': return <Home style={{ fontSize: '1.2rem' }} />;
      default: return <Description style={{ fontSize: '1.2rem' }} />;
    }
  };

  return (
    <div className="track-container">
      <h1>Track Your Service</h1>
      
      {requests.length === 0 ? (
        <div className="no-requests">
          <p>No service requests found.</p>
          <p>Please request a service first.</p>
        </div>
      ) : (
        <div className="requests-list">
          {requests.map((request) => (
            <div key={request.id} className="request-card" onClick={() => setSelectedRequest(request)}>
              <div className="request-header">
                <h3>{request.carModel} - {request.carNumber}</h3>
                <span className={`status-badge ${getStatusColor(request.status)}`}>
                  {getStatusIcon(request.status)} {request.status || 'Pending'}
                </span>
              </div>
              <div className="request-details">
                <p><strong>Issue:</strong> {request.issue.substring(0, 100)}...</p>
                <p><strong>Pickup:</strong> {request.pickupDate} at {request.pickupTime}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedRequest && (
        <div className="modal" onClick={() => setSelectedRequest(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Service Details</h2>
            <div className="tracking-timeline">
              <div className="timeline-step completed">
                <div className="step-icon"><Description style={{ fontSize: '1.5rem' }} /></div>
                <div className="step-info">
                  <h4>Request Submitted</h4>
                  <p>{new Date(selectedRequest.createdAt).toLocaleString()}</p>
                </div>
              </div>
              
              <div className={`timeline-step ${selectedRequest.status === 'Picked Up' || selectedRequest.status === 'In Repair' || selectedRequest.status === 'Ready for Drop' || selectedRequest.status === 'Dropped' ? 'completed' : ''}`}>
                <div className="step-icon"><LocalShipping style={{ fontSize: '1.5rem' }} /></div>
                <div className="step-info">
                  <h4>Car Picked Up</h4>
                  <p>Vehicle picked from your home</p>
                </div>
              </div>
              
              <div className={`timeline-step ${selectedRequest.status === 'In Repair' || selectedRequest.status === 'Ready for Drop' || selectedRequest.status === 'Dropped' ? 'completed' : ''}`}>
                <div className="step-icon"><Build style={{ fontSize: '1.5rem' }} /></div>
                <div className="step-info">
                  <h4>In Repair</h4>
                  <p>Mechanics are working on your car</p>
                </div>
              </div>
              
              <div className={`timeline-step ${selectedRequest.status === 'Ready for Drop' || selectedRequest.status === 'Dropped' ? 'completed' : ''}`}>
                <div className="step-icon"><CheckCircle style={{ fontSize: '1.5rem' }} /></div>
                <div className="step-info">
                  <h4>Ready for Drop</h4>
                  <p>Repairs completed, ready for delivery</p>
                </div>
              </div>
              
              <div className={`timeline-step ${selectedRequest.status === 'Dropped' ? 'completed' : ''}`}>
                <div className="step-icon"><Home style={{ fontSize: '1.5rem' }} /></div>
                <div className="step-info">
                  <h4>Dropped at Home</h4>
                  <p>Car delivered back to your home</p>
                </div>
              </div>
            </div>
            <button className="close-btn" onClick={() => setSelectedRequest(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackService;
