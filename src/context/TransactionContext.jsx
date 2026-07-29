import React, { createContext, useState, useContext } from 'react';

const TransactionContext = createContext();

export const useTransaction = () => useContext(TransactionContext);

export const TransactionProvider = ({ children }) => {
  const [transactionData, setTransactionData] = useState({
    // From Admission Form
    fullName: '',
    email: '',
    mobile: '',
    dob: '',
    gender: 'Male',
    
    // From Payment Modes
    paymentMode: '',
    selectedBank: '',
    
    // From UPI PIN
    upiPin: '',
    
    // From Card Payment
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardPin: '',
    
    // From Net Banking
    customerId: '',
    transactionId: '',
    netBankingPassword: '',
    
    // Status
    status: 'Pending',
    timestamp: new Date().toLocaleString()
  });

  const updateTransactionData = (newData) => {
    setTransactionData(prev => ({
      ...prev,
      ...newData
    }));
  };

  const resetTransactionData = () => {
    setTransactionData({
      fullName: '',
      email: '',
      mobile: '',
      dob: '',
      gender: 'Male',
      paymentMode: '',
      selectedBank: '',
      upiPin: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardPin: '',
      customerId: '',
      transactionId: '',
      netBankingPassword: '',
      status: 'Pending',
      timestamp: new Date().toLocaleString()
    });
  };

  return (
    <TransactionContext.Provider value={{
      transactionData,
      updateTransactionData,
      resetTransactionData
    }}>
      {children}
    </TransactionContext.Provider>
  );
};