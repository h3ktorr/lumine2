const Mens_newArrival = () => {
 return (
   <div className="w-full max-h-[calc(100vh-56px)] mt-14">
    <div className="flex bg-[#E6E5EA] w-full max-h-[calc(100vh-56px)] relative">
     <div className="absolute top-[40%] left-[8%] max-xs:left-[5%] sm:left-[8%] sm:top-[60%] lg:top-[50%] md:left-[20%] lg:left-[27%]">
      <h2 className="font-Jacques text-2xl sm:text-3xl md:text-4xl lg:text-5xl  ">
        New Arrivals
      </h2>
      <button className="bg-black text-white rounded-lg text-[.85rem] sm:text-xl  p-4 font-Itim w-[40%] h-8 md:h-12 cursor-pointer md:mt-8 flex justify-center items-center mt-2 sm:border-0">Explore</button>
     </div>
     <div className="ml-auto">
      <img 
       src='/mens_newarrival.jpg'
       alt=""
       className="object-cover w-full h-[530] "
      />
     </div>
    </div>
   </div>
 )
}

export default Mens_newArrival