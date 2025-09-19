import { ShopContext } from "@/app/context/ShopContext";
import { Minus, Plus } from "@deemlol/next-icons";
import Link from "next/link";
import { useContext } from "react";

const Sidebar_links = () => {
 const { sidebarLinks, closeSidebar, handleCategory} = useContext(ShopContext)!;

  return (
    <div className="mt-4 mr-4 mb-0 ml-0 font-Itim text-base">
     <Link href='/'>
      <h2 className="text-xl">All Categories</h2>
     </Link>
     <div className="">
      {sidebarLinks.map(item=>(
       <div 
        className=""
        key={item.id}
       >
        <div className="flex justify-between items-center text-base mt-2">
         <Link href={item.address}>
          <h2 
           className="text-xl"
           onClick={closeSidebar}
          >{item.name}</h2>
         </Link>
         <div 
          className=""
          onClick={() => handleCategory(item.id)}
         >
          {item.categoryState ? 
          <Minus size={15} color="#000" role="button" aria-label="toggle sublinks off" /> : 
          <Plus size={15} color="#000" role="button" aria-label="toggle sublinks on"/>}
         </div>
        </div>
        {item.categoryState && (
         <div role="region" aria-label="sidebar sublinks" className="mt-1.5 mb-4 mx-0 font-Itim">
          {item.links.map(data=>(
           <p 
            key={data.link_address}
            onClick={closeSidebar}
            className="text-base mt-1.5"
           >
            <Link href={data.link_address}>{data.link_name}</Link>
           </p>
          ))}
         </div>
        )}
       </div>
      ))}
     </div>
    </div>
  )
}

export default Sidebar_links