"use client"

import { Wrapper } from "@/ui/base/wrapper";
import { PairInput } from "@/ui/features/pair-input";
import { TokenBalances } from "@/ui/features/token-balances";
import { getAddressBySymbol, getSymbol } from "@/utils/helpers";
import { Button } from "@/ui/components/button";
import { Card } from "@/ui/components/card";
import { useLiquidity } from "./hooks/liquidity";
import { parseEther, parseUnits } from "viem";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Home = () => {
  const { address } = useAccount();
  const weth = getAddressBySymbol("weth");
  const usdc = getAddressBySymbol("usdc");
  const liquidityProps = useLiquidity({ tokenA: usdc, tokenB: weth });

  return (
    <Wrapper>
      {!address ? (
        <div className="w-full h-full flex items-center justify-center">
        <ConnectButton />
        </div>
      ) : (
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
            {...liquidityProps}
          />

          {liquidityProps.approveEnoughA && liquidityProps.approveEnoughB ? (
            <Button
              onClick={liquidityProps.addLiquidity}
              loading={liquidityProps.loading.deposit}
            >
              Deposit
            </Button>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Button 
                onClick={() => liquidityProps.approveToken('a')}
                disabled={liquidityProps.approveEnoughA || !liquidityProps.inputA}
                loading={liquidityProps.loading.tokenA}
              >
                {!liquidityProps.approveEnoughA || liquidityProps.approved.tokenB === BigInt(0) ? 'Approve USDC' : 'Approved USDC'}
              </Button>
              <Button 
                onClick={() => liquidityProps.approveToken('b')}
                disabled={liquidityProps.approveEnoughB || !liquidityProps.inputB}
                loading={liquidityProps.loading.tokenB}
              >
                {!liquidityProps.approveEnoughB || liquidityProps.approved.tokenB === BigInt(0) ? 'Approve WETH' : 'Approved WETH'}
              </Button>
            </div>
          )}
        </Card>
      </div>
      )}
    </Wrapper>
  );
};

export default Home;
