import { wixClientServer } from '@/app/lib/wixClientServer';
import Item from '../item'
import { products } from '@wix/stores';
import { Suspense } from 'react';

const Womens_accessories = async() => {
  const categoryId = process.env.WOMENS_ACCESSORIES_CATEGORY_ID!

  const wixClient = await wixClientServer();
  const res = await wixClient.products
  .queryProducts()
  .eq('collectionIds', categoryId)
  .limit(6)
  .find();

  return (
    <div className="w-full overflow-hidden mt-14 flex flex-col">
     <h1 className="font-Irish text-xl md:text-2xl cursor-pointer">Womens Accessories</h1>
     <div className="grid w-full grid-cols-2 md:grid-cols-3 mt-4 gap-4">
     {res.items.map((product:products.Product)=>{
        const images = product.media?.items?.map(item => item.image?.url || "");

        return (
          <Suspense fallback={'loading'} key={product._id}>
            <Item
              id={Number(product._id)}
              name={product.name || ""}
              image={images!}
              price={product.priceData?.price || 0}
              slug={product.slug!}
            />
          </Suspense>
        )
      })}
     </div>
    </div>
  )
}

export default Womens_accessories