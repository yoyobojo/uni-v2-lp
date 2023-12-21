import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import "react-toastify/dist/ReactToastify.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Uniswap V2 LP",
  description:
    "Easily add liquidity to the Uniswap V2 WETH/USDC LP and see all your token balances.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
        <ToastContainer />
      </body>
    </html>
  );
}
