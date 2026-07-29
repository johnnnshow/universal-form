import React, { useState } from 'react';
import './RegistrationFees.css';

function RegistrationFees() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      alert('✅ Payment Successful! You will receive a confirmation email shortly.');
    }, 2000);
  };

  return (
    <div className="rf-wrapper">
      {/* Header */}
      <div className="rf-header">
        <div className="rf-header-content">
          <div className="rf-brand">
            <h1>TRADE SCHOOL</h1>
            <p>LEARN. TRADE. GROW.</p>
          </div>
          <div className="rf-contact">
            <span>🌐 www.tradeschool.com</span>
            <span>📧 www.learn2trade.net</span>
            <span>📞 123 456 7890</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="rf-card">
        <h2 className="rf-title">Pay Registration Fees</h2>
        <p className="rf-subtitle">Complete your registration by paying the required fees.</p>

        {/* Registration Summary */}
        <div className="rf-section">
          <h3 className="rf-section-title">Registration Summary</h3>
          <div className="rf-summary-grid">
            <div className="rf-summary-item">
              <span className="rf-summary-label">Program</span>
              <span className="rf-summary-value">Finance Classes</span>
            </div>
            <div className="rf-summary-item">
              <span className="rf-summary-label">Applicant Name</span>
              <span className="rf-summary-value">Rahul Sharma</span>
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

        {/* Important Information */}
        <div className="rf-section">
          <h3 className="rf-section-title">Important Information</h3>
          <ul className="rf-info-list">
            <li>
              <span className="rf-bullet">•</span>
              Your registration will be confirmed after successful payment.
            </li>
            <li>
              <span className="rf-bullet">•</span>
              This is a one-time, non-refundable registration fee.
            </li>
            <li>
              <span className="rf-bullet">•</span>
              You will receive a confirmation email and receipt after payment.
            </li>
            <li>
              <span className="rf-bullet">•</span>
              For any payment issues, contact our support team.
            </li>
          </ul>
        </div>

        {/* Payment Amount */}
        <div className="rf-section rf-payment-section">
          <h3 className="rf-section-title">Payment Amount</h3>
          <div className="rf-amount-display">
            <span className="rf-currency">₹</span>
            <span className="rf-amount-number">1</span>
            <span className="rf-amount-text">One Rupee Only</span>
          </div>
        </div>

        {/* Payment Button */}
        <button 
          className="rf-payment-btn" 
          onClick={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? 'PROCESSING...' : 'PROCEED TO PAYMENT GATEWAY'}
        </button>

        {/* Payment Methods */}
        <div className="rf-payment-methods">
          <p className="rf-methods-label">We Accept</p>
          <div className="rf-methods-icons">
            <span className="rf-method-item">💳 VISA</span>
            <span className="rf-method-item">🏦 RuPay</span>
            <span className="rf-method-item">🏛️ NET BANKING</span>
          </div>
        </div>

        {/* Security Badge */}
        <div className="rf-security">
          <span className="rf-security-icon">🔒</span>
          <span className="rf-security-text">100% Secure Payment</span>
          <span className="rf-security-desc">Your payment details are safe and encrypted.</span>
        </div>

        {/* Support */}
        <div className="rf-support">
          <span className="rf-support-icon">❓</span>
          <span className="rf-support-text">Need Help? Contact Support</span>
        </div>
      </div>
    </div>
  );
}

export default RegistrationFees;