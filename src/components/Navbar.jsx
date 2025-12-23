import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  FiMenu,
  FiHome,
  FiInfo,
  FiBox,
  FiPhone,
  FiMail,
} from "react-icons/fi";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Left: Logo */}
      <NavLink to="/" className="logo-link">
        <img src="/Logo.svg" alt="Hygiene Store" className="logo-img" />
      </NavLink>

      {/* Center Links */}
      <div className="navbar-center">
        <NavLink to="/" className="nav-item">
          <FiHome /> Home
        </NavLink>
        <NavLink to="/products" className="nav-item">
          <FiBox /> Products
        </NavLink>
        <NavLink to="/hygrosan" className="nav-item">
          <FiInfo /> About
        </NavLink>
        <NavLink to="/contact" className="nav-item">
          <FiMail /> Contact Us
        </NavLink>
      </div>

      {/* Right Phone */}
      <a href="tel:+250794000813" className="nav-phone">
        <FiPhone /> +250 794 000 813
      </a>

      {/* Mobile Toggle */}
      <button className="menu-toggle" onClick={() => setOpen(!open)}>
        <FiMenu />
      </button>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${open ? "show" : ""}`}>
        <NavLink to="/" onClick={() => setOpen(false)}>
          <FiHome /> Home
        </NavLink>
        <NavLink to="/products" onClick={() => setOpen(false)}>
          <FiBox /> Products
        </NavLink>
        <NavLink to="/hygrosan" onClick={() => setOpen(false)}>
          <FiInfo /> About
        </NavLink>
        <NavLink to="/contact" onClick={() => setOpen(false)}>
          <FiMail /> Contact Us
        </NavLink>

        <a href="tel:+250789564753">
          <FiPhone /> +250 789 564 753
        </a>
      </div>
    </nav>
  );
}
