import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Products.css";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err: Error) => {
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
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
        className="search-input"
      />

      {filteredProducts.length === 0 ? (
        <h2>Product Not Available</h2>
      ) : (
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
                <button className="details-btn">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;