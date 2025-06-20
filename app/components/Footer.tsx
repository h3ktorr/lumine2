import { FaXTwitter, FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="grid grid-cols-2 lg:flex max-xs:flex max-xs:flex-col bg-[#221C1C] text-white p-4 sm:p-8 lg:p-16 w-[90vw] font-Itim m-auto mt-16 justify-between xl:gap-16">
      <div className="w-full  flex flex-col items-center">
        <h1 className="font-Irish text-xl md:text-2xl">Shop</h1>
        <ul className="list-none mt-4 text-base sm:text-xl lg:text-2xl">
          <li>Outerwears</li>
          <li>Tops</li>
          <li>Bottom</li>
          <li>Footwears</li>
          <li>Accessories</li>
        </ul>
      </div>
      <div className="w-full  flex flex-col items-center row-start-2 col-start-1 col-end-3 m-auto mt-8 self-center ">
        <h1 className="font-Irish text-xl md:text-2xl">Follow us At</h1>
        <div className="mt-6 text-white flex gap-2 sm:gap-4">
          <FaXTwitter className="w-14 h-5 md:h-7"/>
          <FaFacebook className="w-14 h-5 md:h-7"/>
          <FaInstagram className="w-14 h-5 md:h-7"/>
          <FaTiktok className="w-14 h-5 md:h-7"/>
        </div>
      </div>
      <div className="w-full  flex flex-col items-center max-xs:mt-8 ">
        <h1 className="font-Irish text-xl md:text-2xl ">Lumine</h1>
        <ul className="list-none text-base sm:text-xl lg:text-2xl mt-4">
          <li>About Us</li>
          <li>Become a Retailer</li>
          <li>Contact Us</li>
          <li>Blog</li>
          <li>Terms & Conditions</li>
        </ul>
      </div>
    </div>
  )
}

export default Footer