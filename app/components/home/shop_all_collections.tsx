'use client'
import { ShopContext } from "@/app/context/ShopContext";
import { X } from "@deemlol/next-icons";
import Link from "next/link";
import { useContext, useRef } from "react";

const Shop_all_collections = () => {
 const {sidebarLinks, isAllCollectionsOpen, closeAllCollections} = useContext(ShopContext)!;

 const collectionRef = useRef<HTMLDivElement>(null);
 
 const handleCollectionClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  if (e.target === collectionRef.current) {
    closeAllCollections();
  }
 };

  return (
    <div
      ref={collectionRef}
      onClick={handleCollectionClose}
      role="dialog"
      aria-label="shop all collection"
      className={isAllCollectionsOpen ?"opacity-100 z-50 visible translate-y-0 fixed top-0 w-screen h-screen flex justify-center items-center bg-black/50 transition-all duration-500 ease-in ":"fixed top-0 w-screen h-screen opacity-0 invisible flex justify-center items-center bg-black/50 -z-50 -translate-y-full transition-all duration-500 ease-in"}>
      <div className="bg-white w-[60%] h-[80%] flex flex-col justify-center items-center rounded-[10px] gap-8 font-Itim">
        <div className="flex justify-between items-center gap-10 md:gap-40 text-xl sm:text-2xl pt-8 px-4 md:px-0 md:pt-0">
          <h2 className="">Shop All Collection</h2>
          <X role="button" aria-label="close collection" size={24} color="#000" className="cursor-pointer" onClick={closeAllCollections}/>
        </div>
      
      <div className="flex flex-col md:flex-row gap-10 md:gap-24 overflow-auto overscroll-contain scroll-hidden">
        {sidebarLinks.map((item) => {
          const { name, id, links, address } = item;
            return (
              <div className="text-base sm:text-xl" key={id}>
                <h3
                  className="underline" 
                  onClick={closeAllCollections}>
                  <Link href={address}>{name}'s Clothes</Link>
                </h3>
                <div className="mt-4 text-[.9rem] sm:text-[1.1rem]">
                  {links.map((sub) => {
                    const { link_name, link_address } = sub;
                    return (
                      <p 
                        key={link_address}
                        className="mb-2" 
                        onClick={closeAllCollections}>
                        <Link href={link_address}>
                          {name}'s {link_name}
                        </Link>
                      </p>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
     </div>
    </div>
  )
}

export default Shop_all_collections