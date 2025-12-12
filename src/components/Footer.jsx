import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-column">
          <h4>Get to Know Us</h4>
          <ul>
            <li>About Us</li>
            <li>Careers</li>
            <li>Press Releases</li>
            <li>Blog</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Make Money with Us</h4>
          <ul>
            <li>Sell on My App</li>
            <li>Affiliate Program</li>
            <li>Advertise Your Products</li>
            <li>Self-Publish</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Customer Service</h4>
          <ul>
            <li>Help Center</li>
            <li>Returns</li>
            <li>Shipping Info</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Payment & Delivery</h4>
          <ul>
            <li>Payment Methods</li>
            <li>Gift Cards</li>
            <li>Mobile App</li>
            <li>Track Orders</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 My App. All rights reserved.</p>
      </div>
    </footer>
  );
}
