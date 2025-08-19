'use client'

import Image from "next/image"
import { AlignJustify, ShoppingCart, LogIn, LogOut } from "@deemlol/next-icons";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { ShopContext } from "../context/ShopContext";
import { useCartStore } from "../hooks/useCartStore";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { openCart, openSidebar, isLoggedIn, handleLogin, handleLogout} = useContext(ShopContext)!;

  const { counter } = useCartStore();

  return (
    <div className="flex justify-around items-center p-3 shadow-[0_1px_3px_-2px_rgb(0,0,0)] fixed w-full z-30 min-h-[3.5rem] top-0 bg-white mb-0">
      <div className="small-screen" onClick={openSidebar}>
        <AlignJustify size={24} color="#000" />
      </div>
      <Link 
        className="cursor-pointer" 
        href='/'
        onClick={() => setMenu("shop")}
      >
        <Image 
          src='/logo.png'
          alt="logo"
          width={100}
          height={20}
        />
      </Link>
      <ul className="big-screen flex items-center gap-8 md:gap-10 text-lg font-Irish">
        <li 
          onClick={() => setMenu("shop")}
        > 
          <Link href='/'>Shop</Link> 
          {menu === "shop" && <hr />}
        </li>
        <li  
          onClick={() => setMenu("men")}
        > 
          <Link href='/men'>Men</Link>
          {menu === "men" && <hr />}
        </li>
        <li 
          onClick={() => setMenu("women")}
        > 
          <Link href='/women'>Women</Link>
          {menu === "women" && <hr />}
        </li>
      </ul>
      <div className="flex items-center gap-4 md:gap-6">
        <div className="w-full h-10 border-2 border-[#3374a1] py-0 px-2 rounded-4xl hidden md:block">
          <input 
            type="search"  
            placeholder="Search product"
            className="w-full h-full border-0 rounded-4xl py-0 px-1 text-base focus:outline-0"
          />
        </div>
        {isLoggedIn ? <LogOut color="#000" className="big-screen w-6 h-6 md:w-[30px] md:h-[30px] cursor-pointer" onClick={handleLogout} /> : <LogIn color="#000" className="big-screen w-6 h-6 md:w-[30px] md:h-[30px] cursor-pointer" onClick={handleLogin} />}
        <ShoppingCart color="#000" className="w-6 h-6 md:w-[30px] md:h-[30px] cursor-pointer"
         onClick={openCart}
        />
        <div className="w-[1.375rem] h-[1.375rem] flex justify-center items-center mt-[-1.5625rem] ml-[-1.75rem]">{counter}</div>
      </div>
    </div>
  )
}

export default Navbar