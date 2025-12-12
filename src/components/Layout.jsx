import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useState, useContext, useEffect } from "react";
import { ProductsContext } from "../contexts/ProductsContext.jsx";
import './Layout.css';

export default function Layout() {
  const navigate = useNavigate();
  const { products } = useContext(ProductsContext);

  const [activeCategory, setActiveCategory] = useState("all");

  // Track open/closed state for parent categories
  const [openCategories, setOpenCategories] = useState({});

  const [categories, setCategories] = useState({ all: [] });

  // Extract nested categories dynamically
  useEffect(() => {
    if (products && products.length > 0) {
      const grouped = {};
      products.forEach((p) => {
        const parent = p.parentCategory || p.category;
        if (!grouped[parent]) grouped[parent] = [];
        if (!grouped[parent].includes(p.category)) grouped[parent].push(p.category);
      });
      setCategories({ all: [], ...grouped });

      // Initialize open state
      const initialOpen = {};
      Object.keys(grouped).forEach(key => initialOpen[key] = false);
      setOpenCategories(initialOpen);
    }
  }, [products]);

  const toggleParent = (parent) => {
    setOpenCategories(prev => ({ ...prev, [parent]: !prev[parent] }));
  };

  const handleCategorySelect = (category) => {
    setActiveCategory(category);
    navigate("/"); // go back to Home to see filtered products
  };

  return (
    <div className="layout">
      <Navbar />

      <div className="layout-body">

        {/* Sidebar */}
        <aside className="layout-sidebar">
          <h2>Product Categories</h2>

          <div className="filter-group">
            {Object.entries(categories).map(([parent, children]) => (
              <div key={parent} style={{ marginBottom: "1rem" }}>
                {parent !== "all" && (
                  <div
                    onClick={() => toggleParent(parent)}
                    style={{ cursor: "pointer", fontWeight: "bold" }}
                  >
                    {parent.charAt(0).toUpperCase() + parent.slice(1)}
                    <span style={{ float: "right" }}>
                      {openCategories[parent] ? "▲" : "▼"}
                    </span>
                  </div>
                )}

                <div style={{ marginLeft: "1rem", display: parent === "all" || openCategories[parent] ? "block" : "none" }}>
                  {parent === "all" && (
                    <label>
                      <input
                        type="radio"
                        name="category"
                        value="all"
                        checked={activeCategory === "all"}
                        onChange={() => handleCategorySelect("all")}
                      />
                      All
                    </label>
                  )}
                  {children.map((child) => (
                    <label key={child} style={{ display: "block" }}>
                      <input
                        type="radio"
                        name="category"
                        value={child}
                        checked={activeCategory === child}
                        onChange={() => handleCategorySelect(child)}
                      />
                      {child.charAt(0).toUpperCase() + child.slice(1)}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <main className="layout-content">
          <Outlet context={{ activeCategory }} />
        </main>

      </div>

      <Footer />
    </div>
  );
}
