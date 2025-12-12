import React, { useState, useContext, useEffect } from "react";
import { ProductsContext } from "../contexts/ProductsContext.jsx";
import './Sidebar.css';

export default function Sidebar({ activeCategory, setActiveCategory }) {
  const { products } = useContext(ProductsContext);

  // State to hold nested categories
  const [categories, setCategories] = useState({});

  // State to track expanded main categories
  const [expanded, setExpanded] = useState({});

  // Build nested categories from products
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

  const toggleExpand = (main) => {
    setExpanded(prev => ({ ...prev, [main]: !prev[main] }));
  };

  const handleChange = (value) => {
    setActiveCategory(value);
  };

  return (
    <aside className="sidebar">
      <h2>Categories</h2>

      {/* All products */}
      <div className="category">
        <label>
          <input
            type="radio"
            name="category"
            value="all"
            checked={activeCategory === "all"}
            onChange={() => handleChange("all")}
          />
          All
        </label>
      </div>

      {/* Main + subcategories */}
      {Object.keys(categories).map(main => (
        <div className="category" key={main}>
          <button className="main-cat" onClick={() => toggleExpand(main)}>
            {main.charAt(0).toUpperCase() + main.slice(1)}
            <span>{expanded[main] ? "▲" : "▼"}</span>
          </button>

          {expanded[main] && categories[main].length > 0 && (
            <div className="subcategory">
              {categories[main].map(sub => {
                const value = `${main}/${sub}`;
                return (
                  <label key={sub}>
                    <input
                      type="radio"
                      name="category"
                      value={value}
                      checked={activeCategory.toLowerCase() === value.toLowerCase()}
                      onChange={() => handleChange(value)}
                    />
                    {sub.charAt(0).toUpperCase() + sub.slice(1)}
                  </label>
                )
              })}
            </div>
          )}
        </div>
      ))}
    </aside>
  );
}
