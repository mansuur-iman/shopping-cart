import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Star } from "lucide-react";
import styles from "./home.module.css";
import hero1 from "../assets/hero1.jpg";
import hero2 from "../assets/hero2.jpg";
import hero3 from "../assets/hero3.jpg";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setTimeout(() => {
      setMessage("Thank you for subscribing!");
      setEmail("");
    }, 1000);
  };

  const slides = [
    {
      image: hero1,
      title: "Shop the Latest Trends",
      subtitle: "Discover our new arrivals before they sell out!",
      button: "Shop Now",
      link: "/shoppingpage",
    },
    {
      image: hero2,
      title: "Top Rated Collection",
      subtitle: "Our customers’ all-time favorites.",
      button: "View Collection",
      link: "/shoppingpage",
    },
    {
      image: hero3,
      title: "Exclusive Deals",
      subtitle: "Save up to 50% on selected items.",
      button: "Grab Offer",
      link: "/shoppingpage",
    },
  ];

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Fetch all products
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error("Network error");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (error)
    return (
      <p className={styles.messageError}>Network error, please try again</p>
    );
  if (loading) return <p className={styles.messageLoading}>Loading...</p>;

  const popularProducts = products.slice(0, 12);
  const featuredProducts = products.slice(12, 15);
  const ctaProduct = products[0];

  // Helper: Render stars
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.round(rating);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          size={16}
          fill={i < fullStars ? "#facc15" : "none"}
          stroke={i < fullStars ? "#facc15" : "#d1d5db"}
        />
      );
    }
    return stars;
  };

  return (
    <div className={styles.container}>
      {/* ===== HERO SECTION ===== */}
      <section className={styles.hero}>
        <img
          src={slides[currentSlide].image}
          alt={slides[currentSlide].title}
          className={styles.heroImage}
        />
        <div className={styles.heroContent}>
          <h1>{slides[currentSlide].title}</h1>
          <p>{slides[currentSlide].subtitle}</p>
          <Link to={slides[currentSlide].link}>
            <button>{slides[currentSlide].button}</button>
          </Link>
        </div>
      </section>

      {/* ===== POPULAR PRODUCTS ===== */}
      <section className={styles.popular}>
        <div className={styles.sectionHeader}>
          <h2>Popular Products</h2>
          <Link to="/shoppingpage" className={styles.seeMore}>
            See More →
          </Link>
        </div>

        <div className={styles.productGrid}>
          {popularProducts.map((product) => (
            <Link to={`/product/${product.id}`}>
              <div key={product.id} className={styles.productCard}>
                <img src={product.image} alt={product.title} />
                <h3>{product.title}</h3>
                <p className={styles.price}>${product.price}</p>
                <div className={styles.rating}>
                  {renderStars(product.rating.rate)}
                  <span>{product.rating.rate.toFixed(1)}</span>
                </div>
                <button className={styles.buyButton}>Buy Now</button>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className={styles.featured}>
        <h2>Featured Products</h2>

        <div className={styles.featureGrid}>
          {featuredProducts.map((product) => (
            <Link to={`/product/${product.id}`}>
              <div key={product.id} className={styles.featureCard}>
                <img src={product.image} alt={product.title} />
                <div className={styles.featureInfo}>
                  <h3>{product.title.slice(0, 40)}...</h3>
                  <p>{product.description.slice(0, 80)}...</p>
                  <button className={styles.buyButton}>Buy Now</button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== CALL TO ACTION ===== */}
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2>Exclusive Offer!</h2>
          <p>Don’t miss out on this limited-time deal.</p>
          <button>Shop {ctaProduct.title.split(" ")[0]}</button>
        </div>
        <img src={ctaProduct.image} alt={ctaProduct.title} />
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section className={styles.newsletter}>
        <h2>Stay Updated!</h2>
        <p>
          Get the latest deals, trends, and product updates straight to your
          inbox.
        </p>
        <form className={styles.newsForm} onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <button type="submit">Subscribe</button>
        </form>
        <p className={styles.para}>{message}</p>
      </section>
    </div>
  );
}

export default HomePage;
