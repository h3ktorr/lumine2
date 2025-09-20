'use client'

import Image from "next/image"
import { AlignJustify, ShoppingCart, LogIn, LogOut } from "@deemlol/next-icons";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { ShopContext } from "../context/ShopContext";
import { useCartStore } from "../hooks/useCartStore";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const [menu, setMenu] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const { openCart, openSidebar, isLoggedIn, handleLogin, handleLogout, allProducts} = useContext(ShopContext)!;
  const router = useRouter();
  const pathname = usePathname();

  const { counter } = useCartStore();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const getProduct = (slug: string) => {
    router.push(`/product/${slug}`);
    setSearchValue('');
  }

  useEffect(() => {
    if (pathname === "/") setMenu("shop");
    else if (pathname === "/men") setMenu("men");
    else if (pathname === "/women") setMenu("women");
    else setMenu(""); // default/fallback
  }, [pathname]);

  return (
    <div className="flex justify-around items-center p-3 shadow-[0_1px_3px_-2px_rgb(0,0,0)] fixed w-full z-30 min-h-[3.5rem] top-0 bg-white mb-0">
      <div className="small-screen" onClick={openSidebar}>
        <AlignJustify size={24} color="#000" role="button" aria-label="open sidebar"/>
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
        <div className="w-full h-10 border-2 border-[#3374a1] py-0 px-2 rounded-4xl hidden md:block relative">
          <input 
            type="search"  
            placeholder="Search product"
            value={searchValue}
            onChange={onChange}
            className="w-full h-full border-0 rounded-4xl py-0 px-1 text-base focus:outline-0"
          />
          {searchValue && (
            <div className="absolute left-0 top-12 w-full bg-white border rounded-xl shadow-lg z-10 overflow-hidden">
              {allProducts
             .filter((item) => {
              const searchTerm = searchValue.toLowerCase();
              const name = item.name?.toLowerCase() ?? "";
              return searchTerm && name.includes(searchTerm);
            })
            .slice(0, 5)
            .map((item) => (
              <div
                key={item._id}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() =>getProduct(item.slug!)}
              >
                {item.name}
              </div>
            ))}
            </div>
          )}
        </div>
        {isLoggedIn ? 
        <LogOut color="#000" className="big-screen w-6 h-6 md:w-[30px] md:h-[30px] cursor-pointer" onClick={handleLogout} role="button" aria-label="logout" /> 
        : 
        <LogIn color="#000" className="big-screen w-6 h-6 md:w-[30px] md:h-[30px] cursor-pointer" onClick={handleLogin} role="button" aria-label="login"/>
        }
        <ShoppingCart 
         color="#000" 
         className="w-6 h-6 md:w-[30px] md:h-[30px] cursor-pointer"
         onClick={openCart}
         role="button" 
         aria-label="open cart"
        />
        <div role="region" aria-label="cart counter" className="w-[1.375rem] h-[1.375rem] flex justify-center items-center mt-[-1.5625rem] ml-[-1.75rem]">{counter}</div>
      </div>
    </div>
  )
}

export default Navbar