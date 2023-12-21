export type IListItem = {
  label: string;
  value?: string | number;
}

type IList = {
  items: IListItem[] | string[];
  loading?: boolean;
}

export const List = ({ items, loading }: IList) => {
  return (
    <ul>
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
            <li key={`list-item-${i}`} className="flex items-center justify-between">
              <span>{el.label}</span>
<span className="font-semibold">{el.value}</span>
            </li>
        )
      })}
    </ul>
  )
}