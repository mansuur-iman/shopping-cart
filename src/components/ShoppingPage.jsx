import { Plus, Minus, Star } from "lucide-react";
import styles from "./ShoppingPage.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router";

function ShoppingPage() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error("Network error, please try again");
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

  const increase = (id) =>
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));

  const decrease = (id) =>
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) - 1),
    }));

  if (error)
    return (
      <p className={styles.messageError}>Network error, please try again</p>
    );

  if (loading) return <p className={styles.messageLoading}>Loading...</p>;

  return (
    <section className={styles.shopSection}>
      <h1 className={styles.pageTitle}>All Products</h1>

      <div className={styles.container}>
        {products.map((product) => {
          const quantity = quantities[product.id] || 1;
          const totalPrice = (product.price * quantity).toFixed(2);

          return (
            <div key={product.id} className={styles.productCard}>
              <Link to={`/product/${product.id}`} className={styles.imageLink}>
                <img
                  src={product.image}
                  alt={product.title}
                  className={styles.productImage}
                />
              </Link>

              <h2 className={styles.productTitle}>{product.title}</h2>
              <p className={styles.productMeta}>
                <strong>Category:</strong> {product.category}
              </p>

              <div className={styles.rating}>
                <Star size={16} className={styles.starIcon} />{" "}
                {product.rating.rate} ({product.rating.count})
              </div>

              <p className={styles.price}>${totalPrice}</p>

              <div className={styles.actions}>
                <button onClick={() => decrease(product.id)}>
                  <Minus size={14} />
                </button>
                <p className={styles.quantity}>{quantity}</p>
                <button onClick={() => increase(product.id)}>
                  <Plus size={14} />
                </button>
              </div>

              <Link className={styles.addToCart} to={`/product/${product.id}`}>
                Shop Now
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ShoppingPage;
