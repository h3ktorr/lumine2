import Newsletter from "@/app/components/home/newsletter";
import Product_display from "@/app/components/product/product_display";
import Product_recommended from "@/app/components/product/product_recommended";

export default async function page(
 context: { params: { slug: string } }
) {
 const { slug } = await context.params;

  return (
    <div className="mt-14 w-[90vw] m-auto flex flex-col items-center">
     <Product_display />
     <Product_recommended />
     <Newsletter />
    </div>
  )
}