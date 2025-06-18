const Newsletter = () => {
  return (
    <div className="w-full min-h-24  md:min-h-40 newsletter_gradient flex flex-col sm:flex-row justify-around items-center gap-2 font-Jomolhari mt-14 max-xs:p-2 p-4">
     <h1 className="text-white text-base md:text-xl lg:text-2xl hidden sm:block">
        Sign up now to get alerts <br /> for new product drops
      </h1>
      <h1 className="text-white text-[.9rem] sm:hidden ">
        Sign up now to get alerts for new product drops
      </h1>
      <div className="flex items-center justify-between bg-white w-[15rem] sm:w-[20rem] md:w-[25rem] sm:min-h-10 lg:w-[35rem] min-h-8 md:min-h-16 rounded-[80px] border-[1px] border-[#e3e3e3]">
        <input 
         type="email" 
         placeholder="Enter Email" 
         className="w-[20rem] ml-7 border-[none] outline-[none] text-[#616161] font-base text-xs sm:text-base"
        />
        <button className="w-40 h-8 sm:h-10 md:h-16 rounded-[80px] bg-black text-white text-xs sm:text-base cursor-pointer ">Subscribe</button>
      </div>
    </div>
  )
}

export default Newsletter