// App.jsx
import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import ShoppingPage from "./components/ShoppingPage.jsx";
import CartPage from "./components/CartPage.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import Layout from "./components/Layout.jsx";
import HomePage from "./components/home.jsx";
import ProductPage from "./components/ProductPage.jsx";
import "./index.css";

export default function App() {
  const [cartItems, setCartItems] = useState([]);

  // ✅ shared addToCart function
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // check if product already exists
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        // if exists, increase quantity
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // if new, add it with quantity 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout cartItems={cartItems} />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage addToCart={addToCart} /> },
        {
          path: "shoppingpage",
          element: <ShoppingPage cartItems={cartItems} addToCart={addToCart} />,
        },
        {
          path: "product/:id",
          element: <ProductPage cartItems={cartItems} addToCart={addToCart} />,
        },
        {
          path: "cartpage",
          element: (
            <CartPage cartItems={cartItems} setCartItems={setCartItems} />
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
