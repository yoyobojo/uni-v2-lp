import { IAddress, IToken } from "./types";

// Cache
export const DECIMAL_CACHE: Record<number, Record<string, number>> = {
  1: {},
  11155111: {},
};
export const SYMBOL_CACHE: Record<number, Record<string, string>> = {
  1: {},
  11155111: {},
};

// Web3
export const DEFAULT_CHAIN_ID = 1;
export const TOKENS: IToken[] = require('./token-list.json').tokens;
export const UNI_V2_ROUTER: IAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
export const UNI_V2_USDC_WETH: IAddress = "0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc"
