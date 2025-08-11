import { create } from "zustand";
import { currentCart } from "@wix/ecom";
import { WixClient } from "@/app/provider/clientProvider";
import { ecom } from "@wix/site-ecom";

type CartState = {
  cart: currentCart.Cart;
  isLoading: boolean;
  counter: number;
  getCart: (wixClient: WixClient) => {};
  addItem: (
    wixClient: WixClient,
    productId: string,
    variantId: string,
    quantity: number
  ) => {};
  removeItem: (wixClient: WixClient, itemId: string) => {};
};

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  isLoading: true,
  counter: 0,
  getCart: async (wixClient) => {
    const cart = await wixClient.currentCart.getCurrentCart();
    set({
      cart: cart || [],
      isLoading: false,
      counter: cart?.lineItems?.length || 0,
    });
  },
  addItem: async (wixClient, productId, variantId, quantity) => {
    set((state) => ({ ...state, isLoading: true }));
    try {
      const response = await wixClient.currentCart.addToCurrentCart({
        lineItems: [
          {
            catalogReference: {
              appId: process.env.NEXT_PUBLIC_WIX_APP_ID!,
              catalogItemId: productId,
              ...(variantId && { options: { variantId } }),
            },
            quantity: quantity | 1,
          },
        ],
      });
      set({
        cart: response.cart,
        counter: response.cart?.lineItems?.length,
        isLoading: false,
      });
      await ecom.refreshCart();
    } catch (error) {
      console.log(error);
    }
  },
  removeItem: async (wixClient, productId) => {
    set((state) => ({ ...state, isLoading: true }));
    try {
      const response =
        await wixClient.currentCart.removeLineItemsFromCurrentCart([productId]);
      set({
        cart: response.cart,
        counter: response.cart?.lineItems?.length,
        isLoading: false,
      });
      await ecom.refreshCart();
    } catch (error) {
      console.log(error);
    }
  },
}));

/*
import { create } from "zustand";
// import { WixClient } from "@/app/provider/clientProvider";
import { ecom } from "@wix/site-ecom";
import { currentCart, cart } from "@wix/ecom";

import { createClient, OAuthStrategy } from "@wix/sdk";
import Cookie from "js-cookie";

const wixClient = createClient({
  modules: {
    cart,
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

type CartState = {
  cart: currentCart.Cart
  isLoading: boolean;
  counter: number;
  getCart: () => {};
  addItem: (productId: string) => {};
  removeItem: ( itemId: string) => {};
};

export const useCartStore = create<CartState>((set) => ({
  isLoading: true,
  counter: 0,
  getCart: async () => {
    const cart = await wixClient.currentCart.getCurrentCart();
    set({
      cart: cart,
      isLoading: false,
      counter: cart?.lineItems?.length || 0,
    });
  },
  addItem: async (productId) => {
    set((state) => ({ ...state, isLoading: true }));
    try {
      const response = await wixClient.currentCart.addToCurrentCart({
        lineItems: [
          {
            catalogReference: {
              appId: process.env.NEXT_PUBLIC_WIX_APP_ID!,
              catalogItemId: productId,
            },
            quantity: 1,
          },
        ],
      });
      set({
        cart: response.cart,
        counter: response.cart?.lineItems?.length,
        isLoading: false,
      });
      await ecom.refreshCart();
    } catch (error) {
      console.log(error);
    }
  },
  removeItem: async (wixClient, productId) => {
    set((state) => ({ ...state, isLoading: true }));
    try {
      const response =
        await wixClient.currentCart.removeLineItemsFromCurrentCart([productId]);
      set({
        cart: response.cart,
        counter: response.cart?.lineItems?.length,
        isLoading: false,
      });
      await ecom.refreshCart();
    } catch (error) {
      console.log(error);
    }
  },
}));
*/
