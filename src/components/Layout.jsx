import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Banner from "./Banner.jsx";
import Sidebar from "./Sidebar.jsx";
import "./Layout.css";

export default function Layout() {
  const [activeCategory, setActiveCategory] = useState("all");
  const location = useLocation();

  // ✅ Check if current page is Home
  const isHomePage = location.pathname === "/";

  return (
    <div className="layout">
      <Navbar />

      {/* Optional: keep banner only on home */}
      {isHomePage && <Banner />}

      <div className="layout-body">
        {/* ===== ASIDE / SIDEBAR (NOT on Home) ===== */}
        {!isHomePage && (
          <Sidebar
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        )}

        {/* ===== MAIN CONTENT ===== */}
        <main className="layout-content">
          <Outlet context={{ activeCategory }} />
        </main>
      </div>

      <Footer />
    </div>
  );
}
