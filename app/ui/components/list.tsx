import { IAddress } from "@/utils/types";
import { TokenDisplay } from "./token";
import { fixNumber } from "@/utils/helpers";

export type IListItem = {
  label: string;
  value?: string | number;
  address?: IAddress
}

type IList = {
  items: IListItem[] | string[];
  loading?: boolean;
}

export const List = ({ items, loading }: IList) => {
  return (
    <ul className="divide divide-y divide-gray-400 space-y-1">
      {!loading && items.map((el, i) => {
        // If list is just string
        if(typeof el === 'string') {
          return (
            <li key={`list-item-${i}`}>
              {el}
            </li>
          )
        }
        // If list items have props label and value
        return (
            <li key={`list-item-${i}`} className="flex items-center justify-between pt-1">
              {el.address ? (
                <TokenDisplay token={el.address} />
              ) : (
                <span>{el.label}</span>

              )}
<span className="font-semibold">{el?.value ? String(el.value).slice(0, 15) : '0.0'}</span>
            </li>
        )
      })}
    </ul>
  )
}