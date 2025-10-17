import styles from "./FooterPage.module.css";
import shopeLogo from "../assets/shope.svg";
import { Link } from "react-router";
import { Phone, Mail, MapPin } from "lucide-react";
export default function FooterPage() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.container}>
      <div>
        <div className={styles.intro}>
          <Link to="/">
            <img src={shopeLogo} alt={"shope log"}></img>
          </Link>
          <p>
            Your trusted online shop for the best products at unbeatable prices.
          </p>
        </div>

        <div className={styles.links}>
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/shoppingpage">Shop</a>
            </li>
            <li>
              <a href="/cartpage">Cart</a>
            </li>
          </ul>
        </div>

        <div className={styles.contact}>
          <h3>Get in Touch</h3>
          <p>
            <Phone />
            +1 (555) 123-4567
          </p>
          <p>
            <Mail /> support@Shopee.com
          </p>
          <p>
            <MapPin />
            123 Market St, NY
          </p>
        </div>
      </div>

      <hr></hr>

      <p>
        &copy;
        {year} All rights reserved.
      </p>
    </footer>
  );
}
