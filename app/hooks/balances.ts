"use client";

import { useAccount, useBalance } from "wagmi"
import { getAddressBySymbol } from "@/utils/helpers";
import { DEFAULT_CHAIN_ID } from "@/utils/constants";

export const useBalances = () => {
  const { address } = useAccount();
  const { data: ethBalance, isLoading: ethLoading } = useBalance({ address, chainId: DEFAULT_CHAIN_ID, watch: true });
  const { data: wethBalance, isLoading: wethLoading } = useBalance({ address, chainId: DEFAULT_CHAIN_ID, watch: true, token: getAddressBySymbol("weth") });
  const { data: usdcBalance, isLoading: usdcLoading } = useBalance({ address, chainId: DEFAULT_CHAIN_ID, watch: true, token: getAddressBySymbol("usdc") });

  return {
    ethBalance,
    wethBalance,
    usdcBalance,
    balancesLoading: ethLoading || wethLoading || usdcLoading
  }
}