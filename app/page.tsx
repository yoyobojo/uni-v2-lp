"use client"

import { Wrapper } from "@/ui/base/wrapper";
import { PairInput } from "@/ui/features/pair-input";
import { TokenBalances } from "@/ui/features/token-balances";
import { getAddressBySymbol } from "@/utils/helpers";
import { Button } from "@/ui/components/button";
import { Card } from "@/ui/components/card";
import { useLiquidity } from "./hooks/liquidity";
import { useAccount } from "wagmi";
import { ConnectButton, useConnectModal } from "@rainbow-me/rainbowkit";

const Home = () => {
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const weth = getAddressBySymbol("weth");
  const usdc = getAddressBySymbol("usdc");
  const liquidityProps = useLiquidity({ tokenA: usdc, tokenB: weth });
  const {
    approveEnoughA,
    approveEnoughB,
    addLiquidity,
    loading,
    approved,
    approveToken,
    inputA,
    inputB,
  } = liquidityProps;

  return (
    <Wrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4 md:gap-6 lg:gap-8">
        <Card title="Wallet Balances">
          <TokenBalances />
        </Card>
        <Card 
          className="md:col-span-2" 
          title="Add Liquidity"
          innerClass="flex flex-col gap-4"
        >
          <PairInput 
            disableB={true}
            disableA={!address}
            {...liquidityProps}
          />

          {((approveEnoughA && approveEnoughB) || !address) ? (
            <Button
              onClick={address ? addLiquidity : openConnectModal}
              loading={loading.deposit}
            >
              {address ? 'Deposit' : 'Connect Wallet'}
            </Button>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Button 
                onClick={() => approveToken('a')}
                disabled={approveEnoughA || !inputA}
                loading={loading.tokenA}
              >
                {!approveEnoughA || approved.tokenB === BigInt(0) ? 'Approve USDC' : 'Approved USDC'}
              </Button>
              <Button 
                onClick={() => approveToken('b')}
                disabled={approveEnoughB || !inputB}
                loading={loading.tokenB}
              >
                {!approveEnoughB || approved.tokenB === BigInt(0) ? 'Approve WETH' : 'Approved WETH'}
              </Button>
            </div>
          )}
        </Card>
      </div>
    </Wrapper>
  );
};

export default Home;
