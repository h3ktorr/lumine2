'use client'

import Link from "next/link"
import { useState } from "react";
import { ChevronRight, ChevronLeft } from "@deemlol/next-icons";
import Image, { StaticImageData } from "next/image";

interface Props{
 id: number;
 image: string[]; 
 price: number; 
 name: string;
 slug: string;
}

const Item = (props: Props) => {
 const { id, image, price, name, slug } = props;
 const [index, setIndex] = useState(0);
 const [isHovered, setIsHovered] = useState(false);
 const sizes = ["XXL", "XL", "L", "M", "S", "XS", "XXS"];
 const [selectedSize, setSelectedSize] = useState("");

 const handleMouseEnter = () => {
  setIsHovered(true);
 };

 const handleMouseLeave = () => {
   setIsHovered(false);
 };

 const handleSizeChange = (sizeId:number, sizeName:string) => {
  setSelectedSize(sizeName);
};

const handleNextImage = () => {
  setIndex((prev) => (prev + 1) % image.length); 
};

const handlePrevImage = () => {
  setIndex((prev) => (prev - 1 + image.length) % image.length);
};


  return (
    <div className="w-full font-Itim overflow-hidden h-full basis-full">
     <div 
      className="" 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-full hidden lg:block  w-full">
       <div className="absolute flex h-full top-[10rem]  w-full">
        <div className={isHovered ? "absolute text-xl left-2 transition-all duration-500" : "absolute text-xl -left-4 transition-all duration-500"}>
        <ChevronLeft size={24} color="#000" onClick={handlePrevImage}/>
        </div>
        <div className={isHovered ? "absolute text-xl right-2 transition-all duration-500": "absolute text-xl -right-4 transition-all duration-500"}>
        <ChevronRight size={24} color="#000" onClick={handleNextImage}/>
        </div>
       </div>
       <div 
        className={isHovered ? "absolute flex w-full justify-between transition-all duration-500 items-center h-8 gap-1 bg-[#d6d2d2] top-0" : "absolute flex w-full justify-between transition-all duration-500 items-center h-8 gap-1 bg-[#d6d2d2] -top-8"}
      >
        {sizes.map((size, sizeIndex) => (
          <div 
            className="w-9 text-center border-black border-[.1rem] cursor-pointer hover:bg-white"
            key={sizeIndex}
            onClick={() => handleSizeChange(id, size)}
            style={
              selectedSize === size
                ? {
                    color: "white",
                    backgroundColor: "black",
                  }
                : {}
            }
          >
            {size}
          </div>
        ))}
       </div>
      </div>
      <div className="">
       <Link href={`/product/${slug}`}>
        <Image
         src={image[index]}
         alt=""
         style={{ width: "100%", height: "100%", objectFit: "cover" }}
         width={500} 
         height={500}
        />
       </Link>
      </div>
     </div>
     <p className="text-[.9rem] md:text-base">{name}</p>
     <p className="text-[.9rem] md:text-base">${price}</p>
    </div>
  )
}

export default Item