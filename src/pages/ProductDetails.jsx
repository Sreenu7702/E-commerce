import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";

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
    <div>
      <img src={product.image} width="200" />

      <h2>{product.title}</h2>

      <h3>${product.price}</h3>

      <button className="add-cart-btn" onClick={() => addToCart(product)}>
        Add To Cart
      </button>
    </div>
  );
}

export default ProductDetails;