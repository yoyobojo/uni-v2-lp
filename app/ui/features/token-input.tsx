import { getToken } from "@/utils/helpers";
import { IAddress } from "@/utils/types"
import { ChangeEventHandler, Dispatch, SetStateAction } from "react";
import { TokenDisplay } from "@/ui/components/token";

type ICoinInput = {
  token: IAddress;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  max?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
}

export const CoinInput = ({ token, value, setValue, onChange, max, disabled }: ICoinInput) => {
  return (
    <div className="flex flex-col">
      <span></span>
      <div className="flex items-center gap-2">
        <div className="flex-grow">
          <input 
            value={value}
            onChange={onChange}
            className="w-full p-2 rounded"
            disabled={disabled}
          />
        </div>
        <TokenDisplay token={token} />
      </div>
      {max && <span>{max}</span>}
    </div>
  )
}