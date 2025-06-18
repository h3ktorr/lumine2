const Hero = () => {
  return (
    <div className="w-full max-h-[calc(100vh-56px)]">
     <div className="flex bg-[#e8e8e6] w-full max-h-[calc(100vh-56px)] relative">
      <div className="absolute top-[60%] left-[5%] sm:left-[8%] sm:top-[20%] md:left-[10%]">
       <h2 className="font-Jacques text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
        Check Out Our <br /> New Arrivals
       </h2>
       <button className="bg-black text-white rounded-lg text-xl md:text-2xl p-2 font-Itim w-[30%] h-8 md:h-12 cursor-pointer md:mt-8 flex justify-center items-center mt-2">Shop</button>
      </div>
      <div className="ml-auto">
      <img 
        src='/home_hero.jpg'
        alt=""
        className="object-cover w-full h-[530] "
       />
      </div>
     </div>
    </div>
  )
}

export default Hero