import React, { useContext, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { ProductsContext } from "../contexts/ProductsContext.jsx";
import './Home.css';

export default function Home() {
  const { products, loading, error } = useContext(ProductsContext);
  const { activeCategory } = useOutletContext();

  const [searchProduct, setSearchProduct] = useState("");

  // Filter products by search + category
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
      <h1>Products</h1>

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
                <div className="product-company skeleton-box"></div>
                <div className="product-price skeleton-box"></div>
              </div>
            ))
          : filteredProducts.length > 0
          ? filteredProducts.map(product => {
              const slug = product.title.trim().replace(/\s+/g, "-").toLowerCase();
              return (
                <Link
                  key={product.id}
                  to={`/products/${slug}`}
                  className="product-card"
                >
                  <div className="image-wrapper">
                    <img src={product.img} alt={product.title} className="product-image" />
                  </div>
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-company">Brand: {product.company}</p>
                  <p className="product-category">Category: {product.category}</p>
                  <p className="product-color">Color: {product.color}</p>
                  <p className="product-price">
                    {product.prevPrice && <span className="prev-price">{product.prevPrice}</span>} ${product.newPrice}
                  </p>
                  <p className="product-rating">
                    {"★".repeat(product.star)} ({product.reviews})
                  </p>
                  <button className="add-to-cart">Add to Cart</button>
                </Link>
              );
            })
          : <p>No products found.</p>
        }
      </div>

      {error && <p className="error">Error: {error}</p>}
    </div>
  );
}
