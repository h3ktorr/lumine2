'use client'

import Image from "next/image";
import { Plus, Minus, Trash2 } from "@deemlol/next-icons";
import { media as wixMedia } from "@wix/sdk";
import { useCartStore } from "@/app/hooks/useCartStore";
import { useWixClient } from "@/app/hooks/useWixClient";
import { useEffect, useState } from "react";
import type { cart } from "@wix/ecom";

interface CartItemProps {
  item: cart.LineItem;
  isLoading: boolean;
}

// 👇 Individual Cart Item Component
const CartItem: React.FC<CartItemProps>  = ({ item, isLoading }) => {
  const [variantSize, setVariantSize] = useState<string | null>(null);
  const wixClient = useWixClient();
  const { removeItem, updateItemQuantity } = useCartStore();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    updateItemQuantity(wixClient, item._id!, newQuantity);
  };

  useEffect(() => {
    const fetchVariant = async () => {
      try {
        const product = await wixClient.products.getProduct(
          item.catalogReference!.catalogItemId!
        );

        const foundVariant = product.product!.variants?.find(
          (v) => v._id === item.catalogReference!.options?.variantId
        );

        setVariantSize(foundVariant?.choices?.Size || null);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    fetchVariant();
  }, [item.catalogReference, wixClient]);

  return (
    <div className="flex border-b-2 border-black py-1" key={item._id}>
      {/* Image */}
      <div className="relative min-w-20 h-20 sm:w-24 sm:h-24">
        {item.image && (
          <Image
            src={wixMedia.getScaledToFillImageUrl(item.image, 96, 96, {})}
            alt=""
            fill
            style={{ objectFit: "cover" }}
          />
        )}
      </div>

      {/* Product Info */}
      <div className="ml-4 flex flex-col py-2 px-0 font-Jomolhari text-[.8rem] sm:text-base mr-2">
        <p className="text-[.8rem] sm:hidden">
          {/* Show only first 3 words on small screens */}
          {item.productName?.original
            ?.split(" ")
            .slice(0, 3)
            .join(" ")}
        </p>

        <p className="hidden sm:block text-[.8rem] sm:text-base">
          {/* Show full name on screens ≥ sm */}
          {item.productName?.original}
        </p>
        <p>{variantSize ?? "Loading..."}</p>

        {/* Quantity Controls */}
        <div className="flex mt-auto items-center">
          <Minus 
            size={15} 
            color="#000" 
            className="mr-1.5 cursor-pointer" 
            onClick={() => handleQuantityChange(item.quantity! - 1)} 
          />
          <p className="mr-1.5">{item.quantity}</p>
          <Plus 
            size={15} 
            color="#000" 
            className="mr-1.5 cursor-pointer" 
            onClick={() => handleQuantityChange(item.quantity! + 1)}
          />
        </div>
      </div>

      {/* Price & Remove */}
      <div className="ml-auto flex flex-col justify-between py-2 px-0 font-Jomolhari text-[.8rem] sm:text-base">
        <p>${item.quantity! * Number(item.price?.amount) }</p>
        <Trash2
          size={20}
          color="#000"
          style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
          onClick={() => removeItem(wixClient, item._id!)}
        />
      </div>
    </div>
  );
};

// 👇 Main Cart Items Wrapper
const Cart_items = () => {
  const { cart, isLoading } = useCartStore();

  return (
    <div className="mt-8">
      {!cart.lineItems || cart.lineItems.length === 0 ? (
        <div>Cart is empty</div>
      ) : (
        cart.lineItems.map((item) => (
          <CartItem
            key={item._id}
            item={item}
            isLoading={isLoading}
          />
        ))
      )}
    </div>
  );
};

export default Cart_items;
