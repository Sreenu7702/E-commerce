import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import Products from "../components/Products";
import "./Home.css";

function Home() {
  const cart = useSelector(
    (state: RootState) => state.cart.cart
  );

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