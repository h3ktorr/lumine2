'use client'

import React, { createContext, ReactNode, useEffect, useState } from "react";
import sidebar_data from '../components/sidebarData';
import { useWixClient } from "@/app/hooks/useWixClient";
import Cookie from 'js-cookie';
import { products } from '@wix/stores';

export type SidebarLink = {
  link_name: string;
  link_address: string;
};

export type SidebarItem = {
  name: string;
  id: number;
  address: string;
  categoryState: boolean;
  links: SidebarLink[];
};

type ShopContextType = {
 isCartOpen: boolean;
 isSidebarOpen: boolean;
 isAllCollectionsOpen: boolean;
 isLoggedIn: boolean;
 openCart: () => void;
 closeCart: () => void;
 openSidebar: () => void;
 closeSidebar: () => void;
 openAllCollections: () => void;
 handleLogin: () => Promise<void>;
 handleLogout: () => Promise<void>;
 closeAllCollections: () => void;
 sidebarLinks: SidebarItem[];
 allProducts: products.Product[];
 handleCategory: (id: number) => void;
};

export const ShopContext = createContext<ShopContextType | null>(null);

type ShopContextProviderProps = {
 children: ReactNode;
};
const ShopContextProvider: React.FC<ShopContextProviderProps> = ({ children }) => {
 const [isCartOpen, setIsCartOpen] = useState(false);
 const [isSidebarOpen, setIsSidebarOpen] = useState(false);
 const [sidebarLinks, setSidebarLinks] = useState(sidebar_data);
 const [isAllCollectionsOpen, setIsAllCollectionsOpen] = useState(false)
 const [isLoggedIn, setIsLoggedIn] = useState(false);
 const [allProducts, setAllProducts] = useState<products.Product[]>([]);
 
 const wixClient = useWixClient();

 const getAllProducts = async () => {
  try {
    let res = await wixClient.products.queryProducts().limit(100).find();
    let productList: products.Product[] = res.items;

    while (res.hasNext()) {
      res = await res.next();
      productList = [...productList, ...res.items];
    }

    setAllProducts(productList);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
 };

 useEffect(()=>{
  getAllProducts()
 }, [])

 const handleLogin = async() => {
    if(!isLoggedIn){
      const loginRequestData = wixClient.auth.generateOAuthData(
        "http://lumine2-l68m.vercel.app/callback", // Redirect URI
        "http://lumine2-l68m.vercel.app", //Original URI
      );
      
      localStorage.setItem("oAuthRedirectData", JSON.stringify(loginRequestData))
      const {authUrl} = await wixClient.auth.getAuthUrl(loginRequestData)
      window.location.href = authUrl;
    }
  }

  const handleLogout = async() => {
    Cookie.remove("refreshToken")
    const { logoutUrl } = await wixClient.auth.logout(window.location.href);
    window.location.href = logoutUrl;
  }

  useEffect(() => {
    setIsLoggedIn(wixClient.auth.loggedIn());
  }, [wixClient]);

 const openCart = () => {
  setIsCartOpen(true);
 }
 const closeCart = () => {
   setIsCartOpen(false)
 }

 const openSidebar = () => {
  setIsSidebarOpen(true)
 };
 const closeSidebar = () => {
   setIsSidebarOpen(false)
 };

 const openAllCollections = () => {
  setIsAllCollectionsOpen(true);
  
 }
 const closeAllCollections = () => {
  setIsAllCollectionsOpen(false);
 }

 const handleCategory = (id: number) => {
  const updatedLinks = sidebarLinks.map(link => {
    if (link.id === id) {
      return { ...link, categoryState: !link.categoryState };
    }
    return link;
  });
  setSidebarLinks(updatedLinks);  
};

 const contextValue = {
  isCartOpen,
  isSidebarOpen,
  openCart,
  closeCart,
  openSidebar,
  closeSidebar,
  sidebarLinks,
  handleCategory,
  isAllCollectionsOpen,
  openAllCollections,
  closeAllCollections,
  isLoggedIn,
  handleLogin,
  handleLogout,
  allProducts
 }

 return (
  <ShopContext.Provider value={contextValue}>
  {children}
  </ShopContext.Provider>
 )
}

export default ShopContextProvider;