import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import AdmissionForm from './components/AdmissionForm';
import RegistrationFees from './components/RegistrationFees';
import './App.css';

function Navigation() {
  const location = useLocation();
  
  return (
    <nav className="app-nav">
      <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
        📝 Admission Form
      </Link>
      <Link to="/payment" className={location.pathname === '/payment' ? 'active' : ''}>
        💳 Pay Fees
      </Link>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<AdmissionForm />} />
          <Route path="/payment" element={<RegistrationFees />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;