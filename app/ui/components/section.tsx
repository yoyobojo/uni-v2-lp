import { ReactNode } from "react"

type ISection = {
  children: ReactNode;
  color?: `bg-${string}`;
  width?: `max-w-${string}` | `w-${string}`;
}

export const Section = ({ children, color, width }: ISection) => {
  return (
    <div className={`${color ?? "bg-gray-100"}`}>
      <div className={`${width ?? ""} mx-auto`}>
        {children}
      </div>
    </div>
  )
}