import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useState } from "react";
import './Layout.css';

export default function Layout() {
  // State for active filter
  const [activeFilter, setActiveFilter] = useState("all"); // "all" | "active" | "inactive"

  return (
    <div className="layout">

      <Navbar />

      <div className="layout-body">

        <aside className="layout-sidebar">
          <h2>Sidebar</h2>

          {/* Radio Filter */}
          <div className="filter-group">
            <p>Filter Users:</p>
            <label>
              <input
                type="radio"
                name="userStatus"
                value="all"
                checked={activeFilter === "all"}
                onChange={() => setActiveFilter("all")}
              />
              All
            </label>
            <label>
              <input
                type="radio"
                name="userStatus"
                value="active"
                checked={activeFilter === "active"}
                onChange={() => setActiveFilter("active")}
              />
              Active
            </label>
            <label>
              <input
                type="radio"
                name="userStatus"
                value="inactive"
                checked={activeFilter === "inactive"}
                onChange={() => setActiveFilter("inactive")}
              />
              Inactive
            </label>
          </div>
        </aside>

        <main className="layout-content">
          {/* Pass filter state to children */}
          <Outlet context={{ activeFilter }} />
        </main>

      </div>

      <Footer />

    </div>
  );
}
