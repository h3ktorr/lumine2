import Link from "next/link"

const Holiday_sale = () => {
  return (
    <div className="mt-14 w-full max-h-[100vh]">
     <div className="flex relative w-full h-full holiday_sale_gradient">
      <div>
       <img 
        src="/holiday_hero.jpg" 
        alt="" 
        className="object-cover w-full h-[530] "
       />
      </div>
      <div className="absolute top-[10%] sm:top-[60%] lg:top-[40%] left-[10%] sm:left-[60%] lg:left-[45%] w-[50%] h-[30%]">
       <h2 className="font-Jacques text-2xl md:text-3xl lg:text-5xl max-xs:text-xl">Holiday Sale <br /> 20% off</h2>
       <Link href='/holiday-sales' className="absolute flex items-center justify-center bg-black text-white rounded-xl text-base lg:text-2xl p-2 font-Itim w-[30%] h-[20%] lg:h-[30%] cursor-pointer left-[15%] lg:left-[45%] top-[50%] max-xs:text-[.9rem] hover:bg-[#9c7474] transition-all duration-500">Shop</Link>
      </div>
     </div>
    </div>
  )
}

export default Holiday_sale