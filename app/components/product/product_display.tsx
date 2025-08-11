'use client'
import { ChevronLeft, ChevronRight } from '@deemlol/next-icons'
import Image from 'next/image'
import { products } from '@wix/stores';
import { useEffect, useState } from 'react'
import { useWixClient } from '@/app/hooks/useWixClient';
import { useCartStore } from '@/app/hooks/useCartStore';

// interface ProductProps{
//  id: number;
//  name: string;
//  price: number;
//  image: StaticImageData[]
//  category: string;
// }

interface AddTocartProps{
  productId: string;
  varientId: string;
  stockNumber: number;
}


const Product_display = ({ product, productId }: { product: products.Product, productId: string }) => { 
 const [index, setIndex] = useState(0);
 const [selectedSize, setSelectedSize] = useState('');
 const [sizeSelected, setSizeSelected] = useState(false);
 const [selectedVarient, setSelectedVarient] = useState<products.Variant>()
 const [selectedOption, setSelectedOption] = useState("")

 const mediaImage = product.media?.items;

 const wixClient = useWixClient();
 const { cart, addItem} = useCartStore();

 useEffect(()=>{
    setSelectedVarient(selectedOption)
  }, [selectedOption])

 const handleOptionSelect = (choice:string) => {
  setSelectedOption(choice)
 }
 
 
  const handleSizeChange = (sizeId:number, sizeName:string) => {
   // chooseSize(sizeId, sizeName);
   setSelectedSize(sizeName);
   setSizeSelected(true);
  };

 const nextSlide = () => {
  setIndex((oldIndex) => {
    let index = oldIndex + 1;
    if (index > mediaImage!.length - 1) {
      index = 0;
    }
    return index;
  });
 };

 const prevSlide = () => {
   setIndex((oldIndex) => {
     let index = oldIndex - 1;
     if (index < 0) {
       index = mediaImage!.length - 1;
     }
     return index;
   });
 };

 useEffect(() => {
  setIndex(0);
 //  // setSizeSelected(false);
 //  // setSelectedSize(null);
 }, [mediaImage]);

 useEffect(() => {
  let slider = setInterval(() => {
    setIndex((oldIndex) => {
      let index = oldIndex + 1;
      if (index > mediaImage!.length - 1) {
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
    <div className='flex flex-col xm:flex-row gap-8 font-Jomolhari w-full items-center'>
     <div className="relative w-full xm:w-[60ch] h-[calc(100vh-56px)]">
     {mediaImage!.map((imageItem, imageIndex) => {
        const imgUrl = imageItem.image?.url || ""; // string

        let position = "nextSlide";
        if (imageIndex === index) {
          position = "activeSlide";
        }
        if (
          imageIndex === index - 1 ||
          (index === 0 && imageIndex === mediaImage!.length - 1)
        ) {
          position = "lastSlide";
        }

        return (
          <Image 
            src={imgUrl} // ✅ This is now a string
            alt=""
            key={imageIndex}
            fill
            style={{ objectFit: "cover" }}
            className={`${position} absolute object-cover xm:object-contain transition-all duration-1000`}
          />
        );
      })}
        <button className="absolute z-20 bg-black w-6 h-6 my-0 mx-1 grid place-items-center border-transparent text-base rounded-[5px] cursor-pointer top-[50%] left-0 " onClick={prevSlide}>
         <ChevronLeft size={24} color="#fff" />
        </button>
        <button className="absolute z-20 bg-black w-6 h-6 my-0 mx-1 grid place-items-center border-transparent text-base rounded-[5px] cursor-pointer top-[50%] right-0" onClick={nextSlide}>
         <ChevronRight size={24} color="#fff" />
        </button>
     </div>
     <div className="flex-1 flex flex-col gap-2 sm:flex-row sm:gap-4 xm:gap-2 xm:flex-col my-6 mx-0">
      <div className="mb-8">
       <p className="mb-1 text-base sm:text-xl">{product.name}</p>
       <p className="mb-1 text-[.9rem] sm:text-base">${product.priceData?.price}</p>
       {/* <p className="mb-1 text-[.9rem] sm:text-base">{product.}</p> */}
      </div>
      <div className="bg-[#D9D9D9] py-2 px-4 lg:w-2/3 w-full text-[.9rem] sm:text-base">
       <p className="">Select price</p>
       <div className="mt-2">
       {product.productOptions?.map(option=>(
        option.choices!.map((choice, sizeIndex)=>{
        let size = choice.value
        return <div
          key={sizeIndex}
          className='border-[.1rem] mb-2 p-[.15rem] text-xs transition-all duration-300 cursor-pointer hover:bg-white'
          onClick={() => handleOptionSelect(size!)}
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
        })))}
       </div>
       <button onClick={()=>addItem(wixClient, productId)} className={sizeSelected ? "bg-black text-white rounded-[10px] text-base sm:text-xl p-2 font-Itim mt-4 w-full transition-all duration-500 hover:cursor-pointer hover:bg-[#9c7474]" :"bg-[#696565] text-white rounded-[10px] text-base sm:text-xl p-2 font-Itim mt-4 w-full transition-all duration-500"}>
       {sizeSelected ? "Add To Cart" : "Select A Size"}
       </button>
      </div>
     </div>
    </div>
  )
}

export default Product_display