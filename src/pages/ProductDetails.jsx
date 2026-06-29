import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) {
    return <h2>Loading...</h2>;
  }
  


  return (
    <div className="product-details">
      <div className="product-image-section">
        <img
          src={product.image}
          alt={product.title}
          className="details-image"
        />
      </div>

      <div className="product-info">
        <h2>{product.title}</h2>

        <p className="category">
          {product.category}
        </p>

        <h3 className="price">
          ₹ {product.price}
        </h3>

        <p className="description">
          {product.description}
        </p>

        <button
          className="add-cart-btn"
          onClick={() =>{
            alert("Added To Cart Successfully");
            addToCart(product) }}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;