import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { ShopContext } from "@/app/context/ShopContext";
import Sidebar_search from "@/app/components/sidebar/sidebar_search";

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
  allProducts: [
   { _id: "1", slug: "s1", name: "Test 1",},
   { _id: "2", slug: "s2", name: "Product 2",},
   { _id: "3", slug: "s3", name: "Test 3",},
   { _id: "4", slug: "s4", name: "Product 4",},
   { _id: "5", slug: "s5", name: "Product 5",},
   { _id: "6", slug: "s6", name: "Product 6",},
   { _id: "7", slug: "s7", name: "Product 7",},
   { _id: "8", slug: "s8", name: "Product 8",},
   { _id: "9", slug: "s9", name: "Product 9",}
  ],
  handleCategory: vi.fn(),
};

describe('Sidebar_search', () => {
 it('should render search input and default value is empty string', () => {
  render(
    <ShopContext.Provider value={mockContext}>
      <Sidebar_search />
    </ShopContext.Provider>
  );

  const searchInput = screen.getByPlaceholderText(/search product/i)
  searchInput.textContent=''
  expect(searchInput).toBeInTheDocument()
  expect(searchInput.textContent).toBe('')
 });

 it('typing "prod" should provide filtered list items containing "prod" with max 5 results', async() => {
  render(
    <ShopContext.Provider value={mockContext}>
      <Sidebar_search />
    </ShopContext.Provider>
  );

  const searchInput = screen.getByPlaceholderText(/search product/i)
  const user = userEvent.setup()
  await user.type(searchInput, "prod");

  const results = screen.getAllByText(/prod/i);
  expect(results).toHaveLength(5);
  expect(screen.getByText('Product 2')).toBeInTheDocument()
  expect(screen.getByText('Product 7')).toBeInTheDocument()
  expect(screen.queryByText('Text 1')).not.toBeInTheDocument()
  expect(screen.queryByText('Text 3')).not.toBeInTheDocument()
 });

 it('should navigate window.location.href to /product/{slug} when product is clicked', async() => {
  // Mock window.location.href
  delete (window as any).location;
  (window as any).location = { href: '' };

  render(
    <ShopContext.Provider value={mockContext}>
      <Sidebar_search />
    </ShopContext.Provider>
  );

  const searchInput = screen.getByPlaceholderText(/search product/i)
  const user = userEvent.setup()
  await user.type(searchInput, "prod");
  const product2 = screen.getByText('Product 2')
  await user.click(product2)

  expect(window.location.href).toBe("/product/s2");
 })
})