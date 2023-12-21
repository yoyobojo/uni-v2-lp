import { TOKENS } from "./constants";
import { getNetwork } from '@wagmi/core'
import { alchemyProvider } from "wagmi/providers/alchemy";

// Web3
export function getChainId() {
  return getNetwork().chain?.id || 1;
}

export function getProviderByChainId (chainId?: number) {
  switch (chainId) {
    case 11155111:
      return alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY ?? "" });
    default:
      return alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY ?? "" })
  }
}

export const getTokensByChainId = (chainId?: number) =>
    TOKENS.filter((el) => el.chainId === (chainId ? chainId : getChainId()));