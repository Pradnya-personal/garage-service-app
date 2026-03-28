import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pages.css';
import { 
  Receipt, 
  Payments, 
  DirectionsCar, 
  Person, 
  Phone, 
  Email,
  LocationOn,
  ArrowBack,
  CheckCircle
} from '@mui/icons-material';

const InvoicePage = () => {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  useEffect(() => {
    const storedInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    setInvoices(storedInvoices.reverse());
  }, []);

  const handlePayment = (invoiceId) => {
    const updatedInvoices = invoices.map(inv => 
      inv.id === invoiceId ? { ...inv, status: 'Paid', paidAt: new Date().toISOString() } : inv
    );
    setInvoices(updatedInvoices);
    localStorage.setItem('invoices', JSON.stringify(updatedInvoices));
    
    // Update service request status to indicate payment completed
    const serviceRequests = JSON.parse(localStorage.getItem('serviceRequests') || '[]');
    const invoice = invoices.find(inv => inv.id === invoiceId);
    if (invoice) {
      const updatedRequests = serviceRequests.map(req => 
        req.id === invoice.requestId ? { ...req, paymentStatus: 'Paid' } : req
      );
      localStorage.setItem('serviceRequests', JSON.stringify(updatedRequests));
    }
    
    alert('Payment successful! Your car will be delivered soon.');
  };

  return (
    <div className="invoice-container">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
        <button 
          onClick={() => navigate('/track-service')} 
          style={{ 
            background: 'var(--primary-color)', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px', 
            padding: '0.5rem 1rem',
            marginRight: '1rem',
            cursor: 'pointer'
          }}
        >
          <ArrowBack style={{ verticalAlign: 'middle' }} /> Back
        </button>
        <h1><Receipt style={{ fontSize: '2rem', marginRight: '1rem', verticalAlign: 'middle', color: 'var(--primary-color)' }} /> Invoices & Payments</h1>
      </div>
      
      {invoices.length === 0 ? (
        <div className="no-invoices">
          <p>No invoices found.</p>
          <p>Your invoices will appear here after garage generates them.</p>
        </div>
      ) : (
        <div className="invoices-list">
          {invoices.map(invoice => (
            <div key={invoice.id} className="invoice-card">
              <div className="invoice-header">
                <h3><DirectionsCar style={{ fontSize: '1.5rem', marginRight: '0.5rem', verticalAlign: 'middle' }} /> {invoice.carModel} - {invoice.carNumber}</h3>
                <span className={`status-badge ${invoice.status === 'Paid' ? 'completed-badge' : 'status-pending'}`}>
                  {invoice.status === 'Paid' ? <CheckCircle style={{ fontSize: '1rem', marginRight: '0.5rem', verticalAlign: 'middle' }} /> : <Payments style={{ fontSize: '1rem', marginRight: '0.5rem', verticalAlign: 'middle' }} />}
                  {invoice.status}
                </span>
              </div>
              
              <div className="invoice-details">
                <div className="invoice-info">
                  <p><strong><Person style={{ fontSize: '1rem', marginRight: '0.5rem', verticalAlign: 'middle' }} /> Owner:</strong> {invoice.ownerName}</p>
                  <p><strong>Issue:</strong> {invoice.issue.substring(0, 150)}...</p>
                  <p><strong>Invoice Date:</strong> {new Date(invoice.createdAt).toLocaleDateString()}</p>
                  {invoice.paidAt && (
                    <p><strong>Paid Date:</strong> {new Date(invoice.paidAt).toLocaleDateString()}</p>
                  )}
                </div>
                
                <div className="invoice-amount">
                  <h2>₹{invoice.amount}</h2>
                  {invoice.status === 'Pending' && (
                    <button 
                      className="submit-btn" 
                      onClick={() => handlePayment(invoice.id)}
                      style={{ marginTop: '1rem' }}
                    >
                      <Payments style={{ fontSize: '1rem', marginRight: '0.5rem', verticalAlign: 'middle' }} /> Pay Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InvoicePage;
