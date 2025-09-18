import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import Sidebar from "@/app/components/Sidebar";
import { ShopContext } from "@/app/context/ShopContext";

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

describe('Sidebar', () => {
 it('should renders closed by default and has -translate-x-full class when isSidebarOpen = false', () => {
  render(
      <ShopContext.Provider value={mockContext}>
        <Sidebar />
      </ShopContext.Provider>
    );
  
  const sidebar = screen.getByRole("dialog", { name: /sidebar/i });
  expect(sidebar).toBeInTheDocument();
  expect(sidebar).toHaveClass('-translate-x-full');
 });

 it('should have class of translate-x-0 when isSidebarOpen = true', () => {
  render(
      <ShopContext.Provider value={{...mockContext, isSidebarOpen: true}}>
        <Sidebar />
      </ShopContext.Provider>
    );

  const sidebar = screen.getByRole("dialog", { name: /sidebar/i });
  expect(sidebar).toHaveClass('translate-x-0');
 });
})

describe('Closing Behavior', () => {
 it('should call closeSidebar when X button is clicked', async() => {
  render(
    <ShopContext.Provider value={{...mockContext, isSidebarOpen: true}}>
      <Sidebar />
    </ShopContext.Provider>
  );

  const closeSidebarButton = screen.getByRole("button", { name: /close sidebar/i });
  const user = userEvent.setup();
  await user.click(closeSidebarButton)
  expect(mockContext.closeSidebar).toHaveBeenCalled();
 });

 it('should call closeSidebar when the overlay outside the sidebar panel is clicked', async() => {
  render(
    <ShopContext.Provider value={{...mockContext, isSidebarOpen: true}}>
      <Sidebar />
    </ShopContext.Provider>
  );

  const sidebarOverlay = screen.getByRole("dialog", { name: /sidebar/i });
  const user = userEvent.setup();
  await user.click(sidebarOverlay)
  expect(mockContext.closeSidebar).toHaveBeenCalled();
 })
})

describe('Body Scroll Lock', () => {
 it('document.body.style.overflow should be "hidden" when isSidebarOpen = true', () => {
  render(
    <ShopContext.Provider value={{...mockContext, isSidebarOpen: true}}>
      <Sidebar />
    </ShopContext.Provider>
  );

  expect(document.body.style.overflow).toBe("hidden");
 })

 it('document.body.style.overflow should be "auto" when isSidebarOpen = false', () => {
  render(
    <ShopContext.Provider value={mockContext}>
      <Sidebar />
    </ShopContext.Provider>
  );
  
  expect(document.body.style.overflow).toBe("auto");
 })
})

describe('Login/logout toggle', () => {
 it('If isLoggedIn = false, LogIn icon is shown, clicking calls handleLogin', async() => {
  render(
    <ShopContext.Provider value={mockContext}>
      <Sidebar />
    </ShopContext.Provider>
  );

  const loginButton = screen.getByRole("button", { name: /login/i })
  const user = userEvent.setup()

  expect(loginButton).toBeInTheDocument();
  await user.click(loginButton);
  expect(mockContext.handleLogin).toHaveBeenCalled();
 });

 it('If isLoggedIn = true, LogOut icon is shown, clicking calls handleLogout', async() => {
  render(
    <ShopContext.Provider value={{...mockContext, isLoggedIn: true}}>
      <Sidebar />
    </ShopContext.Provider>
  );

  const logoutButton = screen.getByRole("button", { name: /logout/i })
  const user = userEvent.setup()

  expect(logoutButton).toBeInTheDocument();
  await user.click(logoutButton);
  expect(mockContext.handleLogout).toHaveBeenCalled();
 });
})