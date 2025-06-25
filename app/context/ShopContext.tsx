'use client'

import React, { createContext, ReactNode, useState } from "react";
import sidebar_data from '../components/sidebarData'

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
 openCart: () => void;
 closeCart: () => void;
 openSidebar: () => void;
 closeSidebar: () => void;
 openAllCollections: () => void;
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
 }

 return (
  <ShopContext.Provider value={contextValue}>
  {children}
  </ShopContext.Provider>
 )
}

export default ShopContextProvider;