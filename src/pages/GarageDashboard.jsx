import React, { useState, useEffect } from 'react';
import './Pages.css';
import { 
  DirectionsCar, 
  Build, 
  CheckCircle, 
  LocalShipping, 
  Home, 
  Assignment,
  Payments,
  Phone,
  Email,
  LocationOn
} from '@mui/icons-material';

const GarageDashboard = () => {
  const [serviceRequests, setServiceRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem('serviceRequests') || '[]');
    setServiceRequests(storedRequests);
  }, []);

  const updateRequestStatus = (requestId, newStatus) => {
    const updatedRequests = serviceRequests.map(req => 
      req.id === requestId ? { ...req, status: newStatus } : req
    );
    setServiceRequests(updatedRequests);
    localStorage.setItem('serviceRequests', JSON.stringify(updatedRequests));
  };

  const generateInvoice = (request) => {
    const invoice = {
      id: Date.now(),
      requestId: request.id,
      carModel: request.carModel,
      carNumber: request.carNumber,
      ownerName: request.ownerName,
      issue: request.issue,
      amount: Math.floor(Math.random() * 5000) + 1000,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    
    const existingInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    existingInvoices.push(invoice);
    localStorage.setItem('invoices', JSON.stringify(existingInvoices));
    
    alert(`Invoice generated for ₹${invoice.amount}`);
  };

  const getRequestsByStatus = (status) => {
    return serviceRequests.filter(req => req.status === status);
  };

  const pendingRequests = getRequestsByStatus('Pending');
  const pickedUpRequests = getRequestsByStatus('Picked Up');
  const repairRequests = getRequestsByStatus('In Repair');
  const readyRequests = getRequestsByStatus('Ready for Drop');

  return (
    <div className="garage-dashboard">
      <h1><Build style={{ fontSize: '2rem', marginRight: '1rem', verticalAlign: 'middle', color: 'var(--primary-color)' }} /> Garage Dashboard</h1>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>{pendingRequests.length}</h3>
          <p>Pending Requests</p>
        </div>
        <div className="stat-card">
          <h3>{pickedUpRequests.length}</h3>
          <p>Cars Picked Up</p>
        </div>
        <div className="stat-card">
          <h3>{repairRequests.length}</h3>
          <p>In Repair</p>
        </div>
        <div className="stat-card">
          <h3>{readyRequests.length}</h3>
          <p>Ready for Drop</p>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="section">
          <h2><Assignment style={{ fontSize: '1.5rem', marginRight: '0.5rem', verticalAlign: 'middle' }} /> New Requests</h2>
          {pendingRequests.length === 0 ? (
            <p>No pending requests</p>
          ) : (
            pendingRequests.map(request => (
              <div key={request.id} className="job-card">
                <h4><DirectionsCar style={{ fontSize: '1.2rem', marginRight: '0.5rem', verticalAlign: 'middle' }} /> {request.carModel} - {request.carNumber}</h4>
                <p><strong>Owner:</strong> {request.ownerName}</p>
                <p><strong>Issue:</strong> {request.issue.substring(0, 100)}...</p>
                <p><strong>Pickup:</strong> {request.pickupDate} at {request.pickupTime}</p>
                <p><strong>Address:</strong> {request.pickupAddress}</p>
                <p><strong>Phone:</strong> <Phone style={{ fontSize: '1rem', verticalAlign: 'middle' }} /> {request.phone}</p>
                <button className="accept-btn" onClick={() => updateRequestStatus(request.id, 'Picked Up')}>
                  Accept & Pickup
                </button>
              </div>
            ))
          )}
        </div>

        <div className="section">
          <h2><Build style={{ fontSize: '1.5rem', marginRight: '0.5rem', verticalAlign: 'middle' }} /> Active Jobs</h2>
          {[...pickedUpRequests, ...repairRequests].length === 0 ? (
            <p>No active jobs</p>
          ) : (
            [...pickedUpRequests, ...repairRequests].map(request => (
              <div key={request.id} className={`job-card ${request.status === 'In Repair' ? 'active' : ''}`}>
                <h4><DirectionsCar style={{ fontSize: '1.2rem', marginRight: '0.5rem', verticalAlign: 'middle' }} /> {request.carModel} - {request.carNumber}</h4>
                <p><strong>Owner:</strong> {request.ownerName}</p>
                <p><strong>Issue:</strong> {request.issue.substring(0, 100)}...</p>
                <p><strong>Status:</strong> {request.status}</p>
                
                {request.status === 'Picked Up' && (
                  <button className="repair-btn" onClick={() => updateRequestStatus(request.id, 'In Repair')}>
                    Start Repair
                  </button>
                )}
                
                {request.status === 'In Repair' && (
                  <button className="ready-btn" onClick={() => updateRequestStatus(request.id, 'Ready for Drop')}>
                    Mark as Ready
                  </button>
                )}
              </div>
            ))
          )}
        </div>

        <div className="section">
          <h2><LocalShipping style={{ fontSize: '1.5rem', marginRight: '0.5rem', verticalAlign: 'middle' }} /> Ready for Delivery</h2>
          {readyRequests.length === 0 ? (
            <p>No cars ready for delivery</p>
          ) : (
            readyRequests.map(request => (
              <div key={request.id} className="job-card completed">
                <h4><DirectionsCar style={{ fontSize: '1.2rem', marginRight: '0.5rem', verticalAlign: 'middle' }} /> {request.carModel} - {request.carNumber}</h4>
                <p><strong>Owner:</strong> {request.ownerName}</p>
                <p><strong>Issue:</strong> {request.issue.substring(0, 100)}...</p>
                <p><strong>Address:</strong> <LocationOn style={{ fontSize: '1rem', verticalAlign: 'middle' }} /> {request.pickupAddress}</p>
                <p><strong>Phone:</strong> <Phone style={{ fontSize: '1rem', verticalAlign: 'middle' }} /> {request.phone}</p>
                
                <button className="ready-btn" onClick={() => generateInvoice(request)}>
                  <Payments style={{ fontSize: '1rem', marginRight: '0.5rem', verticalAlign: 'middle' }} /> Generate Invoice
                </button>
                
                <button className="drop-btn" onClick={() => updateRequestStatus(request.id, 'Dropped')}>
                  <Home style={{ fontSize: '1rem', marginRight: '0.5rem', verticalAlign: 'middle' }} /> Mark as Dropped
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default GarageDashboard;
