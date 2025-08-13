import Image, { StaticImageData } from "next/image"
import { Plus, Minus, Trash2 } from "@deemlol/next-icons";
import { currentCart } from "@wix/ecom";
import {media as wixMedia} from "@wix/sdk"
import { useCartStore } from "@/app/hooks/useCartStore";
import { useWixClient } from "@/app/hooks/useWixClient";


const Cart_items = () => {
  const wixClient = useWixClient()
  const { cart, removeItem, isLoading } = useCartStore();

  return (
    <div className="mt-8">
     {!cart.lineItems ? <div>
      Cart is empty
     </div> 
     :
     cart.lineItems.map(item=>(
      <div className="flex border-b-2 border-black" key={item._id}>
      <div className="">
       {item.image && (<Image 
        src={wixMedia.getScaledToFillImageUrl(item.image,96,96,{})} 
        alt="" 
        width={96}
        height={96}
        style={{ objectFit: 'cover' }}
       />)}
      </div>
      <div className="ml-4 flex flex-col py-2 px-0 font-Jomolhari text-[.8rem] sm:text-base mr-2">
       <p className="text-[.9rem] sm:text-base">{item.productName?.original}</p>
       <p className="">L</p>
       <div className="flex mt-auto items-center">
        <Minus size={15} color="#000" className="mr-1.5" />
        <p className="mr-1.5">{item.quantity}</p>
        <Plus size={15} color="#000" className="mr-1.5"/>
       </div>
      </div>
      <div className="ml-auto flex flex-col justify-between py-2 px-0 font-Jomolhari text-[.8rem] sm:text-base">
       <p className="">${item.price?.amount}</p>
       <Trash2 size={20} color="#000" style={{cursor: isLoading ? "not-allowed" : "pointer"}} onClick={()=>removeItem(wixClient, item._id!)} />
      </div>
      </div>
     ))
     }
    </div>
  )
}

export default Cart_items