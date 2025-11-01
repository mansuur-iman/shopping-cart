import { useState, useEffect } from "react";
import {
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Search,
  Menu,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router";

import styles from "./NavPage.module.css";

export default function NavPage({ cartItems }) {
  const itemCount = cartItems.length;
  const [currentBanner, setCurrentBanner] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const banners = [
    "Free shipping on orders above $50!",
    "More gadgets, more life — Shop Now!",
    "Exclusive deals every week!",
  ];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/shoppingpage");
  };

  // Auto-slide banner text
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const nextBanner = () =>
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  const prevBanner = () =>
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);

  return (
    <header className={styles.header}>
      <div className={styles.topBanner}>
        <button onClick={prevBanner} className={styles.arrowBtn}>
          <ChevronLeft size={25} />
        </button>
        <p className={styles.bannerText}>
          {banners[currentBanner].includes("Shop Now") ? (
            <>
              More gadgets, more life —{" "}
              <Link to="/shoppingpage" className={styles.bannerLink}>
                Shop Now
              </Link>
            </>
          ) : (
            banners[currentBanner]
          )}
        </p>
        <button onClick={nextBanner} className={styles.arrowBtn}>
          <ChevronRight size={25} />
        </button>
      </div>

      <nav className={styles.navbar}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <Link to="/">
              <h1>
                urban<span>store</span>
              </h1>
            </Link>
          </div>

          <div
            className={styles.menuToggle}
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={20} />}
          </div>
        </div>

        <ul className={`${styles.navLinks} ${menuOpen ? styles.showMenu : ""}`}>
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/shoppingpage" onClick={() => setMenuOpen(false)}>
              Shop
            </Link>
          </li>

          <li>
            <Link
              to="/shoppingpage?filter=new"
              onClick={() => setMenuOpen(false)}
            >
              New Arrivals
            </Link>
          </li>
        </ul>

        <div className={styles.rightSection}>
          <div className={styles.searchBox} onClick={handleNavigate}>
            <Search size={18} />
          </div>

          <div className={styles.cartIcon}>
            <Link to="/cartpage" onClick={() => setMenuOpen(false)}>
              <ShoppingCart size={22} />
              {itemCount > 0 && <span>{itemCount}</span>}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
