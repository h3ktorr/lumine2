'use client'

import Link from "next/link"
import { useState } from "react";
import { ChevronRight, ChevronLeft } from "@deemlol/next-icons";
import Image, { StaticImageData } from "next/image";

interface Props{
 id: number;
 image: StaticImageData[]; 
 price: number; 
 name: string;
}

const Item = (props: Props) => {
 const { id, image, price, name } = props;
 const [index, setIndex] = useState(0);

  return (
    <div className="w-full font-Itim overflow-hidden h-full basis-full">
     <div className="">
      <div className="relative h-full w-full">
       <div className="absolute flex h-full top-[9rem] w-full">
        <div className={"absolute text-xl"}>
        <ChevronLeft size={24} color="#000" />
        </div>
        <div className={"absolute text-xl right-0"}>
        <ChevronRight size={24} color="#000" />
        </div>
       </div>
       <div className="absolute flex w-full ">
        Size
       </div>
      </div>
      <div className="">
       <Link href='/'>
        <Image
         src={image[index]}
         alt=""
         style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
       </Link>
      </div>
     </div>
     <p className="">{name}</p>
     <p className="">{price}</p>
    </div>
  )
}

export default Item