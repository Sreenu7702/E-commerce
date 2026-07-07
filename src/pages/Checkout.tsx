import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../app/store";
import { clearCart } from "../features/cartslice";
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
  const dispatch = useDispatch();

  const cart = useSelector(
    (state: RootState) => state.cart.cart
  );

  const navigate = useNavigate();

  const [form, setForm] =
    useState<FormData>({
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

    dispatch(clearCart());

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