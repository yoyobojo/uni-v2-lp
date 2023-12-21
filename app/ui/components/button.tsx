import { MouseEventHandler, ReactNode } from "react"

type IButton = {
  children?: ReactNode | string;
  type?: 'primary' | 'secondary' | 'outline';
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export const Button = ({ children, onClick, type }: IButton) => {
  const styles = () => {
    const base = "px-4 py-2 rounded border";
    let custom = "";
    switch (type) {
      case 'outline': {
        custom = "border";
        break;
      }
      case 'secondary': {
        custom = "border-transparent bg-gray-800 text-white";
        break;
      }
      default: {
        custom = "border-transparent bg-indigo-700 text-white";
        break;
      }
    }
    return [base, custom].join(" ");
  }

  return (
    <button onClick={onClick} className={styles()}>
      {children}
    </button>
  )
}