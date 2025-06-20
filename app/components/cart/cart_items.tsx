import Image, { StaticImageData } from "next/image"
import { Plus, Minus, Trash2 } from "@deemlol/next-icons";
import test_img from '../test_item.jpg'

const Cart_items = () => {
  return (
    <div className="mt-8">
     <div className="flex border-b-2 border-black">
      <div className="">
       <Image 
        src={test_img} 
        alt="" 
        width={80}
        height={80}
       />
      </div>
      <div className="ml-4 flex flex-col py-2 px-0 font-Jomolhari text-base">
       <p className="">Wyona Full Zip Varsity Sweater</p>
       <p className="">L</p>
       <div className="flex mt-auto items-center">
        <Minus size={15} color="#000" className="mr-1.5" />
        <p className="mr-1.5">2</p>
        <Plus size={15} color="#000" className="mr-1.5"/>
       </div>
      </div>
      <div className="ml-auto flex flex-col justify-between py-2 px-0 font-Jomolhari">
       <p className="">$200</p>
       <Trash2 size={20} color="#000" />
      </div>
     </div>
    </div>
  )
}

export default Cart_items