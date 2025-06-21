"use client"

import { useContext, useEffect, useRef } from "react";
import { ShopContext } from "../context/ShopContext";
import { X } from "@deemlol/next-icons";
import Image from "next/image";
import Sidebar_search from "./sidebar/sidebar_search";
import Sidebar_links from "./sidebar/sidebar_links";

const Sidebar = () => {
 const { isSidebarOpen, closeSidebar } = useContext(ShopContext)!;

 const sidebarRef = useRef<HTMLDivElement>(null);

 const handleSidebarClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
   if (e.target === sidebarRef.current) {
     closeSidebar();
   }
 };

 useEffect(() => {
  if (isSidebarOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
  return () => {
    document.body.style.overflow = "auto";
  };
}, [isSidebarOpen]);

  return (
    <div 
     ref={sidebarRef}
     onClick={handleSidebarClose}
     className={isSidebarOpen ? "fixed z-50 top-0 left-0 bg-transparent w-full translate-x-0 duration-500 ease-in-out h-full" : "fixed z-50 top-0 left-0 bg-transparent w-full -translate-x-full duration-500 ease-in-out h-full"}
    >
     <div className="w-[80%] pr-4 pl-4 bg-white h-full">
      <div className="flex justify-between mr-[30%] py-4 px-0">
       <X 
        size={24} 
        color="#000" className="cursor-pointer" 
        onClick={closeSidebar}
       />
       <div className="">
        <Image 
          src='/logo.png'
          alt="logo"
          width={100}
          height={20}
        />
       </div>
      </div>
      <Sidebar_search />
      <Sidebar_links />
     </div>
    </div>
  )
}

export default Sidebar