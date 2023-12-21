"use client";

import { useAccount, useBalance } from "wagmi"
import { getAddressBySymbol } from "@/utils/helpers";
import { DEFAULT_CHAIN_ID, UNI_V2_USDC_WETH } from "@/utils/constants";

export const useBalances = () => {
  const { address } = useAccount();
  const { data: ethBalance, isLoading: ethLoading } = useBalance({ address, chainId: DEFAULT_CHAIN_ID, watch: true });
  const { data: wethBalance, isLoading: wethLoading } = useBalance({ address, chainId: DEFAULT_CHAIN_ID, watch: true, token: getAddressBySymbol("weth") });
  const { data: usdcBalance, isLoading: usdcLoading } = useBalance({ address, chainId: DEFAULT_CHAIN_ID, watch: true, token: getAddressBySymbol("usdc") });
  const { data: lpBalance, isLoading: lpLoading } = useBalance({ address, chainId: DEFAULT_CHAIN_ID, watch: true, token: UNI_V2_USDC_WETH });

  return {
    ethBalance,
    wethBalance,
    usdcBalance,
    balancesLoading: ethLoading || wethLoading || usdcLoading || lpLoading,
    lpBalance
  }
}