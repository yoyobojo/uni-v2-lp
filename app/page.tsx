"use client"

import { Wrapper } from "./ui/base/wrapper";
import { TokenBalances } from "./ui/features/token-balances";

const Home = () => {
  return (
    <Wrapper>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="md:col-span-2">
          <TokenBalances />
        </div>
        <div>

        </div>
      </div>
    </Wrapper>
  );
};

export default Home;
