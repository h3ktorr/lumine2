import { wixClientServer } from "@/app/lib/wixClientServer";
import Item from "../item";
import { products } from "@wix/stores";
import { Suspense } from "react";

const Product_recommended = async ({ collectionIds }: { collectionIds: string[] }) => {
  const wixClient = await wixClientServer();

  const res = await wixClient.products
    .queryProducts()
    .eq("collectionIds", collectionIds[0])
    .find();

  const allIds = res.items.map((p: products.Product) => p._id!).filter(Boolean);

  const randomIds = allIds.sort(() => 0.5 - Math.random()).slice(0, 3);

  const productResponses = await Promise.all(
    randomIds.map((id) => wixClient.products.getProduct(id))
  );

  const productsData: products.Product[] = productResponses
    .map((res) => res.product)
    .filter((p): p is products.Product => Boolean(p));

  return (
    <div className="w-full overflow-hidden mt-12 flex flex-col">
      <h1 className="font-Irish text-xl">Recommended for you</h1>
      <div className="flex gap-5 mt-4 recommended-items">
        {productsData.map((product) => {
          const images = product.media?.items?.map((item) => item.image?.url || "");
          return (
            <Suspense fallback={"loading"} key={product._id}>
              <Item
                product={product}
                id={product._id!}
                name={product.name || ""}
                image={images!}
                price={product.priceData?.price || 0}
                slug={product.slug!}
              />
            </Suspense>
          );
        })}
      </div>
    </div>
  );
};

export default Product_recommended;
