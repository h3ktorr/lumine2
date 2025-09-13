'use client'

import { useContext, useEffect, useRef } from "react"
import { ShopContext } from "../context/ShopContext";
import { X } from "@deemlol/next-icons";
import Cart_items from "./cart/cart_items";
import Cart_summary from "./cart/cart_summary";
import { useCartStore } from '@/app/hooks/useCartStore'
import { useWixClient } from "@/app/hooks/useWixClient";

const Cart = () => {
 const { isCartOpen, closeCart} = useContext(ShopContext)!;

 const cartRef = useRef<HTMLDivElement>(null);

 const wixClient = useWixClient()

 const { cart, getCart} = useCartStore();

 useEffect(()=>{
  getCart(wixClient);
 }, [wixClient, getCart])

 const handleCartClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
   if (e.target === cartRef.current) {
     closeCart();
   }
 };

 useEffect(() => {
  if (isCartOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
  return () => {
    document.body.style.overflow = "auto";
  };
 }, [isCartOpen]);
 
  return (
    <div 
     ref={cartRef}
     role="dialog"
     aria-label="shopping cart"
     onClick={handleCartClose}
     className={isCartOpen ? "fixed z-50 top-0 self-end w-full cart_background opacity-100 overflow-auto translate-x-0 transition-all duration-500 ease-in h-full" : "fixed z-50 top-0 self-end w-full cart_background opacity-0 overflow-hidden translate-x-full transition-all duration-500 ease-in h-full"}
    >
     <div 
      role="region" 
      aria-label="cart panel" 
      onClick={(e) => e.stopPropagation()}
      className="bg-white ml-auto w-[80vw] sm:w-[70vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw] p-4 relative h-full overflow-scroll"
    >
      <div className="flex w-full justify-between p-4 border-black border-b-[3px]">
       <h1 className="font-Irish text-xl sm:text-2xl">Shopping Cart</h1>
       <X size={24} color="#000" className="cursor-pointer" onClick={closeCart} role="button" aria-label="close cart" />
      </div>
      <Cart_items /> 
      <Cart_summary cart={cart} />
     </div>
    </div>
  )
}

export default Cart