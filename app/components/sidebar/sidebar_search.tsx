import { ShopContext } from "@/app/context/ShopContext";
import { useContext, useState } from "react";

const Sidebar_search = () => {
  const { allProducts } = useContext(ShopContext)!;
  const [searchValue, setSearchValue] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="mt-4 flex flex-col items-center relative w-full">
      <div className="w-full h-10 border-2 border-[#3374a1] px-2 rounded-4xl">
        <input
          type="search"
          placeholder="Search product"
          value={searchValue}
          onChange={onChange}
          className="w-full h-full border-0 rounded-4xl px-1 text-base focus:outline-0"
        />
      </div>

      {searchValue && (
        <div className="absolute top-12 w-full bg-white border rounded-xl shadow-lg z-10 overflow-hidden">
          {allProducts
             .filter((item) => {
              const searchTerm = searchValue.toLowerCase();
              const name = item.name?.toLowerCase() ?? "";
              return searchTerm && name.includes(searchTerm);
            })
            .slice(0, 5)
            .map((item) => (
              <div
                key={item._id}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => window.location.href = `/product/${item.slug}`}
              >
                {item.name}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar_search;
