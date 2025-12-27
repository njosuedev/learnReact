import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Home.css";

export default function Home() {
  const slides = [
    {
      image: "/assets/banner1.jpg",
      title: "Cleanliness Made Simple",
      text: "Premium hygiene tools and chemical solutions for everyday life.",
    },
    {
      image: "/assets/banner2.jpg",
      title: "Smart Sanitation Products",
      text: "Safe, effective, and eco-friendly cleaning essentials.",
    },
    {
      image: "/assets/banner3.jpg",
      title: "Your Hygiene, Our Priority",
      text: "Top-quality soaps, detergents, and sanitizers delivered fast.",
    },
  ];

  const collections = [
    {
      id: 1,
      title: "Soaps & Sanitizers",
      images: [
        "/assets/soap1.jpg",
        "/assets/soap2.jpg",
        "/assets/soap3.jpg",
        "/assets/soap4.jpg",
      ],
      link: "/products?category=soaps",
    },
    {
      id: 2,
      title: "Cleaning Chemicals",
      images: [
        "/assets/chemical1.jpg",
        "/assets/chemical2.jpg",
        "/assets/chemical3.jpg",
        "/assets/chemical4.jpg",
      ],
      link: "/products?category=chemicals",
    },
    {
      id: 3,
      title: "Hygiene Tools",
      images: [
        "/assets/brush1.jpg",
        "/assets/mop1.jpg",
        "/assets/brush2.jpg",
        "/assets/mop2.jpg",
      ],
      link: "/products?category=tools",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrent((prev) => (prev + 1) % slides.length),
      5000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-page">

      {/* ===== FULL-WIDTH HERO ===== */}
      <section className="hero-red">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide ${index === current ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="hero-overlay">
              <span className="hero-badge">New</span>
              <h1>{slide.title}</h1>
              <p>{slide.text}</p>
              <Link to="/products" className="hero-btn">
                Shop Now →
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* ===== AMAZON-STYLE COLLECTIONS ===== */}
      <section className="collections">
        <h2 className="collections-title">Shop by Category</h2>
        <div className="collections-grid">
          {collections.map((col) => (
            <div className="collection-card" key={col.id}>
              <div className="collection-images">
                {col.images.map((img, idx) => (
                  <img src={img} alt={`${col.title} ${idx + 1}`} key={idx} />
                ))}
              </div>
              <h3>{col.title}</h3>
              <Link to={col.link} className="collection-link">
                Shop now →
              </Link>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
