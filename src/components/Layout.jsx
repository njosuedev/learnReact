import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Banner from "./Banner.jsx";
import Sidebar from "./Sidebar.jsx"; // ✅ import Sidebar
import "./Layout.css";

export default function Layout() {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <div className="layout">
      <Navbar />
      <Banner />

      <div className="layout-body">
        {/* ===== ASIDE / SIDEBAR ===== */}
        <Sidebar
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {/* ===== MAIN CONTENT ===== */}
        <main className="layout-content">
          <Outlet context={{ activeCategory }} />
        </main>
      </div>

      <Footer />
    </div>
  );
}
