import { MouseEventHandler, ReactNode } from "react"
import { ImSpinner8 } from "react-icons/im";

type IButton = {
  children?: ReactNode | string;
  type?: 'primary' | 'secondary' | 'outline';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  loading?: boolean;
}

export const Button = ({ children, onClick, type, disabled, loading }: IButton) => {
  const styles = () => {
    const base = "px-4 py-2 rounded border disabled:opacity-60 disabled:cursor-not-allowed";
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
    <button onClick={onClick} className={styles()} disabled={disabled || loading}>
      <div className="flex items-center gap-1 justify-center">
        <span>{children}</span>
        {loading && <span className="animate-spin"><ImSpinner8 /></span>}
      </div>
    </button>
  )
}