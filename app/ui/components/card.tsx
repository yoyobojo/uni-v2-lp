import { ReactNode } from "react"

type ICard = {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className }: ICard) => {
  return (
    <div className={[
      className ?? "",
      "bg-gray-300",
      "p-2.5 md:p-3 md:py-4 lg:px-4",
      "rounded"
    ].join(" ")}>
      {children}
    </div>
  )
}