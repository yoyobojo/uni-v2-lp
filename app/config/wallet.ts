import { configureChains, createConfig } from "wagmi";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { mainnet, goerli } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const chain = process.env.NEXT_PUBLIC_CHAIN_ID === "11155111" ? goerli : mainnet;
const { chains: walletChains, publicClient, webSocketPublicClient } = configureChains(
  [chain],
  [
    alchemyProvider({
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY ?? "",
    }),
    publicProvider(),
  ],
);
const { connectors } = getDefaultWallets({
  appName: "Easy Uniswap V2 LP",
  projectId: process.env.NEXT_PUBLIC_RAINBOWKIT_PROJECT_ID ?? "",
  chains: walletChains,
});
const walletConfig = createConfig({
  autoConnect: false,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export {
  walletConfig,
  walletChains
}