import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Product_recommended from "@/app/components/product/product_recommended";
import { wixClientServer } from "@/app/lib/wixClientServer";
import { products } from "@wix/stores";

vi.mock("@/app/lib/wixClientServer");

const mockProducts = [
 { 
  _id: "12",
  slug: "test-slug1",
  name: "Test Product1",
  media: { items: [] },
  priceData: { price: 10 },
  collectionIds: ["c1"],
 },
 { 
  _id: "23",
  slug: "test-slug2",
  name: "Test Product2",
  media: { items: [] },
  priceData: { price: 10 },
  collectionIds: ["c1"],
 },
 { 
  _id: "34",
  slug: "test-slug3",
  name: "Test Product3",
  media: { items: [] },
  priceData: { price: 10 },
  collectionIds: ["c1"],
 },
 { 
  _id: "45",
  slug: "test-slug4",
  name: "Test Product4",
  media: { items: [] },
  priceData: { price: 10 },
  collectionIds: ["c1"],
 },
 { 
  _id: "56",
  slug: "test-slug5",
  name: "Test Product5",
  media: { items: [] },
  priceData: { price: 10 },
  collectionIds: ["c1"],
 },
]

// (wixClientServer as vi.Mock).mockResolvedValue({
//         products: {
//           queryProducts: () => ({
//             eq: () => ({
//               find: vi.fn().mockResolvedValue({ items: mockProducts }),
//             }),
//           }),
//         },
//       });

describe('Product Fetching', () => {
 it('should call wixClient.products.queryProducts().eq("collectionIds", collectionIds[0]).find()', () => {
  render(<Product_recommended collectionIds={['c1', 'c2', 'c3']} />)

  
 })
})