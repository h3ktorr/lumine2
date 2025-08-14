import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { currentCart } from "@wix/ecom";
import { members } from "@wix/members";
// import { cookies } from "next/headers";
import Cookies from "js-cookie";

export const wixClientServer = async() => {
 let refreshToken

 try {
  // const cookieStore = await cookies();
  refreshToken = JSON.parse(Cookies.get("refreshToken") || "{}");
 } catch (error) {
  console.log(error);
 }

 const wixClient = createClient({
   modules: {
     products,
     collections,
     currentCart,
     members
   },
   auth: OAuthStrategy({
     clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
     tokens: {
       refreshToken,
       accessToken: { value: "", expiresAt: 0 },
     },
   }),
 });
 return wixClient;
}