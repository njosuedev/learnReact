import { Link } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiSearch, FiShoppingCart, FiHome, FiInfo, FiBox } from "react-icons/fi";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Left: Logo */}
      <Link to="/" className="logo-link">
        <img src="/hygiene.png" alt="Hygiene Store" className="logo-img" />
      </Link>

      {/* Right: Desktop Links */}
      <div className="navbar-links">
        <Link to="/" className="nav-item"><FiHome /> Home</Link>
        <Link to="/products" className="nav-item"><FiBox /> Products</Link>
        <Link to="/hygrosan" className="nav-item"><FiInfo /> About</Link>
        <Link to="/cart" className="nav-cart">
          <FiShoppingCart /> <span className="cart-badge">2</span>
        </Link>
      </div>

      {/* Mobile Toggle */}
      <button className="menu-toggle" onClick={() => setOpen(!open)}>
        <FiMenu />
      </button>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${open ? "show" : ""}`}>
        <input className="mobile-search" type="text" placeholder="Search products..." />
        <Link to="/" onClick={() => setOpen(false)}><FiHome /> Home</Link>
        <Link to="/products" onClick={() => setOpen(false)}><FiBox /> Products</Link>
        <Link to="/hygrosan" onClick={() => setOpen(false)}><FiInfo /> About</Link>
        <Link to="/cart" onClick={() => setOpen(false)}><FiShoppingCart /> Cart</Link>
      </div>
    </nav>
  );
}
