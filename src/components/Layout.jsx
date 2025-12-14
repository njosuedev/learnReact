import { Outlet, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ProductsContext } from "../contexts/ProductsContext.jsx";
import "./Layout.css";

export default function Layout() {
  const navigate = useNavigate();
  const { products } = useContext(ProductsContext);

  const [activeCategory, setActiveCategory] = useState("all");
  const [categories, setCategories] = useState({});

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

  const handleSelect = (value) => {
    setActiveCategory(value);
    navigate("/");
  };

  return (
    <div className="layout">
      <Navbar />

      <div className="layout-body">
        {/* Sidebar */}
        <aside className="layout-sidebar">
          <h2 className="sidebar-title">Categories</h2>

          <label className={`radio-item ${activeCategory === "all" ? "active" : ""}`}>
            <input
              type="radio"
              name="category"
              checked={activeCategory === "all"}
              onChange={() => handleSelect("all")}
            />
            All Products
          </label>

          {Object.keys(categories).map(main => (
            <div key={main} className="category-group">
              <p className="category-main">
                {main.charAt(0).toUpperCase() + main.slice(1)}
              </p>

              <div className="category-children">
                {categories[main].map(sub => {
                  const value = `${main}/${sub}`;
                  return (
                    <label
                      key={sub}
                      className={`radio-item sub ${activeCategory === value ? "active" : ""}`}
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
            </div>
          ))}
        </aside>

        {/* Content */}
        <main className="layout-content">
          <Outlet context={{ activeCategory }} />
        </main>
      </div>

      <Footer />
    </div>
  );
}
