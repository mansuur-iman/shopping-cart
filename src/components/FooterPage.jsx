import styles from "./FooterPage.module.css";

import { Link } from "react-router";
import { Phone, Mail, MapPin } from "lucide-react";
export default function FooterPage() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.container}>
      <div>
        <div className={styles.intro}>
          <div className={styles.logo}>
            <Link to="/">
              <h1>
                urban<span>store</span>
              </h1>
            </Link>
          </div>

          <p className={styles.description}>
            At Urbanstore, we bring you a carefully curated selection of
            products that combine quality, style, and affordability. From
            everyday essentials to trending collections, we’re committed to
            giving you a seamless shopping experience that you can trust.
          </p>
        </div>

        <div className={styles.links}>
          <h3>Company</h3>
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
          <h3>Get in touch</h3>
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
