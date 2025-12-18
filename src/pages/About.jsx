import React from "react";
import "./About.css";

function About() {
    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="about-hero">
                <h1>About Us</h1>
                <p>Cleanliness you can trust. Quality you can feel.</p>
            </section>

            {/* Content Section */}
            <section className="about-content">
                <div className="about-card">
                    <h2>Who We Are</h2>
                    <p>
                        We are a dedicated hygiene and cleaning products supplier offering
                        high-quality liquid soaps, detergents, and cleaning tools for homes,
                        offices, and businesses. Our goal is to make cleanliness affordable,
                        effective, and accessible to everyone.
                    </p>
                </div>

                <div className="about-card">
                    <h2>What We Offer</h2>
                    <ul>
                        <li>Liquid hand wash & antibacterial soaps</li>
                        <li>Toilet & floor cleaners</li>
                        <li>Laundry detergents & fabric softeners</li>
                        <li>Hygiene tools & cleaning accessories</li>
                    </ul>
                </div>

                <div className="about-card">
                    <h2>Why Choose Us</h2>
                    <p>
                        ✔ High-quality and tested products<br />
                        ✔ Affordable pricing<br />
                        ✔ Reliable customer support<br />
                        ✔ Fast response via WhatsApp
                    </p>
                </div>
            </section>

            {/* Contacts Section */}
            <section className="about-contacts">
                <h2>Contact Information</h2>
                <p className="contacts-subtitle">
                    We’re always ready to help you with your hygiene and cleaning needs.
                </p>

                <div className="contacts-grid">
                    <div className="contact-card">
                        <h3>Phone</h3>
                        <p>
                            <a href="tel:+250794000813">+250 794 000 813</a>
                        </p>
                    </div>

                    <div className="contact-card">
                        <h3>WhatsApp</h3>
                        <p>
                            <a
                                href="https://wa.me/250794000813"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Chat with us on WhatsApp
                            </a>
                        </p>
                    </div>

                    <div className="contact-card">
                        <h3>Email</h3>
                        <p>
                            <a href="mailto:info@hygieneafrica.com">info@hygieneafrica.com</a>
                        </p>
                    </div>

                    <div className="contact-card">
                        <h3>Location</h3>
                        <p>Kigali, Rwanda</p>
                    </div>
                </div>
            </section>

        </div>
    );
}

export default About;
