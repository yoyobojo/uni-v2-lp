import { IToken } from "./types";

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
