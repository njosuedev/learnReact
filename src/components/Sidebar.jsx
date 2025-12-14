import React, { useState, useContext, useEffect } from "react";
import { ProductsContext } from "../contexts/ProductsContext.jsx";
import "./Sidebar.css";

export default function Sidebar({ activeCategory, setActiveCategory }) {
  const { products } = useContext(ProductsContext);

  const [categories, setCategories] = useState({});
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    if (!products) return;

    const catObj = {};
    products.forEach((p) => {
      const [mainCat, subCat] = p.category.split("/").map(c => c.trim());
      const mainKey = mainCat.toLowerCase();
      const subKey = subCat?.toLowerCase();

      if (!catObj[mainKey]) catObj[mainKey] = new Set();
      if (subKey) catObj[mainKey].add(subKey);
    });

    const formatted = {};
    Object.keys(catObj).forEach(key => {
      formatted[key] = Array.from(catObj[key]);
    });

    setCategories(formatted);
  }, [products]);

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Categories</h2>

      {/* All */}
      <label className={`radio-item ${activeCategory === "all" ? "active" : ""}`}>
        <input
          type="radio"
          name="category"
          checked={activeCategory === "all"}
          onChange={() => setActiveCategory("all")}
        />
        All Products
      </label>

      {/* Categories */}
      {Object.keys(categories).map(main => (
        <div key={main} className="category-block">
          <button
            className="main-cat"
            onClick={() => setExpanded(p => ({ ...p, [main]: !p[main] }))}
          >
            <span>{main.charAt(0).toUpperCase() + main.slice(1)}</span>
            <span className="arrow">{expanded[main] ? "▲" : "▼"}</span>
          </button>

          {expanded[main] && (
            <div className="subcategory">
              {categories[main].map(sub => {
                const value = `${main}/${sub}`;
                return (
                  <label
                    key={sub}
                    className={`radio-item sub ${
                      activeCategory === value ? "active" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="category"
                      checked={activeCategory === value}
                      onChange={() => setActiveCategory(value)}
                    />
                    {sub.charAt(0).toUpperCase() + sub.slice(1)}
                  </label>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </aside>
  );
}
