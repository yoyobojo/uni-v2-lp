"use client";

import { useAccount, useBalance } from "wagmi"
import { walletChain } from "../config/wallet";

export const useBalances = () => {
  const { address } = useAccount();
  const { data: ethBalance, isLoading: ethLoading } = useBalance({ address, chainId: walletChain.id, watch: true });
  const { data: wethBalance, isLoading: wethLoading } = useBalance({ address, chainId: walletChain.id, watch: true });
  const { data: usdcBalance, isLoading: usdcLoading } = useBalance({ address, chainId: walletChain.id, watch: true });

  return {
    ethBalance,
    wethBalance,
    usdcBalance,
    balancesLoading: ethLoading || wethLoading || usdcLoading
  }
}