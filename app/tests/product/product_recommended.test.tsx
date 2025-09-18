import { describe, expect, it, vi } from "vitest";
import Product_recommended from "@/app/components/product/product_recommended";
import { products } from "@wix/stores";
// re-imported the mocks after vi.mock
import { mockFns } from "@/app/lib/wixClientServer";

// --- Mock Module ---
vi.mock("@/app/lib/wixClientServer", () => {
  const mockProducts: products.Product[] = [
    { _id: "1", slug: "s1", name: "Product 1", media: { items: [] }, priceData: { price: 10 }, collectionIds: ["c1"] },
    { _id: "2", slug: "s2", name: "Product 2", media: { items: [] }, priceData: { price: 20 }, collectionIds: ["c1"] },
    { _id: "3", slug: "s3", name: "Product 3", media: { items: [] }, priceData: { price: 30 }, collectionIds: ["c1"] },
    { _id: "4", slug: "s4", name: "Product 4", media: { items: [] }, priceData: { price: 30 }, collectionIds: ["c1"] },
  ];

  const mockFind = vi.fn().mockResolvedValue({ items: mockProducts });
  const mockEq = vi.fn(() => ({ find: mockFind }));
  const mockQueryProducts = vi.fn(() => ({ eq: mockEq }));
  const mockGetProduct = vi.fn((id) =>
    Promise.resolve({ product: mockProducts.find((p) => p._id === id) })
  );

  return {
    wixClientServer: vi.fn().mockResolvedValue({
      products: {
        queryProducts: mockQueryProducts,
        getProduct: mockGetProduct,
      },
    }),
    // also export mocks so we can assert in tests
    __esModule: true,
    mockFns: { mockQueryProducts, mockEq, mockFind, mockGetProduct },
  };
});

beforeEach(() => {
  vi.clearAllMocks();
});

// --- Tests ---
describe("Product_recommended (Server Component)", () => {
  it("should query products and render recommended items", async () => {
    const collectionIds = ["c1", "c2"];

    await Product_recommended({ collectionIds });

    // Verify calls
    expect(mockFns.mockQueryProducts).toHaveBeenCalled();
    expect(mockFns.mockEq).toHaveBeenCalledWith("collectionIds", "c1");
    expect(mockFns.mockFind).toHaveBeenCalled();
    expect(mockFns.mockGetProduct).toHaveBeenCalled();

    
  });

  it("should randomize and fetch 3 products (wixClient.products.getProduct(id))", async () => {
    const collectionIds = ["c1"];

    await Product_recommended({ collectionIds });

    // Verify getProduct was called exactly 3 times
    expect(mockFns.mockGetProduct).toHaveBeenCalledTimes(3);

    // Collect all IDs passed to getProduct
    const calledIds = mockFns.mockGetProduct.mock.calls.map(([id]) => id);

    const validIds = ["1", "2", "3", "4"];
    calledIds.forEach((id) => {
      expect(validIds).toContain(id);
    });

    // No duplicate picks
    expect(new Set(calledIds).size).toBe(calledIds.length);
  });
});
