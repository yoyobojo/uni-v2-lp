import { ReactNode } from "react"

type ISection = {
  children: ReactNode;
  color?: `bg-${string}`;
  width?: `max-w-${string}` | `w-${string}`;
  padding?: `p${string}`;
  className?: string;
}

export const Section = ({ children, color, width, padding, className }: ISection) => {
  return (
    <div className={`${color ?? "bg-gray-100"} ${padding ?? "px-2 py-3 sm:py-4"} ${className ?? ""} w-full`}>
      <div className={`${width ?? ""} mx-auto`}>
        {children}
      </div>
    </div>
  )
}