import { render, screen } from "@testing-library/react";
import { it, expect, describe, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import Cart from "../../components/Cart";
import { ShopContext } from "../../context/ShopContext";
import { CartWithSubtotal } from "@/app/components/cart/cart_summary";

let mockCart: CartWithSubtotal = {
  lineItems: [
    {
      _id: "item123",
      productName: { original: "Test Product Name" },
      quantity: 2,
      price: { amount: "10.00" },
      catalogReference: {
        catalogItemId: "prod123",
        options: { variantId: "var123" },
      },
      image: "http://example.com/img.png",
    },
    {
      _id: "item456",
      productName: { original: "Second Test Product Name" },
      quantity: 3,
      price: { amount: "20.00" },
      catalogReference: {
        catalogItemId: "prod123",
        options: { variantId: "var123" },
      },
      image: "http://example.com/img.png",
    },
  ],
  subtotal: {
    amount: 80, // (2 * 10) + (3 * 20)
    currency: "USD",
  },
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
const mockRemoveItem = vi.fn()

vi.mock("@/app/hooks/useCartStore", () => ({
  useCartStore: () => ({
    cart: mockCart,
    getCart: vi.fn(),
    removeItem: mockRemoveItem,
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

describe('Subtotal / Total', () => {
 it('should display subtotal as cart.subtotal.amount', () => {
  render(
   <ShopContext.Provider value={mockContext}>
     <Cart />
   </ShopContext.Provider>
  );

  const itemSubTotal = screen.getByRole("paragraph", { name: /sub total/i });
  expect(itemSubTotal).toBeInTheDocument();
  expect(itemSubTotal).toHaveTextContent(`$${mockCart.subtotal?.amount}`)
 });

 it('should display Total as the same number', () => {
  render(
   <ShopContext.Provider value={mockContext}>
     <Cart />
   </ShopContext.Provider>
  );

  const itemSubTotal = screen.getByRole("paragraph", { name: /sub total/i });
  const itemTotal = screen.getByRole("paragraph", { name: 'total' });

  expect(itemTotal).toHaveTextContent(`${itemSubTotal.textContent}`)
 })
})

describe('Checkout Button', () => {
  it('should display checkout button when subtotal.amount > 0', () => {
    render(
      <ShopContext.Provider value={mockContext}>
        <Cart />
      </ShopContext.Provider>
    );

    const checkoutButton = screen.getByRole('button', { name: /checkout/i })
    expect(checkoutButton).toBeInTheDocument()
  });

  it('should not display checkout button when subtotal.amount = 0 or undefined', () => {
    mockCart = {
      subtotal: {
        amount: 0,
        currency: 'USD'
      }
    }

    render(
      <ShopContext.Provider value={mockContext}>
        <Cart />
      </ShopContext.Provider>
    );

    const checkoutButton = screen.queryByRole('button', { name: /checkout/i })
    expect(checkoutButton).not.toBeInTheDocument()
  })
})