import { useParams, Link } from "react-router-dom";
import { useContext, useState } from "react";
import { ProductsContext } from "../contexts/ProductsContext.jsx";
import "./ProductProfile.css";

export default function ProductProfile() {
  const { title } = useParams();
  const { products } = useContext(ProductsContext);

  const product = products.find(
    p => p.title.trim().replace(/\s+/g, "-").toLowerCase() === title.toLowerCase()
  );

  const [quantity, setQuantity] = useState(1);

  if (!product) return <p className="not-found">Product not found</p>;

  const increaseQty = () => setQuantity(q => q + 1);
  const decreaseQty = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  const whatsappNumber = "250790206517"; 
  const whatsappMessage = `
Hello! I am interested in this product:

Product: ${product.title}
Quantity: ${quantity}
Category: ${product.category}
Image: ${product.img}
`;
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  // Related products (same main category)
  const mainCategory = product.category?.split("/")[0].toLowerCase();
  const relatedProducts = products
    .filter(p => p.id !== product.id && p.category?.toLowerCase().startsWith(mainCategory))
    .slice(0, 4); // show up to 4 related items

  return (
    <div className="product-profile-page">
      <div className="product-profile">
        {/* Product Image */}
        <div className="product-image">
          <img src={product.img} alt={product.title} />
        </div>

        {/* Product Details */}
        <div className="product-details">
          <h1>{product.title}</h1>

          <p className={`product-status ${product.available ? "available" : "unavailable"}`}>
            {product.available ? "Available" : "Unavailable"}
          </p>

          <p className="product-category">
            <strong>Category:</strong> {product.category}
          </p>

          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description || "No description available for this product."}</p>
          </div>

          <div className="quantity-selector">
            <button onClick={decreaseQty} className="qty-btn">-</button>
            <span className="qty">{quantity}</span>
            <button onClick={increaseQty} className="qty-btn">+</button>
          </div>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-btn"
          >
            Contact on WhatsApp
          </a>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="related-products">
          <h2>Related Products</h2>
          <div className="related-grid">
            {relatedProducts.map(rp => (
              <Link
                to={`/products/${rp.title.trim().replace(/\s+/g, "-").toLowerCase()}`}
                key={rp.id}
                className="related-card"
              >
                <div className="related-image">
                  <img src={rp.img} alt={rp.title} />
                </div>
                <h4>{rp.title}</h4>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
