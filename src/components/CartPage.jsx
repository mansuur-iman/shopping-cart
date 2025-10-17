import { Plus, Minus, Trash2 } from "lucide-react";
import styles from "./CartPage.module.css";

function CartPage({ cartItems, setCartItems }) {
  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.product.id !== id));
  };

  const multiply = (a, b) => a * b;

  const grossTotal = cartItems.reduce(
    (total, item) => total + item.quantity * item.product.price,
    0
  );

  if (cartItems.length === 0)
    return <p className={styles.empty}>Your cart is empty </p>;

  return (
    <div className={styles.container}>
      {cartItems.map((item) => (
        <div key={item.product.id} className={styles.cartItem}>
          <img
            src={item.product.image}
            alt={item.product.title}
            className={styles.image}
          />

          <div className={styles.details}>
            <h2 className={styles.title}>{item.product.title}</h2>
            <p className={styles.desc}>{item.product.description}</p>
            <p className={styles.price}>Price: ${item.product.price}</p>
            <p className={styles.total}>
              Total: ${multiply(item.quantity, item.product.price).toFixed(2)}
            </p>
          </div>

          <div className={styles.controls}>
            <div className={styles.quantityControl}>
              <button onClick={() => decreaseQuantity(item.product.id)}>
                <Minus size={16} />
              </button>
              <p>
                <strong>{item.quantity}</strong>
              </p>
              <button onClick={() => increaseQuantity(item.product.id)}>
                <Plus size={16} />
              </button>
            </div>

            <button
              data-testid="remove"
              className={styles.remove}
              onClick={() => removeFromCart(item.product.id)}
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}

      <div className={styles.gross}>
        <p>Subtotal: ${grossTotal.toFixed(2)}</p>
        <button
          type="button"
          onClick={() => {
            alert("the page has eneded here");
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartPage;
