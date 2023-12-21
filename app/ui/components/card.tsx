import { ReactNode } from "react"

type ICard = {
  children: ReactNode;
  className?: string;
  title?: string;
  innerClass?: string;
}

export const Card = ({ children, className, title, innerClass }: ICard) => {
  return (
    <div className={[
      className ?? "",
      "bg-gray-300",
      "p-2.5 md:p-3 md:py-4 lg:px-4",
      "rounded",
      "shadow"
    ].join(" ")}>
              {title && <h5 className="font-semibold text-xl mb-3">{title}</h5>}
      <div className={innerClass}>
        {children}
      </div>
    </div>
  )
}