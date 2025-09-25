import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { ShopContext } from "@/app/context/ShopContext";
import Hero from "@/app/components/home/hero";
import Holiday_sale from "@/app/components/home/holiday_sale";
import sidebar_data from "@/app/components/sidebarData";
import Shop_all_collections from "@/app/components/home/shop_all_collections";

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

describe('Homepage Heros', () => {
 it('should navigate to /new-arrivals when shop button is clicked', async() => {
  render(<Hero />);

  const link = screen.getByRole('link');
  expect(link).toHaveAttribute('href', '/new-arrivals');
 })

 it('should navigate to /holiday-sales when shop button is clicked', async() => {
  render(<Holiday_sale />);

  const link = screen.getByRole('link');
  expect(link).toHaveAttribute('href', '/holiday-sales');
 })
})

describe('Homepage Shop All Collection', () => {
 it('should render closed by default', () => {
  render(
   <ShopContext value={mockContext}>
    <Shop_all_collections />
   </ShopContext>
  );

  const shopAllCollections = screen.getByRole('dialog', {name: /shop all collection/i})
  expect(shopAllCollections).not.toBeVisible
  expect(shopAllCollections).toHaveClass('opacity-0', '-translate-y-full', '-z-50')
 });

 it('should render open when active', () => {
  render(
   <ShopContext value={{...mockContext, isAllCollectionsOpen: true}}>
    <Shop_all_collections />
   </ShopContext>
  );

  const shopAllCollections = screen.getByRole('dialog', {name: /shop all collection/i})
  expect(shopAllCollections).toBeVisible
  expect(shopAllCollections).toHaveClass('opacity-100', 'translate-y-0', 'z-50')
 });

 it('should close collection when button is clicked', async() => {
  render(
   <ShopContext value={{...mockContext, isAllCollectionsOpen: true}}>
    <Shop_all_collections />
   </ShopContext>
  );

  const closeButton = screen.getByRole('button', { name: /close collection/i });
  const user = userEvent.setup();

  await user.click(closeButton);
  expect(mockContext.closeAllCollections).toBeCalled();
 });

 it('should close collection when outside the overlay is clicked', async() => {
  render(
   <ShopContext value={{...mockContext, isAllCollectionsOpen: true}}>
    <Shop_all_collections />
   </ShopContext>
  );

  const shopAllCollections = screen.getByRole('dialog', {name: /shop all collection/i})
  const user = userEvent.setup();

  await user.click(shopAllCollections);
  expect(mockContext.closeAllCollections).toBeCalled();
 });

 it('should render headings correctly and clicking heading should close the modal', async() => {
  render(
   <ShopContext value={{...mockContext, isAllCollectionsOpen: true}}>
    <Shop_all_collections />
   </ShopContext>
  );

  const mensHeading = screen.getByText("Men's Clothes");
  const womensHeading = screen.getByText("Women's Clothes");
  const user = userEvent.setup();

  expect(mensHeading).toBeInTheDocument();
  expect(womensHeading).toBeInTheDocument();
  await user.click(womensHeading);
  expect(mockContext.closeAllCollections).toHaveBeenCalled();
 });

 it('should render subheadings correctly and clicking subheading should close the modal', async() => {
  render(
   <ShopContext value={{...mockContext, isAllCollectionsOpen: true}}>
    <Shop_all_collections />
   </ShopContext>
  );

  mockContext.sidebarLinks.forEach(item=>{
    item.links.forEach(link=>{
      expect(screen.getByText(`${item.name}'s ${link.link_name}`)).toBeInTheDocument();
    })
  });

  const linkName = screen.getByText(/women's top/i);
  const user = userEvent.setup();

  await user.click(linkName);
  expect(mockContext.closeAllCollections).toHaveBeenCalled()
 });

 it('should render heading and subLink linking to its address respectively', () => {
  render(
   <ShopContext value={{...mockContext, isAllCollectionsOpen: true}}>
    <Shop_all_collections />
   </ShopContext>
  );

  const headingLink = screen.getByRole("link", { name: "Men's Clothes" });
  const subLink = screen.getByRole("link", { name: /women's top/i });
  expect(headingLink).toBeInTheDocument();
  expect(subLink).toBeInTheDocument();
  expect(headingLink).toHaveAttribute("href", "./mens");
  expect(subLink).toHaveAttribute("href", "./women/top");
 })
})