import React, { useContext, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { ProductsContext } from "../contexts/ProductsContext.jsx";
import './Home.css';

export default function Home() {
  const { products, loading, error } = useContext(ProductsContext);
  const { activeCategory } = useOutletContext();
  const [searchProduct, setSearchProduct] = useState("");

  const filteredProducts = products
    .filter(product =>
      product.title.toLowerCase().includes(searchProduct.toLowerCase())
    )
    .filter(product => {
      if (!activeCategory || activeCategory === "all") return true;
      return product.category.toLowerCase() === activeCategory.toLowerCase();
    });

  return (
    <div className="home-page">
      <input
        type="text"
        placeholder="Search products..."
        value={searchProduct}
        onChange={(e) => setSearchProduct(e.target.value)}
        className="search-input"
      />

      <div className="products-grid">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div className="product-card skeleton" key={i}>
                <div className="image-wrapper skeleton-box"></div>
                <div className="product-title skeleton-box"></div>
                <div className="product-category skeleton-box"></div>
                <div className="product-status skeleton-box"></div>
              </div>
            ))
          : filteredProducts.length > 0
          ? filteredProducts.map(product => {
              const slug = product.title.trim().replace(/\s+/g, "-").toLowerCase();
              return (
                <div key={product.id} className="product-card">
                  <Link to={`/products/${slug}`} className="image-link">
                    <div className="image-wrapper">
                      <img src={product.img} alt={product.title} className="product-image" />
                      <span className={`status-badge ${product.available ? "available" : "unavailable"}`}>
                        {product.available ? "Available" : "Unavailable"}
                      </span>
                    </div>
                  </Link>
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-category">{product.category}</p>
                </div>
              );
            })
          : <p className="no-products">No products found.</p>
        }
      </div>

      {error && <p className="error">Error: {error}</p>}
    </div>
  );
}
