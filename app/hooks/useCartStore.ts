import { create } from "zustand";
import { currentCart } from "@wix/ecom";
import { WixClient } from "../context/wixContext";

type CartState = {
  cart: currentCart.Cart;
  isLoading: boolean;
  counter: number;
  getCart: (wixClient: WixClient) => {};
  addItem: (
    wixClient: WixClient,
    productId: string,
    varientId: string,
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
  addItem: async (wixClient) => {},
  removeItem: async (wixClient) => {},
}));
