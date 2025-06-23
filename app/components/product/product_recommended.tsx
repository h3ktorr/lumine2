import bestsellers from "../bestsellers"
import Item from "../item"

const Product_recommended = () => {
  return (
    <div className="w-full overflow-hidden mt-12 flex flex-col">
     <h1 className="font-Irish text-xl">Recommended for you</h1>
     <div className="flex gap-5 mt-4 recommended-items">
     {bestsellers.slice(0,3).map(item=>{
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
     <button className="bg-[#E8E8E6] w-28 h-8 rounded-[10px] self-end mt-4 font-Itim text-base text-black">View More</button>
    </div>
  )
}

export default Product_recommended