import Product_display from "@/app/components/product/product_display";

export default async function page(
 context: { params: { slug: string } }
) {
 const { slug } = await context.params;

  return (
    <div className="mt-14 w-[90vw] m-auto flex flex-col items-center">
     <Product_display />
    </div>
  )
}