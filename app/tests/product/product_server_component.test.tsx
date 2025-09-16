import { render, screen } from "@testing-library/react";
import page from "@/app/product/[slug]/page"; // adjust path if needed
import { wixClientServer } from "@/app/lib/wixClientServer";
import { notFound } from "next/navigation";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/app/lib/wixClientServer");
vi.mock("next/navigation", () => ({
  notFound: vi.fn(),
}));

vi.mock("@/app/components/product/product_display", () => ({
  default: ({ product }: { product: any }) => (
    <div>{product.name}</div>
  ),
}));

vi.mock("@/app/components/product/product_recommended", () => ({
  default: () => <div>Recommended</div>,
}));

vi.mock("@/app/components/home/newsletter", () => ({
  default: () => <div>Newsletter</div>,
}));

// mock data
    const mockProduct = {
      _id: "123",
      slug: "test-slug",
      name: "Test Product",
      media: { items: [] },
      priceData: { price: 10 },
      collectionIds: ["c1"],
    };

    (wixClientServer as vi.Mock).mockResolvedValue({
      products: {
        queryProducts: () => ({
          eq: () => ({
            find: vi.fn().mockResolvedValue({ items: [mockProduct] }),
          }),
        }),
      },
    });


describe("Slug fetching", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render Product_display when product is found", async () => {
    const Page = await page({ params: Promise.resolve({ slug: "test-slug" }) });

    render(Page);

    expect(screen.queryByText(mockProduct.name)).toBeInTheDocument();
    });

  it("should call notFound when no product is returned", async () => {
    (wixClientServer as vi.Mock).mockResolvedValue({
      products: {
        queryProducts: () => ({
          eq: () => ({
            find: vi.fn().mockResolvedValue({ items: [] }),
          }),
        }),
      },
    });

    await page({ params: Promise.resolve({ slug: "missing-slug" }) });

    expect(notFound).toHaveBeenCalled();
  });
});