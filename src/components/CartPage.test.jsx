import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CartPage from "../components/CartPage";
import userEvent from "@testing-library/user-event";

describe("cartpage component", () => {
  test("shows your cart is empty when it has no items", () => {
    render(<CartPage cartItems={[]}></CartPage>);
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  test("it removes product from cart", async () => {
    const mockRemove = vi.fn();
    const cartItems = [
      {
        product: {
          id: 1,
          title: "Product title",
          image: "https://example.com/img.jpg",
          price: 10,
        },
        quantity: 1,
      },
    ];

    render(<CartPage cartItems={cartItems} setCartItems={mockRemove} />);

    const removeBtn = screen.getByTestId(/remove/i);
    await userEvent.click(removeBtn);

    expect(mockRemove).toHaveBeenCalled();
  });

  test("it displays product", () => {
    const cartItems = [
      {
        product: {
          id: 1,
          title: "Product title",
          image: "https://example.com/img.jpg",
          price: 10,
        },
        quantity: 1,
      },
    ];
    render(<CartPage cartItems={cartItems} />);

    expect(screen.getByText(/product title/i)).toBeInTheDocument();
  });

  test("check total logic", () => {
    const cartItems = [
      {
        product: { id: 1, title: "A", price: 10, image: "img1.jpg" },
        quantity: 2,
      },
    ];

    const setCartItem = vi.fn();
    render(<CartPage cartItems={cartItems} setCartItem={setCartItem} />);

    const totalItem1 = 2 * 10;
    expect(
      screen.getByText(`Total: $${totalItem1.toFixed(2)}`)
    ).toBeInTheDocument();
  });
});
