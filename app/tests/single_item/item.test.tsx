import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { ShopContext } from "@/app/context/ShopContext";
import Item from "@/app/components/item";
import { products } from "@wix/stores";

const mockClient = {
  id: "mocked-client",
};

vi.mock("@/app/hooks/useWixClient", () => ({
  useWixClient: () => mockClient,
}));

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
  productOptions: [
    {choices: [
      { value: "XXL", description: "XXL", inStock: true},
      { value: "XL", description: "XL", inStock: true},
      { value: "L", description: "L", inStock: true},
      { value: "M", description: "M", inStock: true},
      { value: "S", description: "S", inStock: true },
      { value: "XS", description: "XS", inStock: true},
      { value: "XXS", description: "XXS", inStock: true}
    ],
    name: "Size",
    optionType: "drop_down"
  }],
  variants: [
    { 
      _id: "20",
      choices: { Size: "XXL" },
      stock: { trackQuantity: true, quantity: 31, inStock: true },
      variant: {}
    },
    { 
      _id: "21",
      choices: { Size: "XL" },
      stock: { trackQuantity: true, quantity: 31, inStock: true },
      variant: {}
    },
    { 
      _id: "22",
      choices: { Size: "L" },
      stock: { trackQuantity: true, quantity: 31, inStock: true },
      variant: {}
    },
    { 
      _id: "23",
      choices: { Size: "M" },
      stock: { trackQuantity: true, quantity: 31, inStock: true },
      variant: {}
    },
    { 
      _id: "24",
      choices: { Size: "S" },
      stock: { trackQuantity: true, quantity: 31, inStock: true },
      variant: {}
    },
    { 
      _id: "25",
      choices: { Size: "XS" },
      stock: { trackQuantity: true, quantity: 31, inStock: true },
      variant: {}
    },
    { 
      _id: "26",
      choices: { Size: "XXS" },
      stock: { trackQuantity: true, quantity: 31, inStock: true },
      variant: {}
    },
  ]
}

const images = mockProduct.media?.items?.map(item => item.image?.url || "");

describe('Item Image', () => {
 it('should render default image', () => { 
  render(
   <ShopContext value={mockContext}>
    <Item  id={mockProduct._id!} name={mockProduct.name!} product={mockProduct} price={mockProduct.priceData?.price!} slug={mockProduct.slug!} image={images!}/>
   </ShopContext>
  );

  expect(screen.getByRole('img')).toBeInTheDocument();
  expect(screen.getByRole('img')).toHaveAttribute('src', 'image1')
 });

 it('should render the second image when next button is clicked', async() => {
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

 it('should navigate to /product/{slug} when image link is clicked', async() => {
  render(
   <ShopContext value={mockContext}>
    <Item  id={mockProduct._id!} name={mockProduct.name!} product={mockProduct} price={mockProduct.priceData?.price!} slug={mockProduct.slug!} image={images!}/>
   </ShopContext>
  );

  const image = screen.getByRole('img');
  const user = userEvent.setup();
  const link = screen.getByRole('link');

  await user.click(image);
  expect(link).toHaveAttribute('href', '/product/test-slug');
 })
})

describe('Item Size Selection', () => {
 it('should render all size options (from product.productOptions)', () => {
  render(
   <ShopContext value={mockContext}>
    <Item  id={mockProduct._id!} name={mockProduct.name!} product={mockProduct} price={mockProduct.priceData?.price!} slug={mockProduct.slug!} image={images!}/>
   </ShopContext>
  );

  mockProduct.productOptions?.[0].choices?.forEach(choice => {
    expect(screen.getByText(choice.value!)).toBeInTheDocument()
  })
 })

 it('should apply black background + white text on size when clicked', async() => {
  render(
   <ShopContext value={mockContext}>
    <Item  id={mockProduct._id!} name={mockProduct.name!} product={mockProduct} price={mockProduct.priceData?.price!} slug={mockProduct.slug!} image={images!}/>
   </ShopContext>
  );

  const user = userEvent.setup();
  const xlOption = screen.getByText('XL');
  expect(xlOption).toBeInTheDocument();
  expect(xlOption).not.toHaveStyle({ backgroundColor: 'rgb(0, 0, 0)', color: 'rgb(255, 255, 255)'});
  await user.click(xlOption)
  expect(xlOption).toHaveStyle({ backgroundColor: 'rgb(0, 0, 0)', color: 'rgb(255, 255, 255)'});
 })

 it('should call addItem & openCart when size is clicked', async() => {
  render(
   <ShopContext value={mockContext}>
    <Item  id={mockProduct._id!} name={mockProduct.name!} product={mockProduct} price={mockProduct.priceData?.price!} slug={mockProduct.slug!} image={images!}/>
   </ShopContext>
  );

  const user = userEvent.setup();
  const xlOption = screen.getByText('XL');
  await user.click(xlOption);
  expect(mockAddToCart).toHaveBeenCalledWith(mockClient, '123', '21');
  expect(mockContext.openCart).toHaveBeenCalled()
 })
})

describe('Item Name and Price', () => {
  it('should render item name and price', () => {
    render(
      <ShopContext value={mockContext}>
        <Item  id={mockProduct._id!} name={mockProduct.name!} product={mockProduct} price={mockProduct.priceData?.price!} slug={mockProduct.slug!} image={images!}/>
      </ShopContext>
    );

    const productPrice = screen.getByRole('paragraph', { name: /product price/i })
    expect(screen.getByText(/test product/i)).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
    expect(productPrice).toHaveTextContent('$10')
  })
})