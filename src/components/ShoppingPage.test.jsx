import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import ShoppingPage from "../components/ShoppingPage.jsx";
describe("testing the shoppingpage components", () => {
  test("it shows loading message initially", () => {
    render(
      <MemoryRouter>
        <ShoppingPage />
      </MemoryRouter>
    );
    const message = screen.getByText(/Loading.../i);
    expect(message).toBeInTheDocument();
  });

  test("it throws network error if the fetch fails", async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error("Network error"));
    render(
      <MemoryRouter>
        <ShoppingPage />
      </MemoryRouter>
    );

    const message = await screen.findByText(/Network error, please try again/i);
    expect(message).toBeInTheDocument();
  });

  test("check for successful fetch and display of products", async () => {
    const mockProducts = [
      {
        id: 1,
        title: "Laptop",
        image: "test.jpg",
        price: 10.99,
        category: "electronics",
        description: "just a demo",
        rating: {
          rate: 4.5,
          count: 100,
        },
      },
    ];
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockProducts,
    });

    render(
      <MemoryRouter>
        <ShoppingPage />
      </MemoryRouter>
    );

    const success = await screen.findByText(/Laptop/i);
    expect(success).toBeInTheDocument();
    expect(screen.getByText(/\$10.99/i)).toBeInTheDocument();
  });

  test("increase and decrese quantity on buttons click and add to cart button", async () => {
    const mockProducts = [
      {
        id: 1,
        title: "Laptop",
        image: "test.jpg",
        price: 10.99,
        category: "electronics",
        description: "just a demo",
        rating: {
          rate: 4.5,
          count: 100,
        },
      },
    ];

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockProducts,
    });

    const setCartItems = vi.fn();
    render(
      <MemoryRouter>
        <ShoppingPage cartItems={[]} setCartItems={setCartItems} />
      </MemoryRouter>
    );

    await screen.findByText(/Laptop/i);
    const increaseBtn = screen.getByTestId(/increase/i);
    const decreaseBtn = screen.getByTestId(/decrease/i);

    await userEvent.click(increaseBtn);
    expect(screen.getByText("2")).toBeInTheDocument();

    await userEvent.click(decreaseBtn);
    expect(screen.getByText("1")).toBeInTheDocument();

    const addBtn = screen.getByRole("button", { name: /Add to cart/i });
    await userEvent.click(addBtn);
    expect(setCartItems).toHaveBeenCalled(1);
    expect(setCartItems).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          product: mockProducts[0],
          quantity: 1,
        }),
      ])
    );
  });
});
