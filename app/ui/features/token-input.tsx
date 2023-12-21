import { getToken } from "@/utils/helpers";
import { IAddress } from "@/utils/types"
import { ChangeEventHandler, Dispatch, SetStateAction } from "react";
import { TokenDisplay } from "@/ui/components/token";

type ICoinInput = {
  token: IAddress;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  max?: string;
  onChange: ChangeEventHandler<HTMLInputElement>
}

export const CoinInput = ({ token, value, setValue, onChange, max }: ICoinInput) => {
  const tokenDetails = getToken(token);
  return (
    <div className="flex flex-col">
      <span></span>
      <div className="flex items-center gap-2">
        <TokenDisplay token={token} />
        <input 
          value={value}
          onChange={onChange}
        />
      </div>
      {max && <span>{max}</span>}
    </div>
  )
}