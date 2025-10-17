import { describe, test, expect, vi } from "vitest";
import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import HomePage from "../components/home.jsx";

describe("HomePage component", () => {
  test("shows loading message initially", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test("it shows network error if fetch rejects", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.reject(new Error("Network error")))
    );

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const message = await screen.findByText(/Network error, please try again/i);
    expect(message).toBeInTheDocument();
  });

  test("shows categories and products after successful fetch", async () => {
    const mockCategories = ["Electronics"];
    const mockProducts = [
      {
        id: 1,
        title: "Laptop",
        image: "test.jpg",
      },
    ];

    globalThis.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockCategories,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts,
      });

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const category = await screen.findByText(/ELECTRONICS/i);
    expect(category).toBeInTheDocument();

    const product = await screen.findByText(/Laptop/i);
    expect(product).toBeInTheDocument();

    const button = await screen.findByRole("button", { name: /Shop Now/i });
    expect(button).toBeInTheDocument();

    const link = button.closest("a");
    expect(link).toHaveAttribute("href", "/shoppingpage");
  });
});
