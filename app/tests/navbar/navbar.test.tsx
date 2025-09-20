import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { ShopContext } from "@/app/context/ShopContext";
import Navbar from "@/app/components/Navbar";

//Mock useCartStore hook
vi.mock("@/app/hooks/useCartStore", () => ({
  useCartStore: () => ({
    cart: { lineItems: [] },
    getCart: vi.fn(),
    removeItem: vi.fn(),
    updateItemQuantity: vi.fn(),
    isLoading: false,
    counter: 3,
  }),
}));

// Mock next/navigation
const pushMock = vi.fn();

vi.mock("next/navigation", () => {
  return {
    useRouter: () => ({ push: pushMock }), // 👈 always returns the same mock
    usePathname: () => "/",
  };
});

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
   { _id: "9", slug: "s9", name: "Product 9",}],
  handleCategory: vi.fn(),
};

describe('Navbar Menu', () => {
 it('should render <hr> under "shop" by default and on clicking the other menu <hr> will be under the menu', async() => {
  render(
   <ShopContext value={mockContext}>
    <Navbar />
   </ShopContext>
  );

  const user = userEvent.setup();
  const shopLink = screen.getByText(/shop/i);
  const menLink = screen.getByText("Men");
  const womenLink = screen.getByText("Women");
  const navLogo = screen.getByRole('img')

  expect(shopLink.nextSibling?.nodeName).toBe("HR");
  
  await user.click(menLink)
  expect(menLink.nextSibling?.nodeName).toBe("HR");
  expect(shopLink.nextSibling?.nodeName).not.toBe("HR");
  
  await user.click(womenLink)
  expect(womenLink.nextSibling?.nodeName).toBe("HR");
  expect(menLink.nextSibling?.nodeName).not.toBe("HR");
  
  await user.click(navLogo)
  expect(shopLink.nextSibling?.nodeName).toBe("HR");
 });

 it('should open sidebar when sidebar icon is clicked', async() => {
  render(
   <ShopContext value={mockContext}>
    <Navbar />
   </ShopContext>
  );

  const user = userEvent.setup();
  const sidebarButton = screen.getByRole('button', {name: /open sidebar/i})

  await user.click(sidebarButton);
  expect(mockContext.openSidebar).toHaveBeenCalled()
 });
});

describe('Navbar Search', () => {
 it('should render search input and default value is empty string', () => {
  render(
   <ShopContext value={mockContext}>
    <Navbar />
   </ShopContext>
  );

  const searchInput = screen.getByPlaceholderText(/search product/i)
  searchInput.textContent=''
  expect(searchInput).toBeInTheDocument()
  expect(searchInput.textContent).toBe('')
 });

 it('typing "prod" should provide filtered list items containing "prod" with max 5 results', async() => {
  render(
   <ShopContext value={mockContext}>
    <Navbar />
   </ShopContext>
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

 it('should navigate router.push("/product/{slug}") to /product/{slug} when product is clicked', async() => {

  render(
   <ShopContext value={mockContext}>
    <Navbar />
   </ShopContext>
  );

  const searchInput = screen.getByPlaceholderText(/search product/i)
  const user = userEvent.setup();
  await user.type(searchInput, "prod");
  const product2 = screen.getByText('Product 2');
  await user.click(product2);

  expect(pushMock).toHaveBeenCalledWith("/product/s2");
 })
});

describe('Navbar Login/Logout Toggle', () => {
 it('If isLoggedIn = false, LogIn icon is shown, clicking calls handleLogin', async() => {
  render(
   <ShopContext value={mockContext}>
    <Navbar />
   </ShopContext>
  );

  const loginButton = screen.getByRole("button", { name: /login/i })
  const user = userEvent.setup()
  
  expect(loginButton).toBeInTheDocument();
  await user.click(loginButton);
  expect(mockContext.handleLogin).toHaveBeenCalled();
 });

 it('If isLoggedIn = true, LogOut icon is shown, clicking calls handleLogout', async() => {
  render(
   <ShopContext value={{...mockContext, isLoggedIn: true}}>
    <Navbar />
   </ShopContext>
  );

  const logoutButton = screen.getByRole("button", { name: /logout/i })
  const user = userEvent.setup()
  
  expect(logoutButton).toBeInTheDocument();
  await user.click(logoutButton);
  expect(mockContext.handleLogout).toHaveBeenCalled();
 });
});

describe('Navbar Cart and Counter', () => {
 it('should open cart when cart icon is clicked', async() => {
  render(
   <ShopContext value={mockContext}>
    <Navbar />
   </ShopContext>
  );

  const user = userEvent.setup();
  const cartIcon = screen.getByRole("button", { name: /open cart/i });

  expect(cartIcon).toBeInTheDocument();
  await user.click(cartIcon)
  expect(mockContext.openCart).toHaveBeenCalled();
 });

 it('should render the correct number for cart counter', () => {
  render(
   <ShopContext value={mockContext}>
    <Navbar />
   </ShopContext>
  );

  const cartCounter = screen.getByRole('region', {name: /cart counter/i})
  expect(cartCounter).toBeInTheDocument();
  expect(cartCounter).toHaveTextContent('3')
 })
})