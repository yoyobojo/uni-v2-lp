import { configureChains, createConfig, sepolia, mainnet } from "wagmi";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const walletChain = process.env.NEXT_PUBLIC_CHAIN_ID === "11155111" ? sepolia : mainnet;
const { chains: walletChains, publicClient, webSocketPublicClient } = configureChains(
  [walletChain],
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
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export {
  walletChain,
  walletConfig,
  walletChains
}