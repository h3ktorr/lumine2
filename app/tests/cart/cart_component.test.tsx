import { cleanup, render, screen } from "@testing-library/react";
import { it, expect, describe, vi, beforeEach, afterEach } from "vitest";
import userEvent from '@testing-library/user-event'
import Cart from "../../components/Cart";
import { ShopContext } from "../../context/ShopContext";

const mockGetCart = vi.fn();
const mockClient = { id: "mocked-client" };
//Mock useCartStore hook
vi.mock("@/app/hooks/useCartStore", () => ({
  useCartStore: () => ({
    cart: { lineItems: [] },
    getCart: mockGetCart,
    removeItem: vi.fn(),
    updateItemQuantity: vi.fn(),
    isLoading: false,
  }),
}));

//Mock useWixClient hook
vi.mock("@/app/hooks/useWixClient", () => ({
  useWixClient: () => (mockClient),
}));
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
    expect(cartOverlay).toHaveClass("opacity-100", "translate-x-0");
  });
});

describe('Closing Behavior', () => {
  it('should call closeCart when X button is clicked', async() => {
    render(
      <ShopContext.Provider value={mockContext}>
        <Cart />
      </ShopContext.Provider>
    );

    const closeCartButton = screen.getByRole("button", { name: /close cart/i });
    const user = userEvent.setup();
    await user.click(closeCartButton)
    expect(mockContext.closeCart).toHaveBeenCalled();
  });

  it('should call closeCart when the overlay outside the cart panel is clicked', async() => {
    render(
      <ShopContext.Provider value={mockContext}>
        <Cart />
      </ShopContext.Provider>
    );

    const cartOverlay = screen.getByRole("dialog", { name: /shopping cart/i });
    const user = userEvent.setup();
    await user.click(cartOverlay)
    expect(mockContext.closeCart).toHaveBeenCalled();
  });

  // it('should not call closeCart when the inside the cart panel is clicked', async() => {
  //   render(
  //     <ShopContext.Provider value={mockContext}>
  //       <Cart />
  //     </ShopContext.Provider>
  //   );

  //   const cartPanel = screen.getByRole("region", { name: /cart panel/i });
  //   const user = userEvent.setup();
  //   await user.click(cartPanel)
  //   expect(mockContext.closeCart).not.toHaveBeenCalled();
  // });
})

describe('Body Scroll Lock', () => {
  it('document.body.style.overflow should be "hidden" when isCartOpen = true,', () => {
    render(
      <ShopContext.Provider value={{...mockContext, isCartOpen: true}}>
        <Cart />
      </ShopContext.Provider>
    );

    expect(document.body.style.overflow).toBe("hidden");
  });

  it('document.body.style.overflow should be "auto" when isCartOpen = false,', () => {
    render(
      <ShopContext.Provider value={mockContext}>
        <Cart />
      </ShopContext.Provider>
    );

    expect(document.body.style.overflow).toBe("auto");
  });
})

describe('Store Integration', () => {
   beforeEach(() => {
    mockGetCart.mockClear();
  });

  afterEach(() => {
    cleanup();
  });

  it('should call getCart(wixClient) on mount', () => {
    render(
      <ShopContext.Provider value={mockContext}>
        <Cart />
      </ShopContext.Provider>
    );

    expect(mockGetCart).toBeCalled();
    expect(mockGetCart).toHaveBeenCalledWith(mockClient);
  });

  it("calls getCart again when wixClient changes", () => {
    const { rerender } = render(
      <ShopContext.Provider value={mockContext}>
        <Cart />
      </ShopContext.Provider>
    );

    expect(mockGetCart).toHaveBeenCalledTimes(1);

    // simulate wixClient change
      mockClient.id = "new-client";

    rerender(
      <ShopContext.Provider value={mockContext}>
        <Cart />
      </ShopContext.Provider>
    );

    expect(mockGetCart).toHaveBeenLastCalledWith({ id: "new-client" });
  });
})