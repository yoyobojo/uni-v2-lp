import { DECIMAL_CACHE, DEFAULT_CHAIN_ID, SYMBOL_CACHE, TOKENS } from "./constants";
import { getNetwork, readContract } from '@wagmi/core'
import { getAddress, isAddress, zeroAddress } from "viem";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { erc20ABI } from "wagmi";
import { IAddress, IToken } from "./types";

// Web3
export function getChainId() {
  return getNetwork().chain?.id || DEFAULT_CHAIN_ID;
}

export function getProviderByChainId (chainId = DEFAULT_CHAIN_ID) {
  switch (chainId) {
    case 11155111:
      return alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY ?? "" });
    default:
      return alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY ?? "" })
  }
}

export function getTokensByChainId (chainId = DEFAULT_CHAIN_ID) {
  return TOKENS.filter((el) => el.chainId === (chainId ? chainId : getChainId()));
}

export function sortTokensBySymbol (a: IToken, b: IToken) {
  const textA = a.symbol.toUpperCase();
  const textB = b.symbol.toUpperCase();
  return textA < textB ? -1 : textA > textB ? 1 : 0;
};

export function sortTokensByBalance (a: IToken, b: IToken) {
  const balanceA = Number(a?.balance);
  const balanceB = Number(b?.balance);
  return balanceB - balanceA;
};
  
  export async function getSymbol(address: string, chainId = DEFAULT_CHAIN_ID) {
      if (!address || !isAddress(address)) return address || '';
      address = getAddress(address);
  
      if (address === zeroAddress) {
          return 'ETH';
      }
      // If cached, return symbol
      if (SYMBOL_CACHE?.[chainId]?.[address]) return SYMBOL_CACHE[chainId][address];

      // If in token list, return symbol
      const match = getTokensByChainId(chainId).find(
          (v) => v?.address?.toLowerCase() === address?.toLowerCase(),
      );
      if (match) return match.symbol;

      // Fallback: query the blockchain
        try {
          const symbol = await readContract({
            address: address as IAddress,
            abi: erc20ABI,
            functionName: 'symbol'
          });
          if (symbol) {
            if (!SYMBOL_CACHE?.[chainId]?.[address]) SYMBOL_CACHE[chainId][address] = symbol;
            return symbol
          }
          return "N/A"
        } catch (e) {
          console.error("#getSymbol:", e);
          return "N/A";
        }
  }

  export async function getDecimals(address: string, chainId = DEFAULT_CHAIN_ID) {
    if (!address || !isAddress(address)) return 18;
    address = getAddress(address);

    if (address === zeroAddress) {
        return 18;
    }
    // If cached, return decimals
    if (DECIMAL_CACHE?.[chainId]?.[address]) return DECIMAL_CACHE[chainId][address];

    // If in token list, return decimal
    const match = getTokensByChainId(chainId).find(
        (v) => v?.address?.toLowerCase() === address?.toLowerCase(),
    );
    if (match) return match.decimals;

    // Fallback: query the blockchain
      try {
        const decimals = await readContract({
          address: address as IAddress,
          abi: erc20ABI,
          functionName: 'decimals'
        });
        if (decimals) {
          if (!DECIMAL_CACHE?.[chainId]?.[address]) DECIMAL_CACHE[chainId][address] = decimals;
          return decimals
        }
        return 18
      } catch (e) {
        console.error("#getDecimals:", e);
        return 18;
      }
}