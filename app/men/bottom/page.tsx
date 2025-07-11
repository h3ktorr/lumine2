import { wixClientServer } from '@/app/lib/wixClientServer';
import Item from "@/app/components/item"
import { products } from '@wix/stores';
import { Suspense } from 'react';

const page = async() => {
  const categoryId = process.env.MENS_BOTTOM_CATEGORY_ID!

  const wixClient = await wixClientServer();
  const res = await wixClient.products
  .queryProducts()
  .eq('collectionIds', categoryId)
  .find();

  return (
    <div className="mt-14 w-[90vw] m-auto flex flex-col items-center">
     <div className="w-full h-[calc(100vh-56px)] men_bottom_bg bg-no-repeat bg-cover bg-center flex justify-center relative">
      <h2 className="font-Jacques absolute text-[1.7rem] sm:text-4xl lg:text-5xl text-white top-[50%]">Bottom for you</h2>
     </div>
     <div className="w-full overflow-hidden mt-14 flex flex-col">
      <h1 className="font-Irish text-xl md:text-2xl cursor-pointer">Mens Bottom</h1>
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
    </div>
  )
}

export default page