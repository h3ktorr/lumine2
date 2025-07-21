"use client";

import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { currentCart } from "@wix/ecom";
import Cookie from "js-cookie";
import { createContext, useEffect, useState, ReactNode } from "react";

export type WixClient = ReturnType<typeof createClient>;

export const WixClientContext = createContext<WixClient | null>(null);

export const WixClientContextProvider = ({ children }: { children: ReactNode }) => {
  const [wixClient, setWixClient] = useState<WixClient | null>(null);

  useEffect(() => {
    const refreshToken = JSON.parse(Cookie.get("refreshToken") || "{}");

    const client = createClient({
      modules: {
        products,
        collections,
        currentCart,
      },
      auth: OAuthStrategy({
        clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
        tokens: {
          refreshToken,
          accessToken: { value: "", expiresAt: 0 },
        },
      }),
    });

    setWixClient(client);
  }, []);

  if (!wixClient) return null; // or loading spinner

  return (
    <WixClientContext.Provider value={wixClient}>
      {children}
    </WixClientContext.Provider>
  );
};
