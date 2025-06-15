import Best_sellers from "./components/home/best_seller";
import Collection_button from "./components/home/collection_button";
import Hero from "./components/home/hero";

export default function Home() {
  return (
        <div className="mt-14 max-w-[90vw] m-auto flex flex-col items-center">
          <Hero />
          <Best_sellers />
          <Collection_button />
        </div>
      )
    }
