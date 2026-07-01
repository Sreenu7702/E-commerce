import {  Routes, Route } from "react-router-dom";
import Login from "./pages/Login.js";
import Home from "./pages/Home.js";
import ProductDetails from "./pages/ProductDetails.js";
import Cart from "./pages/Cart.js";
import Checkout from "./pages/Checkout.js";
import OrderSuccess from "./pages/OrderSuccess.js";

function App() {
  return (
   
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<OrderSuccess />} />
      </Routes>
   
  );
}

export default App;