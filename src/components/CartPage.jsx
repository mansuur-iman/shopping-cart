// CartPage.jsx
import { Plus, Minus, Trash2, ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import styles from "./CartPage.module.css";

function CartPage({ cartItems, setCartItems }) {
  // Increase quantity
  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  // Remove item
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Calculate subtotal
  const grossTotal = cartItems.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 1),
    0
  );

  // Empty cart message
  if (!cartItems || cartItems.length === 0)
    return (
      <div className={styles.emptyContainer}>
        <p className={styles.empty}>Your cart is empty 🛒</p>
        <Link to="/shoppingpage" className={styles.backToShop}>
          <ArrowLeft size={16} /> Back to Shop
        </Link>
      </div>
    );

  return (
    <section className={styles.cartSection}>
      <h1 className={styles.pageTitle}>Your Cart</h1>

      <div className={styles.container}>
        {cartItems.map((item) => (
          <div key={item.id} className={styles.cartItem}>
            <img src={item.image} alt={item.title} className={styles.image} />

            <div className={styles.details}>
              <h2 className={styles.title}>{item.title}</h2>
              <p className={styles.price}>${item.price.toFixed(2)}</p>
              <p className={styles.total}>
                Total: ${(item.quantity * item.price).toFixed(2)}
              </p>
            </div>

            <div className={styles.controls}>
              <div className={styles.quantityControl}>
                <button onClick={() => decreaseQuantity(item.id)}>
                  <Minus size={16} />
                </button>
                <p>
                  <strong>{item.quantity}</strong>
                </p>
                <button onClick={() => increaseQuantity(item.id)}>
                  <Plus size={16} />
                </button>
              </div>

              <button
                className={styles.remove}
                onClick={() => removeFromCart(item.id)}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.gross}>
        <p>Subtotal: ${grossTotal.toFixed(2)}</p>
        <button
          className={styles.checkout}
          onClick={() => alert("Checkout feature coming soon 🚀")}
        >
          Checkout
        </button>
      </div>

      <Link to="/shoppingpage" className={styles.backToShop}>
        <ArrowLeft size={16} /> Back to Shop
      </Link>
    </section>
  );
}

export default CartPage;
