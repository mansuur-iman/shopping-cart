import { useParams, Link } from "react-router";
import { useState, useEffect } from "react";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import styles from "./ProductPage.module.css";

export default function ProductPage({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p className={styles.loading}>Loading product details...</p>;
  }

  if (!product) {
    return <p className={styles.error}>Product not found.</p>;
  }

  return (
    <section className={styles.productPage}>
      <div className={styles.container}>
        {/* Back Button */}
        <Link to="/shoppingpage" className={styles.backLink}>
          <ArrowLeft size={18} /> Back to Shop
        </Link>

        <div className={styles.productWrapper}>
          {/* Product Image */}
          <div className={styles.imageContainer}>
            <img src={product.image} alt={product.title} />
          </div>

          {/* Product Info */}
          <div className={styles.infoContainer}>
            <h2>{product.title}</h2>
            <p className={styles.category}>
              Category: <span>{product.category}</span>
            </p>
            <p className={styles.description}>{product.description}</p>
            <h3 className={styles.price}>${product.price}</h3>

            <button
              className={styles.addBtn}
              onClick={() => addToCart(product)}
            >
              <ShoppingCart size={18} /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
