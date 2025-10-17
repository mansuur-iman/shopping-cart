// App.jsx
import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import ShoppingPage from "./components/ShoppingPage.jsx";
import CartPage from "./components/CartPage.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import Layout from "./components/Layout.jsx";
import HomePage from "./components/home.jsx";
import "./index.css";

export default function App() {
  const [cartItems, setCartItems] = useState([]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout cartItems={cartItems} />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "/shoppingpage",
          element: (
            <ShoppingPage cartItems={cartItems} setCartItems={setCartItems} />
          ),
        },
        {
          path: "/cartpage",
          element: (
            <CartPage cartItems={cartItems} setCartItems={setCartItems} />
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
