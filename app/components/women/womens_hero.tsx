const Womens_hero = () => {
 return (
   <div className="w-full max-h-[calc(100vh-56px)]">
    <div className="flex womens_footwear_gradient w-full max-h-[calc(100vh-56px)] relative">
     <div className="absolute top-[70%] left-[5%] sm:left-[8%] sm:top-[20%] md:left-[15%] lg:left-[20%]">
      <h2 className="font-Jacques text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
      Browse Our Dress <br /> Collection
      </h2>
      <button className="bg-black text-white rounded-lg text-[.9rem] md:text-xl p-2 font-Itim w-[30%] h-8 md:h-12 cursor-pointer md:mt-8 flex justify-center items-center mt-2">Shop</button>
     </div>
     <div className="ml-auto">
     <img 
       src='/womens_hero.jpg'
       alt=""
       className="object-cover w-full h-[530] "
      />
     </div>
    </div>
   </div>
 )
}

export default Womens_hero