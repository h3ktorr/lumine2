import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ShopContextProvider from "./context/ShopContext";
import Cart from "./components/Cart";

export const metadata: Metadata = {
  title: "Lumine",
  description: "Lumine developed with next js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ShopContextProvider>
        <body
        className={`h-full w-full flex flex-col`}
        >
          <Navbar />
          <Cart />
          {children}
          <Footer />
        </body>
      </ShopContextProvider>
    </html>
  );
}
