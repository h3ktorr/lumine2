import { render, screen } from "@testing-library/react";
import { it, expect, describe, vi,  } from "vitest";
import Cart from "../../components/Cart";
import { ShopContext } from "../../context/ShopContext";
import type { cart } from "@wix/ecom";

const mockCart: cart.Cart = {
  lineItems: [] as cart.LineItem[],
};
vi.mock("@/app/hooks/useCartStore", () => ({
  useCartStore: () => ({
    cart: mockCart,
    getCart: vi.fn(),
    removeItem: vi.fn(),
    updateItemQuantity: vi.fn(),
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

describe('Cart State', () => {
 it('should render "Cart is empty" when cart.lineItems is undefined or empty', () => {
  render(
      <ShopContext.Provider value={mockContext}>
        <Cart />
      </ShopContext.Provider>
    );

    expect(screen.getByText(/cart is empty/i)).toBeInTheDocument();
 })

 it('should render items when cart.lineItems is not empty', () => {
  mockCart.lineItems = [
    {
      _id: "item123",
      productName: { original: "Test Product Name" },
      quantity: 2,
      price: { amount: "10.00" },
      catalogReference: {
        catalogItemId: "prod123",
        options: { variantId: "var123" },
      },
      image:  "http://example.com/img.png",
    },
  ];
  render(
      <ShopContext.Provider value={mockContext}>
        <Cart />
      </ShopContext.Provider>
    );

    const nameElements = screen.getAllByText(/Test Product Name/i);
    expect(nameElements.length).toBeGreaterThan(0);
    nameElements.forEach(name => {
      expect(name).toBeInTheDocument();
    });
   })
})