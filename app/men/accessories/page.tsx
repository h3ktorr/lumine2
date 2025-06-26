import bestsellers from "@/app/components/bestsellers"
import Item from "@/app/components/item"

const page = () => {
  return (
    <div className="mt-14 w-[90vw] m-auto flex flex-col items-center">
     <div className="w-full h-[calc(100vh-56px)] men_accessories_bg bg-no-repeat bg-cover bg-center flex justify-center relative">
      <h2 className="font-Jacques absolute text-[1.7rem] sm:text-4xl lg:text-5xl text-white top-[50%]">Accessories for you</h2>
     </div>
     <div className="w-full overflow-hidden mt-14 flex flex-col">
      <h1 className="font-Irish text-xl md:text-2xl cursor-pointer">Mens Accessories</h1>
      <div className="grid w-full grid-cols-2 md:grid-cols-3 mt-4 gap-4">
       {bestsellers.map(item=>{
         // console.log(item.image);
         const images = [...item.image]
         return (
           <Item 
             key={item.id}
             id={item.id}
             name={item.name}
             image={images}
             price={item.price}
           />
         )
       })}
      </div>
     </div>
    </div>
  )
}

export default page