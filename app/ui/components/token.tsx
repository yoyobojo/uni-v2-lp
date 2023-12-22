import { getToken } from "@/utils/helpers";
import { IAddress } from "@/utils/types"

type ITokenDisplay = {
  token: IAddress;
}

export const TokenDisplay = ({ token }: ITokenDisplay) => {
  const tokenDetails = getToken(token);
  return (
    <div className="flex gap-1 items-center">
      <img src={tokenDetails?.logoURI ?? ""} alt="" height="26" width="26" />
      <span>{tokenDetails?.symbol}</span>
    </div>

  )
}