import { ShoppingCart } from "lucide-react";
import { Link } from "react-router";
import shopeLogo from "../assets/shope.svg";
import styles from "./NavPage.module.css";

export default function NavPage({ cartItems }) {
  const itemCount = cartItems.length;

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">
          <img src={shopeLogo} alt="Shopee logo" />
        </Link>
      </div>
      <ul className={styles.nav}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="shoppingpage">Shop</Link>
        </li>
        <li className={styles.cartIcon}>
          <Link to="cartpage">
            <ShoppingCart />
            {itemCount > 0 && <span>{itemCount}</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
