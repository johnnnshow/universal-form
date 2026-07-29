import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTransaction } from '../context/TransactionContext';
import './PaymentModes.css';
import logo from '../assets/logo.png';
import googlePayIcon from '../assets/googlepay.png';
import phonePeIcon from '../assets/phonepe.png';
import paytmIcon from '../assets/paytm.png';
import netbankingIcon from '../assets/netbanking.png';
import cardIcon from '../assets/card.png';

function PaymentModes() {
  const navigate = useNavigate();
  const { transactionData, updateTransactionData } = useTransaction();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [selectedBank, setSelectedBank] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    { id: 'googlepay', name: 'Google Pay', icon: googlePayIcon, color: '#4285F4' },
    { id: 'phonepe', name: 'Phone Pe', icon: phonePeIcon, color: '#5F259F' },
    { id: 'paytm', name: 'Paytm', icon: paytmIcon, color: '#00BAF2' },
    { id: 'netbanking', name: 'Net Banking', icon: netbankingIcon, color: '#1a1a2e' },
    { id: 'card', name: 'Debit / Credit Card', icon: cardIcon, color: '#e74c3c' }
  ];

  const upiBanks = [
    'State Bank of India (SBI)',
    'Bank of Baroda',
    'Bank of India',
    'Bank of Maharashtra',
    'Canara Bank',
    'Central Bank of India',
    'Indian Bank',
    'Indian Overseas Bank',
    'Punjab & Sind Bank',
    'Punjab National Bank (PNB)',
    'UCO Bank',
    'Union Bank of India',
    'HDFC Bank',
    'ICICI Bank',
    'Axis Bank',
    'Kotak Mahindra Bank',
    'IndusInd Bank',
    'IDBI Bank',
    'IDFC FIRST Bank',
    'Yes Bank',
    'RBL Bank',
    'Federal Bank',
    'South Indian Bank',
    'Karnataka Bank',
    'Karur Vysya Bank',
    'City Union Bank',
    'Tamilnad Mercantile Bank',
    'DCB Bank',
    'CSB Bank',
    'Nainital Bank',
    'Other',
  ];

  const isUPIMethod = (methodId) => {
    return ['googlepay', 'phonepe', 'paytm'].includes(methodId);
  };

  const handleSelect = (id) => {
    setSelectedMethod(id);
    setSelectedBank(null);
  };

  const handleBankSelect = (bank) => {
    setSelectedBank(bank);
  };

  const handleProceed = () => {
    if (selectedMethod && (selectedBank || !isUPIMethod(selectedMethod))) {
      // Save payment data to transaction context
      updateTransactionData({
        paymentMode: selectedMethod,
        selectedBank: selectedBank || '',
      });

      setIsProcessing(true);
      
      setTimeout(() => {
        setIsProcessing(false);
        
        if (isUPIMethod(selectedMethod)) {
          navigate('/upi-pin');
        } else if (selectedMethod === 'card') {
          navigate('/card-payment');
        } else if (selectedMethod === 'netbanking') {
          navigate('/netbanking');
        } else {
          const methodName = paymentMethods.find(m => m.id === selectedMethod)?.name;
          alert(`✅ Payment initiated via ${methodName}!`);
        }
      }, 1500);
    }
  };

  const isProceedEnabled = () => {
    if (!selectedMethod) return false;
    if (isUPIMethod(selectedMethod) && !selectedBank) return false;
    return true;
  };

  return (
    <div className="pm-wrapper">
      <div className="pm-card">
        <h2 className="pm-title">Select Payment Mode</h2>
        <p className="pm-subtitle">Choose your preferred payment method to complete the transaction.</p>
        
        <div className="pm-methods-grid">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`pm-method-item ${selectedMethod === method.id ? 'pm-selected' : ''}`}
              onClick={() => handleSelect(method.id)}
            >
              <div className="pm-method-icon-wrapper" style={{ backgroundColor: `${method.color}15` }}>
                <img src={method.icon} alt={method.name} className="pm-method-icon" />
              </div>
              <span className="pm-method-name">{method.name}</span>
              {selectedMethod === method.id && (
                <div className="pm-checkmark">✓</div>
              )}
            </div>
          ))}
        </div>

        {selectedMethod && isUPIMethod(selectedMethod) && (
          <div className="pm-bank-section">
            <h3 className="pm-bank-title">Select Your Bank</h3>
            <p className="pm-bank-subtitle">Choose your bank from the list below:</p>
            <div className="pm-bank-grid">
              {upiBanks.map((bank) => (
                <div
                  key={bank}
                  className={`pm-bank-item ${selectedBank === bank ? 'pm-bank-selected' : ''}`}
                  onClick={() => handleBankSelect(bank)}
                >
                  <span className="pm-bank-name">{bank}</span>
                  {selectedBank === bank && (
                    <div className="pm-bank-checkmark">✓</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          className={`pm-proceed-btn ${isProceedEnabled() ? 'pm-active' : ''}`}
          onClick={handleProceed}
          disabled={!isProceedEnabled() || isProcessing}
        >
          {isProcessing ? 'PROCESSING...' : 'PROCEED TO PAY'}
        </button>

        <div className="pm-security">
          <span className="pm-security-icon">🔒</span>
          <span className="pm-security-text">100% Secure Payment</span>
          <span className="pm-security-desc">Your payment details are safe and encrypted.</span>
        </div>
      </div>
    </div>
  );
}

export default PaymentModes;