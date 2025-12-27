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
  const { products, setFilteredProducts } = useContext(ProductsContext);

  const [categories, setCategories] = useState({});
  const [openMain, setOpenMain] = useState(null);

  // Build categories dynamically from products
  useEffect(() => {
    if (!products?.length) return;

    const grouped = {};

    products.forEach(p => {
      const cat = p.category?.toLowerCase() || "uncategorized";
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

  // Handle category selection and navigate to /products
  const handleSelect = value => {
    setActiveCategory(value);

    // Filter products
    let filtered = [];
    if (value === "all") {
      filtered = products;
    } else {
      const [main, sub] = value.split("/");
      filtered = products.filter(p => {
        const cat = p.category?.toLowerCase();
        if (sub) return cat === `${main}/${sub}`;
        return cat.startsWith(main);
      });
    }

    // Update filtered products
    setFilteredProducts(filtered);

    // Always navigate to the main products page
    navigate("/products");
  };

  const toggleMain = main => {
    setOpenMain(prev => (prev === main ? null : main));
  };

  return (
    <aside className="layout-sidebar">
      <h2 className="sidebar-title">Categories</h2>

      {/* All products */}
      <label className={`radio-item ${activeCategory === "all" ? "active" : ""}`}>
        <input
          type="radio"
          name="category"
          checked={activeCategory === "all"}
          onChange={() => handleSelect("all")}
        />
        <FaBoxes className="icon" />
        All Products
      </label>

      {/* Dynamic categories */}
      {Object.keys(categories).map(main => (
        <div key={main} className="category-group">
          <div
            className={`category-main ${openMain === main ? "open" : ""}`}
            onClick={() => toggleMain(main)}
          >
            <div className="left">
              <FaLayerGroup className="icon" />
              <span>{main.charAt(0).toUpperCase() + main.slice(1)}</span>
            </div>

            {openMain === main ? (
              <FaChevronDown className="arrow-icon" />
            ) : (
              <FaChevronRight className="arrow-icon" />
            )}
          </div>

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
