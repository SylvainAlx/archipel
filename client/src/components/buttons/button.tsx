/* eslint-disable react-hooks/exhaustive-deps */
import { MouseEventHandler } from "react";

export interface ButtonProps {
  type?: "button" | "submit";
  text: string;
  bgColor?: string;
  disabled?: boolean;
  children?: JSX.Element;
  click?: MouseEventHandler<HTMLButtonElement>;
  keyDown?: React.KeyboardEventHandler;
}

export default function Button({
  type,
  text,
  bgColor,
  disabled,
  children,
  click,
  keyDown,
}: ButtonProps) {
  return (
    <button
      disabled={disabled != undefined && disabled && disabled}
      type={type != undefined ? type : "button"}
      className={`overflow-hidden ${disabled ? "bg-complementary2" : bgColor ? bgColor : "bg-secondary"} ${!disabled && "hover:text-primary hover:bg-light"} animate-fadeIn w-full max-w-[300px] min-h-[30px] flex justify-center items-center gap-2 rounded shadow-md py-2 px-4 transition-all duration-300`}
      onClick={click && click}
      onKeyDown={keyDown && keyDown}
    >
      {children}
      {text != "" && <span>{text}</span>}
    </button>
  );
}
