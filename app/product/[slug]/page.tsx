import Newsletter from "@/app/components/home/newsletter";
import Product_display from "@/app/components/product/product_display";
import Product_recommended from "@/app/components/product/product_recommended";
import { wixClientServer } from "@/app/lib/wixClientServer";
import { notFound } from "next/navigation";

export default async function page(
 context: { params: { slug: string } }
) {
 const { slug } = await context.params;
 const wixClient = await wixClientServer();
 const products = await wixClient.products
 .queryProducts()
 .eq('slug', slug)
 .find();

 if(!products.items[0]){
  return notFound()
 }

 const product = products.items[0];
 const productId = product._id
 

  return (
    <div className="mt-14 w-[90vw] m-auto flex flex-col items-center">
     <Product_display product={product} productId={productId!}/>
     <Product_recommended collectionIds={product.collectionIds!}/>
     <Newsletter />
    </div>
  )
}