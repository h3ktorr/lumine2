import Womens_exploreButton from "../components/women/explore_womenbutton"
import Womens_accessories from "../components/women/womens_accessories"
import Womens_Bottom from "../components/women/womens_bottom"
import Womens_Dress from "../components/women/womens_dress"
import Womens_footwear from "../components/women/womens_footwear"
import Womens_footwearHero from "../components/women/womens_footwearhero"
import Womens_hero from "../components/women/womens_hero"
import Womens_newArrival from "../components/women/womens_newarrival"
import Womens_outerwear from "../components/women/womens_outerwear"
import Womens_top from "../components/women/womens_top"

const Women = () => {
 return (
   <div className="mt-14 max-w-[90vw] m-auto flex flex-col items-center">
    <Womens_hero />
    <Womens_outerwear />
    <Womens_top />
    <Womens_newArrival />
    <Womens_Bottom />
    <Womens_Dress />
    <Womens_accessories />
    <Womens_footwearHero />
    <Womens_footwear />
    <Womens_exploreButton />
   </div>
 )
}

export default Women