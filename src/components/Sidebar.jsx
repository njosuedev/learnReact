import React, { useState, useContext, useEffect } from "react";
import { ProductsContext } from "../contexts/ProductsContext.jsx";
import "./Sidebar.css";

export default function Sidebar({ activeCategory, setActiveCategory }) {
  const { products } = useContext(ProductsContext);

  const [categories, setCategories] = useState({});
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    if (!products) return;

    const map = {};
    products.forEach(p => {
      const [main, sub] = p.category.split("/").map(c => c.trim());
      if (!map[main]) map[main] = new Set();
      if (sub) map[main].add(sub);
    });

    const formatted = {};
    Object.keys(map).forEach(k => {
      formatted[k] = Array.from(map[k]);
    });

    setCategories(formatted);
  }, [products]);

  const toggleDropdown = (main) => {
    setOpenDropdown(openDropdown === main ? null : main);
    setActiveCategory(main); // filter all under main
  };

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Categories</h2>

      {/* All products */}
      <label className={`radio-item ${activeCategory === "all" ? "active" : ""}`}>
        <input
          type="radio"
          name="category"
          checked={activeCategory === "all"}
          onChange={() => {
            setActiveCategory("all");
            setOpenDropdown(null);
          }}
        />
        All Products
      </label>

      {/* Dropdown categories */}
      {Object.keys(categories).map(main => (
        <div key={main} className="dropdown">
          <button
            className="dropdown-btn"
            onClick={() => toggleDropdown(main)}
          >
            <span>{main}</span>
            <span className={`icon ${openDropdown === main ? "open" : ""}`}>
              ▾
            </span>
          </button>

          {openDropdown === main && (
            <div className="dropdown-menu">
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
                    {sub}
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
