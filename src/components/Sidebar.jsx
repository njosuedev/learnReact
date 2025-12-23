import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProductsContext } from "../contexts/ProductsContext.jsx";
import {
  FaLayerGroup,
  FaChevronRight,
  FaChevronDown,
  FaBoxes
} from "react-icons/fa";
import "./Sidebar.css";

export default function Sidebar({ activeCategory, setActiveCategory }) {
  const navigate = useNavigate();
  const { products } = useContext(ProductsContext);

  const [categories, setCategories] = useState({});
  const [openMain, setOpenMain] = useState(null);

  useEffect(() => {
    if (!products?.length) return;

    const grouped = {};

    products.forEach(p => {
      const cat = p.category.toLowerCase();
      const [main, sub] = cat.split("/");

      if (!grouped[main]) grouped[main] = new Set();
      if (sub) grouped[main].add(sub);
    });

    const formatted = {};
    Object.keys(grouped).forEach(k => {
      formatted[k] = Array.from(grouped[k]);
    });

    setCategories(formatted);
  }, [products]);

  const handleSelect = value => {
    setActiveCategory(value);
    navigate("/");
  };

  const toggleMain = main => {
    setOpenMain(prev => (prev === main ? null : main));
  };

  return (
    <aside className="layout-sidebar">
      <h2 className="sidebar-title">Categories</h2>

      {/* All products */}
      <label
        className={`radio-item ${activeCategory === "all" ? "active" : ""}`}
      >
        <input
          type="radio"
          name="category"
          checked={activeCategory === "all"}
          onChange={() => handleSelect("all")}
        />
        <FaBoxes className="icon" />
        All Products
      </label>

      {/* Categories */}
      {Object.keys(categories).map(main => (
        <div key={main} className="category-group">
          {/* Main category */}
          <div
            className={`category-main ${openMain === main ? "open" : ""}`}
            onClick={() => toggleMain(main)}
          >
            <div className="left">
              <FaLayerGroup className="icon" />
              <span>
                {main.charAt(0).toUpperCase() + main.slice(1)}
              </span>
            </div>

            {openMain === main ? (
              <FaChevronDown className="arrow-icon" />
            ) : (
              <FaChevronRight className="arrow-icon" />
            )}
          </div>

          {/* Subcategories */}
          {openMain === main && (
            <div className="category-children">
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
                      onChange={() => handleSelect(value)}
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
