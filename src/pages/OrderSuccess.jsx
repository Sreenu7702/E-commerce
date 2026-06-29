import { Link } from "react-router-dom";
import "./OrderSuccess.css";

function OrderSuccess() {
  const orderId = localStorage.getItem("orderId");

  return (
    <div className="success-container">
      <div className="success-card">
        <div className="success-icon">✅</div>

        <h1>Order Successful</h1>

        <p>
          Thank you for your purchase.
        </p>

        <h2>Order ID</h2>

        <div className="order-id">
          {orderId}
        </div>

        <Link to="/home">
          <button className="shop-btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;