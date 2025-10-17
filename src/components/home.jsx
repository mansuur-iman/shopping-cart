import { useState, useEffect } from "react";
import { Link } from "react-router";
import styles from "./home.module.css";

function HomePage() {
  const [categories, setCategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAll() {
      try {
        const fetchAllCategories = await fetch(
          "https://fakestoreapi.com/products/categories"
        );
        if (!fetchAllCategories.ok) throw new Error("Network error");
        const data = await fetchAllCategories.json();
        setCategories(data);

        const allProductCategories = data.map((category) =>
          fetch(`https://fakestoreapi.com/products/category/${category}`).then(
            (response) => {
              if (!response.ok) throw new Error("Network error");
              return response.json();
            }
          )
        );

        const allProducts = await Promise.all(allProductCategories);

        const mapped = {};
        data.forEach((category, index) => {
          mapped[category] = allProducts[index];
        });

        setCategoryProducts(mapped);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, []);

  if (error)
    return (
      <p className={styles.messageError}>Network error, please try again</p>
    );

  if (loading) return <p className={styles.messageLoading}>Loading...</p>;

  return (
    <div className={styles.container}>
      {categories.map((category, index) => (
        <div key={category + index} className={styles.cards}>
          <h1>{category.toUpperCase()}</h1>
          <div className={styles.card}>
            {categoryProducts[category]?.map((product) => (
              <div key={product.id}>
                <img
                  src={product.image}
                  alt={product.title}
                  width="100%"
                  height="150"
                />
                <h3>{product.title}</h3>
                <Link to="/shoppingpage">
                  <button type="submit">Shop Now</button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
