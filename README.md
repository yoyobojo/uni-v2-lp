<div align="center">

  <h3 align="center">Uniswap V2 USDC/WETH LP | Add Liquidity</h3>

  <p align="center">
    Simple UI where you can add liquidity to Uniswap's V2 USDC/WETH pool
    <br />
    <a href="https://uni-v2-lp.vercel.app/"><strong>View Demo »</strong></a>
    <br />
  </p>
</div>


### Built With

* Next.js
* Wagmi
* Viem
* TailwindCSS



## Getting Started

Mainnet
1. Run `yarn` (if haven't already)
2. Run `yarn dev`

Forknet
1. Run a forked mainnet node targeting Chain ID 1 (Recommended: Use [anvil](https://book.getfoundry.sh/getting-started/installation) with `anvil --fork-url <mainnet-rpc-url>`)
2. Run `yarn` (if haven't already)
3. Run `yarn dev:local`
4. Confirm your localhost network in your wallet provider is set to: 
  - RPC URL: http://localhost:8545 
  - Chain ID: 1


## Directory

```bash
├── app
│   ├── abis            # smart contract ABIs
│   ├── config          # wallet and react-toastify config
│   ├── hooks           # this is where the magic happens
│   ├── ui              # UI functional components
│   ├── utils           # utilities
│   ├── ...             
│   ├── layout.tsx      # rendering metadata
│   ├── page.tsx        # render home page
│   └── providers.tsx   # global app contexts
├── public
├── ...
└── yarn.lock
```


<!-- ROADMAP -->
## Roadmap

- [ ] Add removeLiquidity
- [ ] Optimize toast notifications

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.