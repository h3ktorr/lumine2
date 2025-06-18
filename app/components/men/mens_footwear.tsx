import bestsellers from '../bestsellers'
import Item from '../item'

const Mens_footwear = () => {
  return (
    <div className="w-full overflow-hidden mt-14 flex flex-col">
     <h1 className="font-Irish text-xl md:text-2xl cursor-pointer">Mens Footwear</h1>
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
  )
}

export default Mens_footwear