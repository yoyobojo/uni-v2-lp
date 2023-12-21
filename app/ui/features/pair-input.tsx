import { IAddress } from "@/utils/types"
import { CoinInput } from "./token-input"
import { ChangeEventHandler, Dispatch, SetStateAction } from "react";

type ICoinInput = {
  tokenA: IAddress;
  tokenB: IAddress;
  inputA: string;
  inputB: string;
  setInputA: Dispatch<SetStateAction<string>>;
  setInputB:Dispatch<SetStateAction<string>>;
  handleChangeA: ChangeEventHandler<HTMLInputElement>;
  handleChangeB: ChangeEventHandler<HTMLInputElement>;
  disableB?: boolean;
}

export const PairInput = ({ 
  tokenA, 
  tokenB,
  inputA,
  inputB,
  setInputA,
  setInputB,
  handleChangeA,
  handleChangeB,
  disableB
}: ICoinInput) => {
  return (
    <div className="flex flex-col gap-2">
    <CoinInput token={tokenA} value={inputA} setValue={setInputA} onChange={handleChangeA} />
    <div className="flex justify-center">
      <span>+</span>
    </div>
    <CoinInput disabled={disableB} token={tokenB} value={inputB} setValue={setInputB} onChange={handleChangeB} />
    </div>
  )
}