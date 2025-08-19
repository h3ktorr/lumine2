'use client'

import React, { createContext, ReactNode, useEffect, useState } from "react";
import sidebar_data from '../components/sidebarData';
import { useWixClient } from "../hooks/useWixClient";
import Cookie from 'js-cookie';

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
 
 const wixClient = useWixClient();

 const handleLogin = async() => {
    if(!isLoggedIn){
      const loginRequestData = wixClient.auth.generateOAuthData(
        "http://localhost:3000/callback", // Redirect URI
        "http://localhost:3000", //Original URI
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
 }

 return (
  <ShopContext.Provider value={contextValue}>
  {children}
  </ShopContext.Provider>
 )
}

export default ShopContextProvider;