'use client'

import GreyAmani1 from '@/public/holiday_hero.jpg'
import GreyAmani2 from '@/public/home_hero.jpg'
import GreyAmani3 from '@/public/mens_footwearhero.jpg'
import GreyAmani4 from '@/public/mens_hero.jpg'
import GreyAmani5 from '@/public/mens_newarrival.jpg'
import { ChevronLeft, ChevronRight } from '@deemlol/next-icons'
import Image, { StaticImageData } from 'next/image'
import { useEffect, useState } from 'react'

interface ProductProps{
 id: number;
 name: string;
 price: number;
 image: StaticImageData[]
 category: string;
}


const Product_display = () => {
 let product: ProductProps = 
  {
    id: 232,
    name: "Amani Moto Shearling Bomber",
    price: 2680,
    image: [GreyAmani1, GreyAmani2, GreyAmani3, GreyAmani4, GreyAmani5],
    category: `Women's Outerwear`,
  }
 
 const [index, setIndex] = useState(0);
 const sizes = ["XXL", "XL", "L", "M", "S", "XS", "XXS"];
 const [selectedSize, setSelectedSize] = useState('');
 const [sizeSelected, setSizeSelected] = useState(false);

 const handleSizeChange = (sizeId:number, sizeName:string) => {
  // chooseSize(sizeId, sizeName);
  setSelectedSize(sizeName);
  setSizeSelected(true);
};

 const nextSlide = () => {
  setIndex((oldIndex) => {
    let index = oldIndex + 1;
    if (index > product.image.length - 1) {
      index = 0;
    }
    return index;
  });
 };

 const prevSlide = () => {
   setIndex((oldIndex) => {
     let index = oldIndex - 1;
     if (index < 0) {
       index = product.image.length - 1;
     }
     return index;
   });
 };

 // useEffect(() => {
 //  setIndex(0);
 //  // setSizeSelected(false);
 //  // setSelectedSize(null);
 // }, [product.image]);

 useEffect(() => {
  let slider = setInterval(() => {
    setIndex((oldIndex) => {
      let index = oldIndex + 1;
      if (index > product.image.length - 1) {
        index = 0;
      }
      return index;
    });
  }, 5000);
  return () => {
    clearInterval(slider);
  };
 }, [index]);

  return (
    <div className='flex gap-8 font-Jomolhari w-full'>
     <div className="relative w-[60ch] h-screen">
     {product.image.map((image, imageIndex) => {
          let position = "nextSlide";
          if (imageIndex === index) {
            position = "activeSlide";
          }
          if (
            imageIndex === index - 1 ||
            (index === 0 && imageIndex === product.image.length - 1)
          ) {
            position = "lastSlide";
          }
          return (
            <Image 
             src={image} 
             alt="" 
             key={imageIndex} 
             style={{ width: "100%", objectFit: "contain" }}
             className={`${position} absolute transition-all duration-1000`} />
          );
        })}
        <button className="absolute z-20 bg-black w-6 h-6 my-0 mx-1 grid place-items-center border-transparent text-base rounded-[5px] cursor-pointer top-[50%] left-0 " onClick={prevSlide}>
         <ChevronLeft size={24} color="#fff" />
        </button>
        <button className="absolute z-20 bg-black w-6 h-6 my-0 mx-1 grid place-items-center border-transparent text-base rounded-[5px] cursor-pointer top-[50%] right-0" onClick={nextSlide}>
         <ChevronRight size={24} color="#fff" />
        </button>
     </div>
     <div className="flex-1 my-6 mx-0">
      <div className="mb-8">
       <p className="mb-1 text-xl">{product.name}</p>
       <p className="mb-1">{product.price}</p>
       <p className="mb-1">{product.category}</p>
      </div>
      <div className="bg-[#D9D9D9] py-2 px-4 w-2/3">
       <p className="">Select price</p>
       <div className="">
       {sizes.map((size, sizeIndex) => (
        <div
          key={sizeIndex}
          className='border-[.1rem] mb-2 p-[.15rem] text-xs transition-all duration-300 cursor-pointer hover:bg-white'
          onClick={() => handleSizeChange(product.id, size)}
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
       <button className={sizeSelected ? "bg-black text-white rounded-[10px] text-xl p-2 font-Itim mt-4 w-full transition-all duration-500 hover:cursor-pointer hover:bg-[#9c7474]" :"bg-[#696565] text-white rounded-[10px] text-xl p-2 font-Itim mt-4 w-full transition-all duration-500"}>
       {sizeSelected ? "Add To Cart" : "Select A Size"}
       </button>
      </div>
     </div>
    </div>
  )
}

export default Product_display