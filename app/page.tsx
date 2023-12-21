"use client"

import { Wrapper } from "@/ui/base/wrapper";
import { PairInput } from "@/ui/features/pair-input";
import { TokenBalances } from "@/ui/features/token-balances";
import { getAddressBySymbol } from "@/utils/helpers";
import { Button } from "@/ui/components/button";
import { Card } from "@/ui/components/card";

const Home = () => {
  return (
    <Wrapper>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4 md:gap-6 lg:gap-8">
        <Card>
          <TokenBalances />
        </Card>
        <Card className="md:col-span-2 flex flex-col gap-2">
          <PairInput 
            tokenA={getAddressBySymbol("weth")} 
            tokenB={getAddressBySymbol("usdc")} 
          />
          <Button>Approve</Button>
        </Card>
      </div>
    </Wrapper>
  );
};

export default Home;
