import { render, screen, waitFor } from "@testing-library/react";
import { it, expect, describe, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import Cart from "../../components/Cart";
import { ShopContext } from "../../context/ShopContext";
import type { cart } from "@wix/ecom";

const mockCart: cart.Cart = {
  lineItems: [
    {
      _id: "item123",
      productName: { original: "Test Product Name Long" },
      quantity: 2,
      price: { amount: "10.00" },
      catalogReference: {
        catalogItemId: "prod123",
        options: { variantId: "var123" },
      },
      image: "http://example.com/img.png",
    },
  ],
};

let mockGetProduct = vi.fn();

const mockClient = {
  id: "mocked-client",
  products: {
    getProduct: mockGetProduct,
  },
};

vi.mock("@/app/hooks/useWixClient", () => ({
  useWixClient: () => mockClient,
}));

const mockUpdateQuantity = vi.fn();

vi.mock("@/app/hooks/useCartStore", () => ({
  useCartStore: () => ({
    cart: mockCart,
    getCart: vi.fn(),
    removeItem: vi.fn(),
    updateItemQuantity: mockUpdateQuantity,
    isLoading: false,
  }),
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

beforeEach(() => {
  mockGetProduct.mockReset();
  mockUpdateQuantity.mockReset();
  // suppress console.error in tests
  vi.spyOn(console, "error").mockImplementation(() => {});
});

describe("Product Rendering", () => {
  it("should display product name (shortened version on small screen, full name on larger)", () => {
    render(
      <ShopContext.Provider value={mockContext}>
        <Cart />
      </ShopContext.Provider>
    );

    expect(screen.getByText(/test product name long/i)).toHaveClass("sm:block");
    expect(screen.getByText("Test Product Name")).toHaveClass("sm:hidden");
  });

  it("should show variant size once it’s fetched", async () => {
    mockGetProduct.mockResolvedValueOnce({
      product: {
        variants: [{ _id: "var123", choices: { Size: "XL" } }],
      },
    });

    render(
      <ShopContext.Provider value={mockContext}>
        <Cart />
      </ShopContext.Provider>
    );

    // Loading state
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    // Wait for variant size
    await waitFor(() => expect(screen.getByText("XL")).toBeInTheDocument());
  });

  it('should show "Loading..." while variant size is being fetched', () => {
    mockGetProduct.mockImplementation(() => new Promise(() => {}));

    render(
      <ShopContext.Provider value={mockContext}>
        <Cart />
      </ShopContext.Provider>
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    expect(screen.queryByText("XL")).not.toBeInTheDocument();
  });
});

describe("Quantity Controls", () => {
  it("clicking + should call updateItemQuantity with correct args", async () => {
    render(
      <ShopContext.Provider value={mockContext}>
        <Cart />
      </ShopContext.Provider>
    );

    const increaseButton = screen.getByRole("button", { name: /increase quantity/i });
    const user = userEvent.setup();
    const quantity = screen.getByRole("status", { name: /quantity/i })
    expect(quantity).toHaveTextContent("2");

    await user.click(increaseButton);

    expect(mockUpdateQuantity).toHaveBeenCalledWith(mockClient, "item123", 3);
  });

  it("clicking - should call updateItemQuantity with correct args", async () => {
    render(
      <ShopContext.Provider value={mockContext}>
        <Cart />
      </ShopContext.Provider>
    );

    const decreaseButton = screen.getByRole("button", { name: /decrease quantity/i });
    const user = userEvent.setup();
    const quantity = screen.getByRole("status", { name: /quantity/i })
    expect(quantity).toHaveTextContent("2");

    await user.click(decreaseButton);

    expect(mockUpdateQuantity).toHaveBeenCalledWith(mockClient, "item123", 1);
  });
});
