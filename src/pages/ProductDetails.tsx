import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  CartContext,
  type CartContextType,
} from "../context/CartContext";
import "./ProductDetails.css";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
};

function ProductDetails() {
  const { id } = useParams();

  const cartContext = useContext(
    CartContext
  ) as CartContextType | null;

  if (!cartContext) {
    throw new Error("CartContext not found");
  }

  const { addToCart } = cartContext;

  const [product, setProduct] =
    useState<Product | null>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data: Product) => {
        setProduct(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  if (!id) {
    return <h2>Product not found</h2>;
  }

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
          onClick={() => {
            alert("Added To Cart Successfully");
            addToCart(product);
          }}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;