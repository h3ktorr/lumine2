const Sidebar_search = () => {
  return (
    <div className="mt-4 flex flex-col items-center">
     <div className="w-full h-10 border-2 border-[#3374a1] py-0 px-2 rounded-4xl">
      <input 
       type="search"  
       placeholder="Search product"
       className="w-full h-full border-0 rounded-4xl py-0 px-1 text-base focus:outline-0"
      />
     </div>
    </div>
  )
}

export default Sidebar_search