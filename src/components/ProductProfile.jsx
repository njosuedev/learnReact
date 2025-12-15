import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { ProductsContext } from "../contexts/ProductsContext";
import './ProductProfile.css';

export default function ProductProfile() {
  const { title } = useParams();
  const { products } = useContext(ProductsContext);

  const product = products.find(
    p => p.title.trim().replace(/\s+/g, "-").toLowerCase() === title.toLowerCase()
  );

  const [quantity, setQuantity] = useState(1);

  if (!product) return <p className="not-found">Product not found</p>;

  const increaseQty = () => setQuantity(prev => prev + 1);
  const decreaseQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const whatsappLink = `https://wa.me/250790206517?text=Hello! I am interested in your product: ${encodeURIComponent(product.title)}. Quantity: ${quantity}`;

  return (
    <div className="product-profile">
      <div className="product-image">
        <img src={product.img} alt={product.title} />
      </div>

      <div className="product-details">
        <h1>{product.title}</h1>
        <p className={`product-status ${product.available ? "available" : "unavailable"}`}>
          {product.available ? "Available" : "Unavailable"}
        </p>
        <p className="product-category"><strong>Category:</strong> {product.category}</p>

        {/* Product Description */}
        <div className="product-description">
          <h3>Description</h3>
          <p>{product.description || "No description available for this product."}</p>
        </div>

        {/* Quantity Selector */}
        <div className="quantity-selector">
          <button onClick={decreaseQty} className="qty-btn">-</button>
          <span className="qty">{quantity}</span>
          <button onClick={increaseQty} className="qty-btn">+</button>
        </div>

        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="whatsapp-btn">
          Contact on WhatsApp
        </a>
      </div>
    </div>
  );
}
