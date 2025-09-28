import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { ShopContext } from "@/app/context/ShopContext";
import sidebar_data from "@/app/components/sidebarData";
import Mens_hero from "@/app/components/men/mens_hero";
import Mens_newArrival from "@/app/components/men/mens_newarrival";
import Mens_footwearHero from "@/app/components/men/mens_footwearhero";
import Shop_all_men from "@/app/components/men/shop_all_men";

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

describe('Menpage Heros', () => {
 it('should navigate to /hoodies-collection when shop button is clicked', () => {
  render(<Mens_hero />)

  const link = screen.getByRole('link');
  expect(link).toHaveAttribute('href', '/hoodies-collection');
 });

 it('should navigate to /new-arrivals when shop button is clicked', () => {
  render(< Mens_newArrival/>);

  const link = screen.getByRole('link');
  expect(link).toHaveAttribute('href', '/new-arrivals');
 });

 it('should navigate to /footwears-for-all when shop button is clicked', () => {
  render(< Mens_footwearHero/>);

  const link = screen.getByRole('link');
  expect(link).toHaveAttribute('href', '/footwears-for-all');
 });
});

describe('Shop All Men Collection', () => {
 it('should render closed by default', () => {
  render(
   <ShopContext value={mockContext}>
    <Shop_all_men />
   </ShopContext>
  );

  const shopMenCollections = screen.getByRole('dialog', {name: /shop men collection/i})
  expect(shopMenCollections).toHaveClass('opacity-0', 'invisible', '-translate-y-full', '-z-50')
 });

 it('should render open when active', () => {
  render(
   <ShopContext value={{...mockContext, isAllCollectionsOpen: true}}>
    <Shop_all_men />
   </ShopContext>
  );

  const shopMenCollections = screen.getByRole('dialog', {name: /shop men collection/i})
  expect(shopMenCollections).toBeVisible()
  expect(shopMenCollections).toHaveClass('opacity-100', 'translate-y-0', 'z-50')
 });

 it('should close collection when button is clicked', async() => {
  render(
   <ShopContext value={{...mockContext, isAllCollectionsOpen: true}}>
    <Shop_all_men />
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
    <Shop_all_men />
   </ShopContext>
  );

  const shopMenCollections = screen.getByRole('dialog', {name: /shop men collection/i})
  const user = userEvent.setup();
  
  await user.click(shopMenCollections);
  expect(mockContext.closeAllCollections).toBeCalled();
 });

 it('should render heading and subLink linking to its address', () => {
  render(
   <ShopContext value={{...mockContext, isAllCollectionsOpen: true}}>
    <Shop_all_men />
   </ShopContext>
  );

  const heading = screen.getByRole("heading", { name: "Men's Clothes" });
  const subLink = screen.getByRole("link", { name: /men's top/i });
  expect(heading).toBeInTheDocument();
  expect(subLink).toBeInTheDocument();
  expect(subLink).toHaveAttribute("href", "./men/top");
 });
})