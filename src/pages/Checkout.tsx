import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext.js";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

type FormData = {
  name: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
};

function Checkout() {
  const cartContext =useContext(CartContext);

  if (!cartContext) {
    throw new Error(
      "CartContext not found"
    );
  }

  const { cart, clearCart } =
    cartContext;

  const navigate = useNavigate();

  const [form, setForm] =useState<FormData>({
      name: "",
      phone: "",
      address: "",
      city: "",
      pincode: "",
    });

  const totalPrice = cart.reduce(
    (total, item) =>
      total +
      item.price * item.quantity,
    0
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name as keyof FormData]:
        e.target.value,
    });
  };

  const placeOrder = () => {
    if (
      !form.name ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.pincode
    ) {
      alert("Please fill all fields");
      return;
    }

    const orderId =
      "ORD" + Date.now();

    localStorage.setItem(
      "orderId",
      orderId
    );

    clearCart();

    navigate("/success");
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        onChange={handleChange}
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        onChange={handleChange}
      />

      <textarea
        name="address"
        placeholder="Address"
        onChange={handleChange}
      />

      <input
        type="text"
        name="city"
        placeholder="City"
        onChange={handleChange}
      />

      <input
        type="text"
        name="pincode"
        placeholder="Pincode"
        onChange={handleChange}
      />

      <h2 className="total-price">
        Total: ₹
        {totalPrice.toFixed(2)}
      </h2>

      <button onClick={placeOrder}>
        Place Order
      </button>
    </div>
  );
}

export default Checkout;