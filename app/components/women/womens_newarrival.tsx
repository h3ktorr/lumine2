import Link from "next/link"

const Womens_newArrival = () => {
 return (
   <div className="w-full max-h-[calc(100vh-56px)] mt-14">
    <div className="flex bg-[#F9F7F9] w-full max-h-[calc(100vh-56px)] relative">
     <div className="absolute top-[40%] left-[60%] max-xs: sm:left-[8%] sm:top-[60%] lg:top-[50%] md:left-[20%] lg:left-[27%]">
      <h2 className="font-Jacques max-xs:text-xl text-2xl sm:text-3xl md:text-4xl lg:text-5xl  ">
        New Arrivals
      </h2>
      <Link href='/new-arrivals' className="bg-black text-white rounded-lg text-[.85rem] sm:text-xl  p-4 font-Itim w-[45%] h-8 md:h-12 cursor-pointer md:mt-8 flex justify-center items-center mt-2 sm:border-0 hover:bg-[#9c7474] transition-all duration-500">Explore</Link>
     </div>
     <div className="ml-auto">
      <img 
       src='/womens_newarrival.jpg'
       alt=""
       className="object-cover w-full h-[530] "
      />
     </div>
    </div>
   </div>
 )
}

export default Womens_newArrival