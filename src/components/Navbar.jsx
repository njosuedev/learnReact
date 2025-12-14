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
        <Link to="/">Home</Link>
        <Link to="/">Deals</Link>
        <Link to="/">Orders</Link>
        <Link to="/">Cart</Link>
      </div>

      {/* Mobile Toggle */}
      <button className="menu-toggle" onClick={() => setOpen(!open)}>
        ☰
      </button>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${open ? "show" : ""}`}>
        <Link to="/" onClick={() => setOpen(false)}>Home</Link>
        <Link to="/" onClick={() => setOpen(false)}>Deals</Link>
        <Link to="/" onClick={() => setOpen(false)}>Orders</Link>
        <Link to="/" onClick={() => setOpen(false)}>Cart</Link>
      </div>
    </nav>
  );
}
