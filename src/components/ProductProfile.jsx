import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ProductsContext } from "../contexts/ProductsContext";

export default function ProductProfile() {
  const { title } = useParams();
  const { products } = useContext(ProductsContext);

  const product = products.find(
    p => p.title.trim().replace(/\s+/g, "-").toLowerCase() === title.toLowerCase()
  );

  if (!product) return <p>Product not found</p>;

  return (
    <div>
      <h1>{product.title}</h1>
      <img src={product.img} alt={product.title} />
      <p>Brand: {product.company}</p>
      <p>Category: {product.category}</p>
      <p>Color: {product.color}</p>
      <p>Price: {product.newPrice}</p>
      <p>Reviews: {product.reviews}</p>
    </div>
  );
}
