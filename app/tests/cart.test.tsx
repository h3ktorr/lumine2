import { render, screen } from "@testing-library/react";
import { it, expect, describe, vi } from "vitest";
import Cart from "../components/Cart";
import { ShopContext } from "../context/ShopContext";

const mockContext = {
  isCartOpen: false,
  closeCart: vi.fn(),
  isSidebarOpen: false,
  isAllCollectionsOpen: false,
  isLoggedIn: false,
  openCart: vi.fn(),
  openSidebar: vi.fn(),
  closeSidebar: vi.fn(),
  openAllCollections: vi.fn(),
  handleLogin: vi.fn(),
  handleLogout: vi.fn(),
  closeAllCollections: vi.fn(),
  sidebarLinks: [],
  allProducts: [],
  handleCategory: vi.fn(),
};

describe("Rendering & Visibility", () => {
  it("should renders hidden by default when isCartOpen = false", () => {

    render(
      <ShopContext.Provider value={mockContext}>
        <Cart />
      </ShopContext.Provider>
    );

    const cartOverlay = screen.getByRole("dialog", { name: /shopping cart/i });
    expect(cartOverlay).toBeInTheDocument();
    expect(cartOverlay).toHaveClass("opacity-0", "translate-x-full")
  });

  it("should visible overlay + panel when isCartOpen = true", () => {
    render(
      <ShopContext.Provider value={{...mockContext, isCartOpen: true}}>
        <Cart />
      </ShopContext.Provider>
    );

    const cartOverlay = screen.getByRole("dialog", { name: /shopping cart/i });
    expect(cartOverlay).toBeInTheDocument();
    expect(cartOverlay).toHaveClass("opacity-100", "translate-x-0")
  });
});
