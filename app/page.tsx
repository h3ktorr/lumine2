import Best_sellers from "./components/home/best_seller";
import Collection_button from "./components/home/collection_button";
import Hero from "./components/home/hero";
import Holiday_sale from "./components/home/holiday_sale";
import Newsletter from "./components/home/newsletter";
import Now_in_sale from "./components/home/now_in_sale";

export default function Home() {
  return (
        <div className="mt-14 w-[90vw] m-auto flex flex-col items-center">
          <Hero />
          <Best_sellers />
          <Collection_button />
          <Holiday_sale />
          <Now_in_sale />
          <Newsletter />
        </div>
      )
    }
