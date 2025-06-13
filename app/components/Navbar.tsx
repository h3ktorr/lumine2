'use client'

import Image from "next/image"
import { AlignJustify, ShoppingCart, Search, User } from "@deemlol/next-icons";
import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");

  return (
    <div className="flex justify-around items-center p-3 shadow-[0_1px_3px_-2px_rgb(0,0,0)] fixed w-full z-50 min-h-[3.5rem] top-0 bg-white mb-0">
      <div className="small-screen">
        <AlignJustify size={24} color="#000" />
      </div>
      <div 
        className="cursor-pointer" 
        onClick={() => setMenu("shop")}
      >
        <Image 
          src='/logo.png'
          alt="logo"
          width={100}
          height={20}
        />
      </div>
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
        <Search size={24} color="#000" className="big-screen cursor-pointer" />
        <ShoppingCart size={24} color="#000" className="cursor-pointer" />
        <User size={24} color="#000" className="big-screen cursor-pointer" />
      </div>
    </div>
  )
}

export default Navbar