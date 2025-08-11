"use client";

import { WixClientContext } from "../provider/clientProvider";
import { useContext } from "react";

export const useWixClient = () => {
  const client = useContext(WixClientContext);
  if (!client) throw new Error("Wix client not initialized");
  return client;
};
