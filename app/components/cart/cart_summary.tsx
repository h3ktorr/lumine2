const Cart_summary = () => {
  return (
    <div className="mt-8 font-Jomolhari w-full">
     <p className="text-xl">Order Summary</p>
     <div className="mt-2 py-2 px-4">
      <div className="flex justify-between">
       <p className="">Subtotal</p>
       <p className="">$2000</p>
      </div>
      <div className="flex justify-between mt-1">
       <p className="">Shipping</p>
       <p className="">Free Shipping</p>
      </div>
      <div className="flex justify-between mt-8 border-t-[1px]">
       <p className="">Total</p>
       <p className="">$2000</p>
      </div>
     </div>
     <button className="bg-black text-white rounded-[10px] text-2xl p-2 font-Itim w-full cursor-pointer mt-8">Checkout</button>
    </div>
  )
}

export default Cart_summary