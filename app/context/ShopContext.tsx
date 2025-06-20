'use client'

import React, { createContext, ReactNode, useState } from "react";

type ShopContextType = {
 isCartOpen: boolean;
 openCart: () => void;
 closeCart: () => void;
};

export const ShopContext = createContext<ShopContextType | null>(null);

type ShopContextProviderProps = {
 children: ReactNode;
};
const ShopContextProvider: React.FC<ShopContextProviderProps> = ({ children }) => {
 const [isCartOpen, setIsCartOpen] = useState(true);

 const openCart = () => {
  setIsCartOpen(true);
 }

 const closeCart = () => {
   setIsCartOpen(false)
 }

 const contextValue = {
  isCartOpen,
  openCart,
  closeCart,
 }

 return (
  <ShopContext.Provider value={contextValue}>
  {children}
  </ShopContext.Provider>
 )
}

export default ShopContextProvider;