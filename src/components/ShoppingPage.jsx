import { Plus, Minus, Star } from "lucide-react";
import styles from "./ShoppingPage.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router";
function ShoppingPage({ cartItems, setCartItems }) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [quantities, setQuantities] = useState({});
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) {
          throw new Error("Network error, please try again");
        }
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const increase = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const decrease = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, prev[id] || 1) - 1,
    }));
  };

  const addToCart = (product) => {
    setCartItems([
      ...cartItems,
      { product, quantity: quantities[product.id] || 1 },
    ]);
  };

  if (error)
    return (
      <p className={styles.messageError}>Network error, please try again</p>
    );

  if (loading) return <p className={styles.messageLoading}>Loading...</p>;

  return (
    <div className={styles.container}>
      {products.map((product) => (
        <div key={product.id} className={styles.productCard}>
          <img
            src={product.image}
            alt={product.title}
            className={styles.productImage}
          />
          <h2 className={styles.productTitle}>{product.title}</h2>
          <p className={styles.productDesc}>{product.description}</p>
          <p className={styles.productMeta}>
            <strong>Category:</strong> {product.category}
          </p>
          <p className={styles.price}>${product.price}</p>
          <div className={styles.rating}>
            <Star size={16} /> {product.rating.rate} ({product.rating.count})
          </div>

          <div className={styles.actions}>
            <button data-testid="decrease" onClick={() => decrease(product.id)}>
              <Minus size={14} />
            </button>
            <p className={styles.quantity}>{quantities[product.id] || 1}</p>
            <button data-testid="increase" onClick={() => increase(product.id)}>
              <Plus size={14} />
            </button>
          </div>

          <button
            className={styles.addToCart}
            onClick={() => addToCart(product)}
          >
            Add to cart
          </button>
        </div>
      ))}
    </div>
  );
}
export default ShoppingPage;
