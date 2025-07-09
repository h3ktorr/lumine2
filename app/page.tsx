// "use client"

// import { useEffect } from "react";
import Best_sellers from "./components/home/best_seller";
import Collection_button from "./components/home/collection_button";
import Hero from "./components/home/hero";
import Holiday_sale from "./components/home/holiday_sale";
import Newsletter from "./components/home/newsletter";
import Now_in_sale from "./components/home/now_in_sale";
import Shop_all_collections from "./components/home/shop_all_collections";

const Home = async() => {
  // const wixClient = useWixClient()

  // useEffect(()=>{
  //   const getProducts = async () => {
  //     const res = await wixClient.products.queryProducts().find();

  //     console.log(res);
  //   }
  //   getProducts();
  // }, [wixClient])

  //Server
  // const wixClient = await wixClientServer();
  // const res = await wixClient.products.queryProducts().find();
  // console.log(res);
  
  return (
        <div className="mt-14 w-[90vw] m-auto flex flex-col items-center">
          <Hero />
          <Best_sellers />
          <Collection_button />
          <Shop_all_collections />
          <Holiday_sale />
          <Now_in_sale />
          <Newsletter />
        </div>
      )
    }
    export default Home