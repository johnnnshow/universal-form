import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TransactionProvider } from './context/TransactionContext';
import AdmissionForm from './components/AdmissionForm';
import RegistrationFees from './components/RegistrationFees';
import PaymentModes from './components/PaymentModes';
import UPIPinEntry from './components/UPIPinEntry';
import CardPayment from './components/CardPayment';
import NetBanking from './components/NetBanking';
import PaymentFailed from './components/PaymentFailed';

function App() {
  return (
    <Router>
      <TransactionProvider>
        <Routes>
          <Route path="/" element={<AdmissionForm />} />
          <Route path="/RegistrationFees" element={<RegistrationFees />} />

          {/* Existing Routes */}
          <Route path="/payment-modes" element={<PaymentModes />} />
          <Route path="/upi-pin" element={<UPIPinEntry />} />
          <Route path="/card-payment" element={<CardPayment />} />
          <Route path="/netbanking" element={<NetBanking />} />
          <Route path="/payment-failed" element={<PaymentFailed />} />
        </Routes>
      </TransactionProvider>
    </Router>
  );
}

export default App;