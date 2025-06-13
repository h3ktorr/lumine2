import Image from "next/image"

const Hero = () => {
  return (
    <div className="w-full max-h-[calc(100vh-56px)]">
     <div className="flex bg-[#e8e8e6] w-full max-h-[calc(100vh-56px)] relative">
      <div className="absolute top-[15%] left-[10%]">
       <h2 className="text-5xl font-Jacques">
        Check Out Our <br /> New Arrivals
       </h2>
       <button className="bg-black text-white rounded-lg text-2xl p-2 font-Itim w-[30%] h-12 cursor-pointer mt-8 flex justify-center items-center">Shop</button>
      </div>
      <div className="ml-auto ">
       <Image 
        src='/home_hero.jpg'
        alt=""
        height={530}
        width={530}
        objectFit="contain"
       />
      </div>
     </div>
    </div>
  )
}

export default Hero