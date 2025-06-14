import bestsellers from '../bestsellers'
import Item from '../item'

const Best_sellers = () => {
  return (
    <div className="w-full overflow-hidden mt-12 flex flex-col">
     <h1 className="font-Irish text-2xl cursor-pointer">Best Sellers</h1>
     <div className="grid w-full grid-cols-3 mt-4 gap-4">
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
  )
}

export default Best_sellers