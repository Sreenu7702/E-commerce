import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Products from "../components/Products";
import "./Home.css";

function Home() {
  const { cart } = useContext(CartContext);

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="home">
      <div className="header">
        <h1>E-Commerce Store</h1>

        <Link to="/cart">
          <button className="cart-btn">
            Cart ({totalItems})
          </button>
        </Link>
      </div>

      <Products />
    </div>
  );
}

export default Home;