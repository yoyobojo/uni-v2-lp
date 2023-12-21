import { IAddress } from "@/utils/types"
import { CoinInput } from "./token-input"
import { useInput } from "@/hooks/input";

type ICoinInput = {
  tokenA: IAddress;
  tokenB: IAddress;
}

export const PairInput = ({ tokenA, tokenB }: ICoinInput) => {
  const { input: inputA, setInput: setInputA, handleChange: handleChangeA } = useInput();
  const { input: inputB, setInput: setInputB, handleChange: handleChangeB } = useInput();
  return (
    <div className="flex flex-col gap-2">
    <CoinInput token={tokenA} value={inputA} setValue={setInputA} onChange={handleChangeA} />
    <CoinInput token={tokenB} value={inputB} setValue={setInputB} onChange={handleChangeB} />
    </div>
  )
}