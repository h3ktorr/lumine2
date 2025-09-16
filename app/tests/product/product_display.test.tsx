import { render, screen } from "@testing-library/react";
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
};

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
})