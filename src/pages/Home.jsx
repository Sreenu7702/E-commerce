import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Products from "../components/Products";

function Home() {
  const { cart } = useContext(CartContext);

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        E-Commerce Store
      </h1>

      <div
        style={{
          textAlign: "end",
          marginBottom: "20px",
          paddingRight: "20px",
        }}
      >
        <Link to="/cart">
          <button
            style={{
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            Cart ({totalItems})
          </button>
        </Link>
      </div>

      <Products />
    </div>
  );
}

export default Home;