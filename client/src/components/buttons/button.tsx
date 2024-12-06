/* eslint-disable react-hooks/exhaustive-deps */
import { MouseEventHandler, useState } from "react";

export interface ButtonProps {
  type?: "button" | "submit";
  text: string;
  bgColor?: string;
  disabled?: boolean;
  children?: JSX.Element;
  widthFull?: boolean;
  click?: MouseEventHandler<HTMLButtonElement>;
  keyDown?: React.KeyboardEventHandler;
}

export default function Button({
  type,
  text,
  bgColor,
  disabled,
  children,
  widthFull,
  click,
  keyDown,
}: ButtonProps) {
  const [hover, setHover] = useState(false);
  return (
    <button
      disabled={disabled != undefined && disabled && disabled}
      type={type != undefined ? type : "button"}
      className={`overflow-hidden ${disabled ? "bg-complementary2 cursor-not-allowed" : bgColor ? bgColor : "bg-gradient-to-r from-secondary2 to-secondary"} ${bgColor === "bg-danger" && "hover:bg-wait"} ${bgColor === "bg-wait" && "hover:bg-danger"} ${!disabled && "hover:bg-gradient-to-br"} bold animate-fadeIn ${widthFull ? "md:w-full" : "md:w-max"} w-full max-w-[300px] min-h-[20px] flex justify-center items-center gap-2 shadow-md py-1 px-4 transition-all duration-300 rounded-full`}
      onClick={click && click}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onKeyDown={keyDown && keyDown}
    >
      <div className={`text-xl ${hover && "animate-jump"}`}>{children}</div>
      {text != "" && <span>{text.toLowerCase()}</span>}
    </button>
  );
}
