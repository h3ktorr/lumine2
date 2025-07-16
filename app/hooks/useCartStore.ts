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

const useStore = create<CartState>((set) => ({
  cart: [],
  isLoading: true,
  counter: 0,
  getCart: async (wixClient) => {},
  addItem: async (wixClient) => {},
  removeItem: async (wixClient) => {},
}));
