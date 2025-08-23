import Link from "next/link"

const Mens_hero = () => {
  return (
    <div className="w-full max-h-[calc(100vh-56px)]">
     <div className="flex bg-[#BFBFBF] w-full max-h-[calc(100vh-56px)] relative">
      <div className="absolute top-[60%] left-[20%] max-xs:left-[5%] sm:left-[8%] sm:top-[10%] lg:top-[20%] md:left-[10%]">
       <h2 className="font-Jacques text-2xl sm:text-3xl md:text-4xl lg:text-5xl  text-white sm:text-black">
         Browse Our Hoodies <br /> Collection
       </h2>
       <Link href='/hoodies-collection' className="bg-black text-white rounded-lg text-xl md:text-2xl p-2 font-Itim w-[30%] h-8 md:h-12 cursor-pointer md:mt-8 flex justify-center items-center mt-2 border-white border-2 sm:border-0 hover:bg-[#9c7474] transition-all duration-500">Explore</Link>
      </div>
      <div className="ml-auto">
       <img 
        src='/mens_hero.jpg'
        alt=""
        className="object-cover w-full h-[530] "
       />
      </div>
     </div>
    </div>
  )
}

export default Mens_hero