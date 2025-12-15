import { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductsContext } from "../contexts/ProductsContext";
import "./Banner.css";

export default function Banner() {
  const { products, loading, error } = useContext(ProductsContext);

  if (loading) return <p className="text-center py-4">Loading products...</p>;
  if (error) return <p className="text-center py-4 text-red-500">{error}</p>;
  if (!products || products.length === 0) return <p className="text-center py-4">No products available</p>;

  return (
    <div className="banner">
      <h2 className="banner-title">🔥 Hot Deals - Limited Time Offers! 🔥</h2>

      <div className="scrolling-track">
        {products.concat(products).map((product, idx) => {
          // generate URL-friendly title
          const productSlug = product.title.trim().replace(/\s+/g, "-").toLowerCase();

          return (
            <Link to={`/products/${productSlug}`} key={idx} className="product-img">
              <img src={product.img} alt={product.title} />
              <div className={`product-badge ${product.available ? "available" : "not-available"}`}>
                {product.available ? "SALE" : "OUT OF STOCK"}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="gradient-left"></div>
      <div className="gradient-right"></div>
    </div>
  );
}
