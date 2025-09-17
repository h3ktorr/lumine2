import { act, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Product_display from "@/app/components/product/product_display";
import { products } from '@wix/stores';
import userEvent from "@testing-library/user-event";

vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    const { fill, ...rest } = props; // remove fill
    return <img {...rest} alt={props.alt || "mocked image"} />;
  },
}));

const mockClient = {
  id: "mocked-client",
};

vi.mock("@/app/hooks/useWixClient", () => ({
  useWixClient: () => mockClient,
}));

const mockAddToCart = vi.fn()

vi.mock("@/app/hooks/useCartStore", () => ({
  useCartStore: () => ({
    addItem: mockAddToCart,
  }),
}));

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
describe('Image Carousel', () => {
 it('should renders all images from product.media.items.', () => {
  render(<Product_display product={mockProduct} productId={mockProduct._id!} />)

  const imageUrls = mockProduct.media?.items?.map((item) => item.image?.url);
  const images = screen.getAllByRole('img');
  expect(images).toHaveLength(3);
  imageUrls?.forEach((url, index) => {
    expect(images[index]).toHaveAttribute("src", url);
  });
 })

 it('should start with first image visible', () => {
  render(<Product_display product={mockProduct} productId={mockProduct._id!} />)

  const images = screen.getAllByRole('img');
  expect(images[0]).toHaveClass('activeSlide')
  expect(images[1]).toHaveClass('nextSlide')
  expect(images[2]).toHaveClass('lastSlide')
 });

 it('should show the next image when next is clicked', async() => {
  render(<Product_display product={mockProduct} productId={mockProduct._id!} />)

  const user = userEvent.setup();
  const images = screen.getAllByRole('img');
  const nextButton = screen.getByLabelText("next button");
  expect(nextButton).toBeInTheDocument();
  await user.click(nextButton)
  expect(images[0]).toHaveClass('lastSlide')
  expect(images[1]).toHaveClass('activeSlide')
  expect(images[2]).toHaveClass('nextSlide')
 });
 
 it('should show the previous image when prev is clicked', async() => {
  render(<Product_display product={mockProduct} productId={mockProduct._id!} />)

  const user = userEvent.setup();
  const images = screen.getAllByRole('img');
  const prevButton = screen.getByLabelText("prev button");
  expect(prevButton).toBeInTheDocument();
  await user.click(prevButton)
  expect(images[0]).toHaveClass('nextSlide')
  expect(images[1]).toHaveClass('lastSlide')
  expect(images[2]).toHaveClass('activeSlide')
 })

 it('should auto-rotate images every 5 seconds', () => {
  vi.useFakeTimers()
  render(<Product_display product={mockProduct} productId={mockProduct._id!} />)

  const images = screen.getAllByRole('img');
  expect(images[0]).toHaveClass('activeSlide')
  expect(images[1]).toHaveClass('nextSlide')
  expect(images[2]).toHaveClass('lastSlide')

  act(()=>{
    vi.advanceTimersByTime(5000)
  });

  const updatedImages = screen.getAllByRole('img');
  expect(updatedImages[0]).toHaveClass('lastSlide')
  expect(updatedImages[1]).toHaveClass('activeSlide')
  expect(updatedImages[2]).toHaveClass('nextSlide')

  vi.useRealTimers();
 })
})

describe('Product Info', () => {
  it('should renders product name and price', () => {
    render(<Product_display product={mockProduct} productId={mockProduct._id!} />)

    const productPrice = screen.getByRole('paragraph', { name: /product price/i })
    expect(screen.getByText(/test product/i)).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
    expect(productPrice).toHaveTextContent('$10')
  })
})

describe('Size Selection', () => {
  it('should render size options (from product.productOptions)', () => {
    render(<Product_display product={mockProduct} productId={mockProduct._id!} />)

     mockProduct.productOptions?.[0].choices?.forEach(choice => {
      expect(screen.getByText(choice.value!)).toBeInTheDocument()
    })
  });

  it('should apply selected style when a size is clicked', async() => {
    render(<Product_display product={mockProduct} productId={mockProduct._id!} />)

    const user = userEvent.setup();
    const xlOption = screen.getByText('XL');
    expect(xlOption).toBeInTheDocument();
    expect(xlOption).not.toHaveStyle({ backgroundColor: 'rgb(0, 0, 0)', color: 'rgb(255, 255, 255)'});
    await user.click(xlOption)
    expect(xlOption).toHaveStyle({ backgroundColor: 'rgb(0, 0, 0)', color: 'rgb(255, 255, 255)'});
  });

  it('should change button label from "Select A Size" to "Add To Cart" when size selected', async() => {
    render(<Product_display product={mockProduct} productId={mockProduct._id!} />)

    const user = userEvent.setup();
    const xlOption = screen.getByText('XL');
    const addToCartButton = screen.getByRole('button', {name: /add to cart/i})

    expect(addToCartButton).toBeInTheDocument()
    expect(addToCartButton).toHaveTextContent(/Select A Size/i)
    
    await user.click(xlOption)
    expect(addToCartButton).toHaveTextContent(/Add To Cart/i)
  });

  it('should change styles according to the selected size', async() => {
    render(<Product_display product={mockProduct} productId={mockProduct._id!} />)

    const user = userEvent.setup();
    const xlOption = screen.getByText('XL');
    const xsOption = screen.getByText('XS');
    const xxlOption = screen.getByText('XXL');

    expect(xlOption).not.toHaveStyle({ backgroundColor: 'rgb(0, 0, 0)', color: 'rgb(255, 255, 255)'});
    expect(xsOption).not.toHaveStyle({ backgroundColor: 'rgb(0, 0, 0)', color: 'rgb(255, 255, 255)'});
    expect(xxlOption).not.toHaveStyle({ backgroundColor: 'rgb(0, 0, 0)', color: 'rgb(255, 255, 255)'});
    
    await user.click(xlOption)
    expect(xlOption).toHaveStyle({ backgroundColor: 'rgb(0, 0, 0)', color: 'rgb(255, 255, 255)'});
    
    await user.click(xxlOption)
    expect(xxlOption).toHaveStyle({ backgroundColor: 'rgb(0, 0, 0)', color: 'rgb(255, 255, 255)'});
    expect(xlOption).not.toHaveStyle({ backgroundColor: 'rgb(0, 0, 0)', color: 'rgb(255, 255, 255)'});
    
    await user.click(xsOption)
    expect(xsOption).toHaveStyle({ backgroundColor: 'rgb(0, 0, 0)', color: 'rgb(255, 255, 255)'});
    expect(xxlOption).not.toHaveStyle({ backgroundColor: 'rgb(0, 0, 0)', color: 'rgb(255, 255, 255)'});
  })
})

describe('Add to Cart', () => {
  it('Button should be disabled when no size selected.', () => {
    render(<Product_display product={mockProduct} productId={mockProduct._id!} />)

    const addToCartButton = screen.getByRole('button', {name: /add to cart/i});
    expect(addToCartButton).toBeDisabled()
  });

  it('Button should call addItem(wixClient, productId, variant._id) when clicked after size selected.', async() => {
    render(<Product_display product={mockProduct} productId={mockProduct._id!} />)

    const user = userEvent.setup();
    const addToCartButton = screen.getByRole('button', {name: /add to cart/i});
    const xlOption = screen.getByText('XL');
    
    await user.click(xlOption);
    expect(addToCartButton).not.toBeDisabled();
    await user.click(addToCartButton);
    expect(mockAddToCart).toHaveBeenCalledWith(mockClient, '123', '21');
  })
})