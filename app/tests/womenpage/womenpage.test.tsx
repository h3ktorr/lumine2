import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { ShopContext } from "@/app/context/ShopContext";
import sidebar_data from "@/app/components/sidebarData";
import Womens_hero from "@/app/components/women/womens_hero";
import Womens_newArrival from "@/app/components/women/womens_newarrival";
import Womens_footwearHero from "@/app/components/women/womens_footwearhero";
import Shop_all_women from "@/app/components/women/shop_all_women";

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

describe('Womenpage Heros', () => {
 it('should navigate to /women/dress when shop button is clicked', () => {
  render(<Womens_hero />)

  const link = screen.getByRole('link');
  expect(link).toHaveAttribute('href', '/women/dress');
 });

 it('should navigate to /new-arrivals when shop button is clicked', () => {
  render(<Womens_newArrival />);

  const link = screen.getByRole('link');
  expect(link).toHaveAttribute('href', '/new-arrivals');
 });

 it('should navigate to /footwears-for-all when shop button is clicked', () => {
  render(<Womens_footwearHero />);

  const link = screen.getByRole('link');
  expect(link).toHaveAttribute('href', '/footwears-for-all');
 });
})

describe('Shop All Women Collection', () => {
 it('should render closed by default', () => {
  render(
   <ShopContext value={mockContext}>
    <Shop_all_women />
   </ShopContext>
  );
  
  const shopWomenCollections = screen.getByRole('dialog', {name: /shop women collection/i});
  expect(shopWomenCollections).toHaveClass('opacity-0', 'invisible', '-translate-y-full', '-z-50')
 });

 it('should render open when active', () => {
  render(
   <ShopContext value={{...mockContext, isAllCollectionsOpen: true}}>
    <Shop_all_women />
   </ShopContext>
  );

  const shopWomenCollections = screen.getByRole('dialog', {name: /shop women collection/i})
  expect(shopWomenCollections).toBeVisible()
  expect(shopWomenCollections).toHaveClass('opacity-100', 'translate-y-0', 'z-50')
 });

 it('should close collection when button is clicked', async() => {
  render(
   <ShopContext value={{...mockContext, isAllCollectionsOpen: true}}>
    <Shop_all_women />
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
    <Shop_all_women />
   </ShopContext>
  );

  const shopWomenCollections = screen.getByRole('dialog', {name: /shop women collection/i})
  const user = userEvent.setup();
  
  await user.click(shopWomenCollections);
  expect(mockContext.closeAllCollections).toBeCalled();
 });

 it('should render heading and subLink linking to its address', () => {
  render(
   <ShopContext value={{...mockContext, isAllCollectionsOpen: true}}>
    <Shop_all_women />
   </ShopContext>
  );

  const heading = screen.getByRole("heading", { name: "Women's Clothes" });
  const subLink = screen.getByRole("link", { name: /women's top/i });
  expect(heading).toBeInTheDocument();
  expect(subLink).toBeInTheDocument();
  expect(subLink).toHaveAttribute("href", "./women/top");
 })
})