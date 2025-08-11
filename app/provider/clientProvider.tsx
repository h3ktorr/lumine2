"use client"

import { createContext, ReactNode } from "react";
import { getWixClient } from "../context/wixContext";

const wixClient = getWixClient();

export type WixClient = typeof wixClient;

export const WixClientContext = createContext<WixClient>(wixClient);

export const ClientProvider = (
 { children } : { children: ReactNode}
) => (
 <WixClientContext.Provider value={wixClient}>
  {children}
 </WixClientContext.Provider>
)
