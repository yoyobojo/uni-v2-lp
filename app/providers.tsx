"use client";

import { ReactNode } from "react";
import { WagmiConfig } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { walletChains, walletConfig } from "./config/wallet";

const Providers = ({ children }: { children: ReactNode }) => (
  <WagmiConfig config={walletConfig}>
    <RainbowKitProvider chains={walletChains}>{children}</RainbowKitProvider>
  </WagmiConfig>
);

export { Providers };
