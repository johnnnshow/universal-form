// PaymentFailed.jsx
import { useNavigate } from "react-router-dom";
import "./PaymentFailed.css";

export default function PaymentFailed() {
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate("/payment-modes");
  };

  return (
    <div className="pf-payment-page">
      <div className="pf-payment-overlay">
        <div className="pf-failed-content">
          <div className="pf-failed-icon">!</div>
          <h2 className="pf-failed-title">Transfer of ₹1 failed.</h2>
        </div>

        <div className="pf-bottom-sheet">
          <h3 className="pf-sheet-title">Technical Issue</h3>

          <ul className="pf-issue-list">
            <li className="pf-issue-item">
              There is a technical issue at your bank. Please try after some time.
            </li>
            <li className="pf-issue-item">
              Or Use Net Banking from Another Bank
            </li>
          </ul>

          <div className="pf-bottom-buttons">
            <button className="pf-done-btn" onClick={handleRetry}>Retry</button>
          </div>
        </div>
      </div>
    </div>
  );
}