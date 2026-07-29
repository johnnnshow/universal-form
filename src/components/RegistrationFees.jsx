import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './RegistrationFees.css';
import logo from '../assets/logo.png';

// Import payment method images
import visaIcon from '../assets/visa.png';
import rupayIcon from '../assets/rupay.png';
import netbankingIcon from '../assets/netbanking.png';
import upiIcon from '../assets/upi.png';

function RegistrationFees() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  // Get form data from navigation state
  const formData = location.state?.formData || {};
  
  // Use fullName directly from registration form
  const applicantName = formData.fullName || 'Guest User';
  
  // Since program is not in registration form, use a default value
  const programName = 'Registration';

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      // Make sure this path matches the route in App.js
      navigate('/payment-modes');
    }, 1500);
  };

  return (
    <div className="rf-register-container">
      {/* Background Image Section */}
      <div className="rf-background-wrapper">
        <img 
          src="/register-bg.png"
          alt="Registration Background" 
          className="rf-background-image"
          onError={(e) => {
            console.log('Background image failed to load');
            e.target.style.display = 'none';
            e.target.parentElement.classList.add('rf-gradient-fallback');
          }}
        />
        <div className="rf-background-overlay"></div>
      </div>

      {/* Form Card */}
      <div className="rf-register-card">
        <h2 className="rf-title">Pay Registration Fees</h2>
        <p className="rf-subtitle">Complete your registration by paying the required fees.</p>

        <div className="rf-section">
          <h3 className="rf-section-title">Registration Summary</h3>
          <div className="rf-summary-grid">
            <div className="rf-summary-item">
              <span className="rf-summary-label">Program</span>
              <span className="rf-summary-value">{programName}</span>
            </div>
            <div className="rf-summary-item">
              <span className="rf-summary-label">Applicant Name</span>
              <span className="rf-summary-value">{applicantName}</span>
            </div>
            <div className="rf-summary-item">
              <span className="rf-summary-label">Email</span>
              <span className="rf-summary-value">{formData.email || 'N/A'}</span>
            </div>
            <div className="rf-summary-item">
              <span className="rf-summary-label">Mobile</span>
              <span className="rf-summary-value">{formData.mobile || 'N/A'}</span>
            </div>
            <div className="rf-summary-item">
              <span className="rf-summary-label">Registration Fees</span>
              <span className="rf-summary-value">₹1</span>
            </div>
            <div className="rf-summary-item">
              <span className="rf-summary-label">Amount to Pay</span>
              <span className="rf-summary-value rf-amount">₹1</span>
            </div>
          </div>
        </div>

        <div className="rf-section rf-payment-section">
          <h3 className="rf-section-title">Payment Amount</h3>
          <div className="rf-amount-display">
            <span className="rf-currency">₹</span>
            <span className="rf-amount-number">1</span>
            <span className="rf-amount-text">One Rupee Only</span>
          </div>
        </div>

        <button 
          className="rf-payment-btn" 
          onClick={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? 'PROCESSING...' : 'PROCEED TO PAYMENT GATEWAY'}
        </button>

        <div className="rf-payment-methods">
          <p className="rf-methods-label">We Accept</p>
          <div className="rf-methods-icons">
            <div className="rf-method-item">
              <img src={visaIcon} alt="VISA" className="rf-payment-icon" />
              <span className="rf-method-name">VISA</span>
            </div>
            
            <div className="rf-method-item">
              <img src={rupayIcon} alt="RuPay" className="rf-payment-icon" />
              <span className="rf-method-name">RuPay</span>
            </div>
            
            <div className="rf-method-item">
              <img src={netbankingIcon} alt="Net Banking" className="rf-payment-icon" />
              <span className="rf-method-name">NET BANKING</span>
            </div>

            <div className="rf-method-item">
              <img src={upiIcon} alt="UPI" className="rf-payment-icon" />
              <span className="rf-method-name">UPI</span>
            </div>
          </div>
        </div>

        <div className="rf-security">
          <span className="rf-security-icon">🔒</span>
          <span className="rf-security-text">100% Secure Payment</span>
          <span className="rf-security-desc">Your payment details are safe and encrypted.</span>
        </div>

        <div className="rf-support">
          <span className="rf-support-icon">❓</span>
          <span className="rf-support-text">Need Help? Contact Support</span>
        </div>
      </div>
    </div>
  );
}

export default RegistrationFees;
