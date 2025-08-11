"use client";

import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { currentCart } from "@wix/ecom";
import Cookie from "js-cookie";

const wixSingleton = (() => {
  let instance: ReturnType<typeof init>;

  const init = () => {
    return createClient({
      modules: {
        products,
        collections,
        currentCart,
      },
      auth: OAuthStrategy({
        clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
        tokens: {
          refreshToken: JSON.parse(Cookie.get("refreshToken") || "{}"),
          accessToken: { value: "", expiresAt: 0 },
        },
      }),
    });
  }
  return {
    getInstance: () => {
      if (!instance) {
        instance = init();
      }
      return instance;
    },
  };
})();

export const getWixClient = () => wixSingleton.getInstance();