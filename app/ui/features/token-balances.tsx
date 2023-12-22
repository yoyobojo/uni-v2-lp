import { useBalances } from "@/hooks/balances"
import { IListItem, List } from "@/ui/components/list"
import { getAddressBySymbol, getToken } from "@/utils/helpers";

export const TokenBalances = () => {
  const { ethBalance, usdcBalance, wethBalance, balancesLoading, lpBalance } = useBalances();

  const renderList = () => {
    return {
      tokens: [
      {
        label: 'ETH',
        address: getAddressBySymbol('eth'),
        value: ethBalance?.formatted
      },
      {
        label: 'WETH',
        address: getAddressBySymbol('weth'),
        value: wethBalance?.formatted
      },
      {
        label: 'USDC',
        address: getAddressBySymbol('usdc'),
        value: usdcBalance?.formatted
      },
    ],
    positions: [
      {
        label: 'USDC/WETH LP',
        value: lpBalance?.formatted
      }
    ]
  }
  }

  return (
    <div className="flex flex-col w-full gap-3">
      <div>
      <span className="italic">Tokens</span>
    <List items={renderList().tokens} loading={balancesLoading} />
    </div>
      <div>
    <span className="italic">Liquidity Positions</span>
    <List items={renderList().positions} loading={balancesLoading} />
    </div>
    </div>
  )
}