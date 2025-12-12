import { Link } from "react-router-dom";
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo-link">Amazon</Link>
      </div>

      <div className="navbar-search">
        <input
          type="text"
          placeholder="Search products..."
          className="search-input"
        />
        <button className="search-button">Search</button>
      </div>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/">Deals</Link>
        <Link to="/">Orders</Link>
        <Link to="/">Cart</Link>
      </div>
    </nav>
  );
}
