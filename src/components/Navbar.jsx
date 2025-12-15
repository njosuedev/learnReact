import { Link } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/" className="logo-link">
        <img src="/hygiene.png" alt="Hygiene Logo" className="logo-img" />
      </Link>

      {/* Desktop Links */}
      <div className="navbar-links">
        <Link to="/" className="nav-item">Home</Link>
        <Link to="/products" className="nav-item">Products</Link>
        <Link to="/hygrosan" className="nav-item">About Us</Link>
      </div>

      {/* Mobile Toggle */}
      <button className="menu-toggle" onClick={() => setOpen(!open)}>
        ☰
      </button>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${open ? "show" : ""}`}>
        <Link to="/" onClick={() => setOpen(false)} className="nav-item">Home</Link>
        <Link to="/products" onClick={() => setOpen(false)} className="nav-item">Products</Link>
        <Link to="/hygrosan" onClick={() => setOpen(false)} className="nav-item">About Us</Link>
      </div>
    </nav>
  );
}
