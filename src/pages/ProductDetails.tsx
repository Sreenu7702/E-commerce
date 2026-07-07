import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addToCart,
  type Product,
} from "../features/cartslice";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [product, setProduct] =
    useState<Product | null>(null);

  useEffect(() => {
    if (!id) return;

    fetch(
      `https://fakestoreapi.com/products/${id}`
    )
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
            alert(
              "Added To Cart Successfully"
            );

            dispatch(
              addToCart(product)
            );
          }}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;