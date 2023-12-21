export type IToken = {
  chainId: number;
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
  extensions?: {
      bridgeInfo: Record<string, { tokenAddress: string }>;
  };
  balance?: string;
};

export type IAddress = `0x${string}`