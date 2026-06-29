import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );


  if (loading) {
    return <h2>Loading Products...</h2>;
  }


  return (
    <div className="products-container">
      

      <input
        type="text"
        placeholder="Search Product..."
        style={{ display: "block", margin: "20px auto" }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      {filteredProducts.length===0 ?(<h2>Product Not Available</h2>):(
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.image}
              alt={product.title}
              className="product-image"
            />

            <h3>{product.title}</h3>

            <p className="price">₹ {product.price}</p>

            <Link to={`/home/product/${product.id}`}>
              <button className="details-btn">View Details</button>
            </Link>
          </div>
        ))}
      </div>
      )}
    </div>
  );
}

export default Products;