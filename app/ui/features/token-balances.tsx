import { useBalances } from "@/hooks/balances"
import { IListItem, List } from "@/ui/components/list"

export const TokenBalances = () => {
  const { ethBalance, usdcBalance, wethBalance, balancesLoading, lpBalance } = useBalances();

  const renderList = (): IListItem[] => {
    return [
      {
        label: 'ETH',
        value: ethBalance?.formatted
      },
      {
        label: 'WETH',
        value: wethBalance?.formatted
      },
      {
        label: 'USDC',
        value: usdcBalance?.formatted
      },
      {
        label: 'USDC/WETH LP',
        value: lpBalance?.formatted
      }
    ]
  }

  return (
    <List items={renderList()} loading={balancesLoading} />
  )
}