import Link from "next/link"

const Womens_footwearHero = () => {
 return (
   <div className="mt-14 w-full max-h-[100vh]">
    <div className="flex relative w-full h-full bg-[#F2F2F2]">
     <div>
      <img 
       src="/womens_footwearhero.jpg" 
       alt="" 
       className="object-cover w-full h-[530] "
      />
     </div>
     <div className="absolute top-[70%] sm:top-[30%] left-[10%] sm:left-[50%] lg:left-[45%] w-[50%] h-[30%]">
      <h2 className="font-Jacques text-[1.35rem] sm:text-3xl md:text-4xl lg:text-5xl max-xs:text-xl">Footwear For <br /> All</h2>
      <Link href='/footwears-for-all' className="absolute flex items-center justify-center bg-black text-white rounded-xl text-base lg:text-2xl p-2 font-Itim w-[30%] h-[20%] lg:h-[30%] cursor-pointer left-[35%] sm:left-[20%] lg:left-[25%] top-[20%] sm:top-[35%] max-xs:text-[.9rem] hover:bg-[#9c7474] transition-all duration-500">Shop</Link>
     </div>
    </div>
   </div>
 )
}

export default Womens_footwearHero