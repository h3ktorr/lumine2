import bestsellers from "../bestsellers"
import Item from "../item"

const Cart_shopmore = () => {
  return (
    <div className="my-8 mx-0 flex flex-col">
     <h1 className="font-Irish text-xl font-medium">Shop More</h1>
     <div className="flex mt-4 gap-5">
     {bestsellers.slice(0, 2).map(item=>{
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
     <button className="bg-[#E8E8E6] w-24 min-h-7 rounded-[10px] self-end font-Itim text-base mt-4 cursor-pointer">View More</button>
    </div>
  )
}

export default Cart_shopmore