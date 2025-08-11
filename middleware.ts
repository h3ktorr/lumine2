import { createClient, OAuthStrategy } from "@wix/sdk";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const requestUrl = request.url;
  requestHeaders.set("x-middleware-request-url", requestUrl);
  const cookies = request.cookies;
  const res = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  if (cookies.get("refreshToken")) {
    return res;
  }
  const wixClient = createClient({
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
    }),
  });
  const token = await wixClient.auth.generateVisitorTokens();
  res.cookies.set("refreshToken", JSON.stringify(token.refreshToken), {
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}

export const config = {
  unstable_allowDynamic: ["/node_modules/lodash/**", "./node_modules/@wix/**"],
};

/*
export const middleware = async (requset: NextRequest) => {
  const cookie = requset.cookies;
  const res = NextResponse.next();

  if (cookie.get("refreshToken")) {
    return res;
  }

  const wixClient = createClient({
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
    }),
  });

  const token = await wixClient.auth.generateVisitorTokens();
  res.cookies.set("refreshToken", JSON.stringify(token.refreshToken), {
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
};
*/
