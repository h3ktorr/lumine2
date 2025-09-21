import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { ShopContext } from "@/app/context/ShopContext";
import Item from "@/app/components/item";
import { products } from "@wix/stores";

const mockAddToCart = vi.fn();

//Mock useCartStore hook
vi.mock("@/app/hooks/useCartStore", () => ({
  useCartStore: () => ({
    cart: { lineItems: [] },
    getCart: vi.fn(),
    addItem: mockAddToCart,
    removeItem: vi.fn(),
    updateItemQuantity: vi.fn(),
    isLoading: false,
    counter: 3,
  }),
}));

vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    const { fill, ...rest } = props; // remove fill
    return <img {...rest} alt={props.alt || "mocked image"} />;
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

const mockProduct:products.Product = {
  _id: "123",
  slug: "test-slug",
  name: "Test Product",
  media: { items: [
   { 
   _id: "1",
   image: { url: "image1", width: 720, height: 720 },
   mediaType: "image",
   },
   { 
   _id: "2",
   image: { url: "image2", width: 720, height: 720 },
   mediaType: "image",
   },
   { 
   _id: "3",
   image: { url: "image3", width: 720, height: 720 },
   mediaType: "image",
   },
  ] 
  },
  priceData: { price: 10 },
  collectionIds: ["c1"],
  productOptions: []
}

describe('Item Image', () => {
 it('should render default image', () => { 
  const images = mockProduct.media?.items?.map(item => item.image?.url || "");
  render(
   <ShopContext value={mockContext}>
    <Item  id={mockProduct._id!} name={mockProduct.name!} product={mockProduct} price={mockProduct.priceData?.price!} slug={mockProduct.slug!} image={images!}/>
   </ShopContext>
  );

  expect(screen.getByRole('img')).toBeInTheDocument();
  expect(screen.getByRole('img')).toHaveAttribute('src', 'image1')
 });

 it('should render the second image when next button is clicked', async() => {
  const images = mockProduct.media?.items?.map(item => item.image?.url || "");
  render(
   <ShopContext value={mockContext}>
    <Item  id={mockProduct._id!} name={mockProduct.name!} product={mockProduct} price={mockProduct.priceData?.price!} slug={mockProduct.slug!} image={images!}/>
   </ShopContext>
  );

  const nextButton = screen.getByRole('button', {name: /next image/i});
  const user = userEvent.setup();

  await user.click(nextButton)
  expect(screen.getByRole('img')).toHaveAttribute('src', 'image2')
 });

 it('should render the second image when prev button is clicked', async() => {
  const images = mockProduct.media?.items?.map(item => item.image?.url || "");
  render(
   <ShopContext value={mockContext}>
    <Item  id={mockProduct._id!} name={mockProduct.name!} product={mockProduct} price={mockProduct.priceData?.price!} slug={mockProduct.slug!} image={images!}/>
   </ShopContext>
  );

  const prevButton = screen.getByRole('button', {name: /prev image/i});
  const user = userEvent.setup();

  await user.click(prevButton)
  expect(screen.getByRole('img')).toHaveAttribute('src', 'image3')
 });
})

describe('Item Size Selection', () => {
 it('should', () => {
  
 })
})