import React, { createContext, useState, useEffect, useMemo } from "react";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:3000/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Compute categories dynamically
  const categories = useMemo(() => {
    const catSet = new Set();
    products.forEach((p) => catSet.add(p.category));
    return Array.from(catSet);
  }, [products]);

  // Filter products
  const filterProducts = (activeCategory) => {
    if (activeCategory === "all") return products;
    return products.filter(
      (p) => p.category.toLowerCase() === activeCategory.toLowerCase()
    );
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
        loading,
        error,
        refetch: fetchProducts,
        categories,
        filterProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
