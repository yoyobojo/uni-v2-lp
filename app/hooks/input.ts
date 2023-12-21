import { useState } from "react"

export const useInput = () => {
  const [input, setInput] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { target } = e;
    setInput(target.value);
  }

  function clear() {
    setInput("");
  }

  function handleMax(val: string | number) {
    setInput(String(val));
  }

  return {
    input,
    handleChange,
    clear,
    handleMax,
    setInput
  }
}