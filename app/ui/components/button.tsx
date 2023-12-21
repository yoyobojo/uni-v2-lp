import { MouseEventHandler, ReactNode } from "react"

type IButton = {
  children?: ReactNode | string;
  type?: 'primary' | 'secondary' | 'outline';
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export const Button = ({ children, onClick, type }: IButton) => {
  const styles = () => {
    const base = "";
    let custom = "";
    switch (type) {
      case 'outline': {
        custom = "";
        break;
      }
      case 'secondary': {
        custom = "";
        break;
      }
      default: {
        custom = "";
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