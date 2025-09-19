import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { ShopContext } from "@/app/context/ShopContext";
import Sidebar_links from "@/app/components/sidebar/sidebar_links";
import sidebar_data from "@/app/components/sidebarData";

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
  sidebarLinks: sidebar_data,
  allProducts: [],
  handleCategory: vi.fn(),
};

describe('Sidebar Links', () => {
 it('should render all top-level categories', () => {
  render(
   <ShopContext.Provider value={mockContext}>
    <Sidebar_links />
   </ShopContext.Provider>
  );

  expect(screen.getByText(/all categories/i)).toBeInTheDocument();
  expect(screen.getByText('Men')).toBeInTheDocument();
  expect(screen.getByText('Women')).toBeInTheDocument();
 });

 it('should not render sublinks if categoryState = false and clicking Plus should call handleCategory', async() => {
  render(
   <ShopContext.Provider value={mockContext}>
    <Sidebar_links />
   </ShopContext.Provider>
  );

  const plusButton = screen.getAllByRole('button', {name: /toggle sublinks on/i});
  const user = userEvent.setup();
  const sublinksDiv = screen.queryByRole('region', {name: /sidebar sublinks/i})

  expect(sublinksDiv).not.toBeInTheDocument();
  plusButton.forEach(button=>{
   expect(button).toBeInTheDocument();
  })
  await user.click(plusButton[0]);
  expect(mockContext.handleCategory).toHaveBeenCalled();
 });

 it('should render sublinks if categoryState = true and clicking Minus should call handleCategory', async() => {
  const updatedMockContext = {
      ...mockContext,
      sidebarLinks: [
        { ...mockContext.sidebarLinks[0], categoryState: true }, 
      ],
    };
  render(
   <ShopContext.Provider value={updatedMockContext}>
    <Sidebar_links />
   </ShopContext.Provider>
  );

  const minusButton = screen.getByRole('button', {name: /toggle sublinks off/i});
  const user = userEvent.setup();
  const sublinksDiv = screen.queryByRole('region', {name: /sidebar sublinks/i})

  expect(sublinksDiv).toBeInTheDocument();
  await user.click(minusButton);
  expect(mockContext.handleCategory).toHaveBeenCalled();
 });

 it('should call closeSidebar if a link is clicked', async() => {
  const updatedMockContext = {
      ...mockContext,
      sidebarLinks: [
        { ...mockContext.sidebarLinks[0], categoryState: true }, 
      ],
    };
  render(
   <ShopContext.Provider value={updatedMockContext}>
    <Sidebar_links />
   </ShopContext.Provider>
  );

  const user = userEvent.setup();
  const sublinksDiv = screen.getByRole('region', {name: /sidebar sublinks/i});
  const topsLink = within(sublinksDiv).getByText('Tops');

  await user.click(topsLink);
  expect(updatedMockContext.closeSidebar).toHaveBeenCalled();
 })
})