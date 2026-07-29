import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTransaction } from '../context/TransactionContext';
import './AdmissionForm.css';

function AdmissionForm() {
  const navigate = useNavigate();
  const { transactionData, updateTransactionData } = useTransaction();
  
  const [formData, setFormData] = useState({
    fullName: transactionData.fullName || '',
    email: transactionData.email || '',
    mobile: transactionData.mobile || '',
    dob: transactionData.dob || '',
    gender: transactionData.gender || 'Male',
  });

  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    mobile: false,
    dob: false,
    gender: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };

  const isFormValid = () => {
    return (
      formData.fullName.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.mobile.trim() !== '' &&
      formData.dob.trim() !== '' &&
      formData.gender !== ''
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      return;
    }

    setIsSubmitting(true);

    // Save to transaction context
    updateTransactionData({
      fullName: formData.fullName,
      email: formData.email,
      mobile: formData.mobile,
      dob: formData.dob,
      gender: formData.gender,
    });

    setIsSubmitting(false);
    navigate('/RegistrationFees');
  };

  return (
    <div className="af-register-container">
      {/* Background Image Section */}
      <div className="af-background-wrapper">
        <img 
          src="/register-bg.png"
          alt="Registration Background" 
          className="af-background-image"
          onError={(e) => {
            console.log('Background image failed to load');
            e.target.style.display = 'none';
            e.target.parentElement.classList.add('af-gradient-fallback');
          }}
        />
        <div className="af-background-overlay"></div>
      </div>

      {/* Form Card */}
      <div className="af-register-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '4px', position: 'relative' }}>
          <img 
            src="/login-icon.png" 
            alt="Login" 
            className="af-login-icon"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <h1 className="af-register-title" style={{ marginBottom: '0', marginRight: '30px' }}>Register Now</h1>
        </div>
        <p className="af-register-subtitle">Please fill in your details to get started</p>

        <form onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <div className="af-form-group">
            <label htmlFor="af-fullName" className="af-form-label">
              Full Name <span className="af-required">*</span>
            </label>
            <div className="af-input-wrapper">
              <span className="af-input-icon">
                <img 
                  src="/user-icon.png" 
                  alt="User" 
                  className="af-input-icon-img"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </span>
              <input
                type="text"
                id="af-fullName"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`af-form-input ${touched.fullName && !formData.fullName ? 'af-input-error' : ''}`}
                required
              />
            </div>
            {touched.fullName && !formData.fullName && (
              <div className="af-error-message">Full name is required</div>
            )}
          </div>

          {/* Email Address */}
          <div className="af-form-group">
            <label htmlFor="af-email" className="af-form-label">
              Email Address <span className="af-required">*</span>
            </label>
            <div className="af-input-wrapper">
              <span className="af-input-icon">
                <img 
                  src="/email-icon.png" 
                  alt="Email" 
                  className="af-input-icon-img"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </span>
              <input
                type="email"
                id="af-email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`af-form-input ${touched.email && !formData.email ? 'af-input-error' : ''}`}
                required
              />
            </div>
            {touched.email && !formData.email && (
              <div className="af-error-message">Email is required</div>
            )}
          </div>

          {/* Mobile Number */}
          <div className="af-form-group">
            <label htmlFor="af-mobile" className="af-form-label">
              Mobile Number <span className="af-required">*</span>
            </label>
            <div className="af-input-wrapper">
              <span className="af-input-icon">
                <img 
                  src="/phone-icon.png" 
                  alt="Phone" 
                  className="af-input-icon-img"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </span>
              <input
                type="tel"
                id="af-mobile"
                name="mobile"
                placeholder="Enter your mobile number"
                value={formData.mobile}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`af-form-input ${touched.mobile && !formData.mobile ? 'af-input-error' : ''}`}
                required
              />
            </div>
            {touched.mobile && !formData.mobile && (
              <div className="af-error-message">Mobile number is required</div>
            )}
          </div>

          {/* Date of Birth */}
          <div className="af-form-group">
            <label htmlFor="af-dob" className="af-form-label">
              Date of Birth <span className="af-required">*</span>
            </label>
            <div className="af-input-wrapper">
              <span className="af-input-icon">
                <img 
                  src="/calendar-icon.png" 
                  alt="Calendar" 
                  className="af-input-icon-img"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </span>
              <input
                type="text"
                id="af-dob"
                name="dob"
                placeholder="DD / MM / YYYY"
                value={formData.dob}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`af-form-input ${touched.dob && !formData.dob ? 'af-input-error' : ''}`}
                required
              />
            </div>
            {touched.dob && !formData.dob && (
              <div className="af-error-message">Date of birth is required</div>
            )}
          </div>

          {/* Gender */}
          <div className="af-form-group">
            <label className="af-form-label">
              Gender <span className="af-required">*</span>
            </label>
            <div className="af-gender-options">
              {['Male', 'Female', 'Other'].map((option) => (
                <label key={option} className="af-gender-option">
                  <input
                    type="radio"
                    name="gender"
                    value={option}
                    checked={formData.gender === option}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className="af-gender-radio"
                    required
                  />
                  {option === 'Male' && (
                    <img 
                      src="/male-icon.png" 
                      alt="Male" 
                      className="af-gender-icon"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  )}
                  {option === 'Female' && (
                    <img 
                      src="/female-icon.png" 
                      alt="Female" 
                      className="af-gender-icon"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  )}
                  {option === 'Other' && (
                    <img 
                      src="/other-icon.png" 
                      alt="Other" 
                      className="af-gender-icon"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  )}
                  {option}
                </label>
              ))}
            </div>
            {touched.gender && !formData.gender && (
              <div className="af-error-message">Please select your gender</div>
            )}
          </div>

          {/* Register Button */}
          <button 
            type="submit" 
            className="af-register-button"
            disabled={!isFormValid() || isSubmitting}
          >
            {isSubmitting ? 'SUBMITTING...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdmissionForm;