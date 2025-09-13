import { render, screen } from "@testing-library/react";
import { it, expect, describe, vi,  } from "vitest";
import userEvent from '@testing-library/user-event'
import Cart from "../../components/Cart";
import { ShopContext } from "../../context/ShopContext";
import type { cart } from "@wix/ecom";

const mockCart: cart.Cart = {
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
      image:  "http://example.com/img.png",
    },
  ] as cart.LineItem[],
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

// Type-safe mock
const mockGetScaledToFillImageUrl = vi.fn<(src: string, w: number, h: number, options: object) => string>(
  (src, w, h, options) => "http://mocked-url.com/img.png"
);

vi.mock("@wix/sdk", () => ({
  media: {
    getScaledToFillImageUrl: mockGetScaledToFillImageUrl,
  },
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

describe('Product Rendering', () => {
 it('should display product image (via wixMedia.getScaledToFillImageUrl)', () => {
  render(
      <ShopContext.Provider value={mockContext}>
        <Cart />
      </ShopContext.Provider>
    );

    // check the helper was called with original image url
    expect(mockGetScaledToFillImageUrl).toHaveBeenCalledWith(
      "http://example.com/img.png",
      96,
      96,
      {}
    );

    // check rendered <img>
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "http://mocked-url.com/img.png");
  })
})