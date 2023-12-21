import { ConnectButton } from "@rainbow-me/rainbowkit"

export const Navbar = () => {
  return (
    <div className="flex items-center justify-between">
      <h4>Uniswap V2 LP</h4>
      <ConnectButton
            showBalance={false}
            accountStatus="address"
            label="Connect"
          />
    </div>
  )
}