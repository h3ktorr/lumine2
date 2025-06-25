import Mens_exploreButton from "../components/men/explore_menbutton"
import Mens_accessories from "../components/men/mens_accessories"
import Mens_bottom from "../components/men/mens_bottom"
import Mens_footwear from "../components/men/mens_footwear"
import Mens_footwearHero from "../components/men/mens_footwearhero"
import Mens_hero from "../components/men/mens_hero"
import Mens_newArrival from "../components/men/mens_newarrival"
import Mens_outerwear from "../components/men/mens_outerwear"
import Mens_top from "../components/men/mens_top"
import Shop_all_men from "../components/men/shop_all_men"

const Men = () => {
  return (
    <div className="mt-14 w-[90vw] m-auto flex flex-col items-center">
     <Mens_hero />
     <Mens_outerwear />
     <Mens_top />
     <Mens_newArrival />
     <Mens_bottom />
     <Mens_accessories />
     <Mens_footwearHero />
     <Mens_footwear />
     <Mens_exploreButton />
     <Shop_all_men />
    </div>
  )
}

export default Men