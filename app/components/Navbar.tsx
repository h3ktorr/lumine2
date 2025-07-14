'use client'

import Image from "next/image"
import { AlignJustify, ShoppingCart, Search, User } from "@deemlol/next-icons";
import { useContext, useState } from "react";
import Link from "next/link";
import { ShopContext } from "../context/ShopContext";
import { useWixClient } from "../hooks/useWixClient";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { openCart, openSidebar } = useContext(ShopContext)!;

  const wixClient = useWixClient()

  const login = async() => {
    const loginRequestData = wixClient.auth.generateOAuthData(
      "http://localhost:3000/callback", // Redirect URI
      "http://localhost:3000", //Original URI
    );

    console.log(loginRequestData);

    localStorage.setItem("oAuthRedirectData", JSON.stringify(loginRequestData))
    const {authUrl} = await wixClient.auth.getAuthUrl(loginRequestData)
    window.location.href = authUrl;
  }

  return (
    <div className="flex justify-around items-center p-3 shadow-[0_1px_3px_-2px_rgb(0,0,0)] fixed w-full z-30 min-h-[3.5rem] top-0 bg-white mb-0">
      <div className="small-screen" onClick={openSidebar}>
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
        <ShoppingCart size={24} color="#000" className="cursor-pointer"
         onClick={openCart}
        />
        <User size={24} color="#000" className="big-screen cursor-pointer" onClick={login} />
      </div>
    </div>
  )
}

export default Navbar