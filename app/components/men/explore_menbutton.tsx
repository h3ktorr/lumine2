"use client"
import { ShopContext } from "@/app/context/ShopContext";
import { useContext } from "react";
  

const Mens_exploreButton = () => {
 const {openAllCollections} = useContext(ShopContext)!;

 return (
   <div className="self-center mt-12 w-[50%] sm:w-[40%] md:w-[30%]">
    <button onClick={openAllCollections}  className="bg-[#A96161] text-white rounded-xl text-xl md:text-2xl p-2 font-Itim w-full h-20 cursor-pointer">Explore All Men</button>
   </div>
 )
}

export default Mens_exploreButton