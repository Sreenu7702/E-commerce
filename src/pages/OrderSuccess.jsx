import { Link } from "react-router-dom";

function OrderSuccess() {
  const orderId =
    localStorage.getItem("orderId");

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px",
      }}
    >
      <h1>Order Successful 🎉</h1>

      <h2>
        Order ID: {orderId}
      </h2>

      <Link to="/home">
        <button>
          Continue Shopping
        </button>
      </Link>
    </div>
  );
}

export default OrderSuccess;