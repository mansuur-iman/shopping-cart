import { Outlet } from "react-router";
import NavPage from "./NavPage.jsx";
import FooterPage from "./FooterPage.jsx";
import styles from "./Layout.module.css";
export default function Layout({ cartItems }) {
  return (
    <div className={styles.layout}>
      <NavPage cartItems={cartItems} />
      <main className={styles.main}>
        <Outlet />
      </main>

      <FooterPage />
    </div>
  );
}
