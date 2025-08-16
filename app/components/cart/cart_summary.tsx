import { currentCart } from "@wix/ecom";

interface CartWithSubtotal extends currentCart.Cart {
  subtotal?: {
    amount: number;
    currency: string;
  };
}

const Cart_summary = ({cart}: {cart:CartWithSubtotal}) => {
  return (
    <div className="mt-8 font-Jomolhari w-full text-[.8rem] sm:text-base ">
     <p className="text-base sm:text-xl">Order Summary</p>
     <div className="mt-2 py-2 px-4">
      <div className="flex justify-between">
       <p className="">Subtotal</p>
       <p className="">${cart.subtotal?.amount ?? 0}</p>
      </div>
      <div className="flex justify-between mt-1">
       <p className="">Shipping</p>
       <p className="">Free Shipping</p>
      </div>
      <div className="flex justify-between mt-8 border-t-[1px]">
       <p className="">Total</p>
       <p className="">${cart.subtotal?.amount ?? 0}</p>
      </div>
     </div>
     {cart.subtotal?.amount! > 0 && <button className="bg-black text-white rounded-[10px] text-xl sm:text-2xl p-2 font-Itim w-full cursor-pointer mt-8 ">Checkout</button>}
    </div>
  )
}

export default Cart_summary