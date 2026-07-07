import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../app/store";
import {
  clearCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../features/cartslice";
import "./Cart.css";

function Cart() {
  const dispatch = useDispatch();

  const cart = useSelector(
    (state: RootState) => state.cart.cart
  );

  const totalItems = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, item) =>
      total +
      item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h1 className="cart-title">
        Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <h2 className="empty-cart">
          No Products In Cart
        </h2>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div
                key={item.id}
                className="cart-card"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="cart-image"
                />

                <div className="cart-info">
                  <h3>{item.title}</h3>

                  <p className="cart-price">
                    ₹{item.price}
                  </p>

                  <p>
                    Subtotal: ₹
                    {(
                      item.price *
                      item.quantity
                    ).toFixed(2)}
                  </p>

                  <div className="qty-box">
                    <button
                      onClick={() =>
                        dispatch(
                          decreaseQuantity(
                            item.id
                          )
                        )
                      }
                    >
                      -
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        dispatch(
                          increaseQuantity(
                            item.id
                          )
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  className="remove-btn"
                  onClick={() =>
                    dispatch(
                      removeFromCart(
                        item.id
                      )
                    )
                  }
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>
              Total Items:
              {totalItems}
            </h2>

            <h2>
              Total Price: ₹
              {totalPrice.toFixed(2)}
            </h2>

            <Link to="/checkout">
              <button className="checkout-btn">
                Checkout
              </button>
            </Link>

            <button
              className="clear-btn"
              onClick={() =>
                dispatch(clearCart())
              }
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;