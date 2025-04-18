import { MouseEventHandler, useState } from "react";

export interface ButtonProps {
  type?: "button" | "submit";
  text: string;
  name?: string;
  bgColor?: string;
  disabled?: boolean;
  // eslint-disable-next-line no-undef
  children?: JSX.Element;
  widthFull?: boolean;
  lowerCase?: boolean;
  click?: MouseEventHandler<HTMLButtonElement>;
  // eslint-disable-next-line no-undef
  keyDown?: React.KeyboardEventHandler;
}

export default function Button({
  type,
  text,
  name,
  bgColor,
  disabled,
  children,
  widthFull,
  lowerCase = true,
  click,
  keyDown,
}: ButtonProps) {
  const [hover, setHover] = useState(false);
  return (
    <button
      disabled={disabled != undefined && disabled && disabled}
      type={type != undefined ? type : "button"}
      name={name ? name : text}
      className={`overflow-hidden ${disabled ? "bg-complementary2 cursor-not-allowed" : bgColor ? bgColor : "bg-gradient-to-r from-secondary2 to-secondary"} ${bgColor === "bg-danger" && !disabled && "hover:bg-wait"} ${bgColor === "bg-wait" && "hover:bg-danger"} ${!disabled && "hover:bg-gradient-to-br"} bold animate-fadeIn ${widthFull ? "md:w-full" : "md:w-max"} w-full max-w-[300px] min-h-[20px] flex justify-center items-center gap-2 py-1 px-4 transition-all duration-300 rounded-full`}
      onClick={click && click}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onKeyDown={keyDown && keyDown}
    >
      <div className={`text-xl ${hover && "animate-jump"}`}>{children}</div>
      {text != "" && <span>{lowerCase ? text.toLowerCase() : text}</span>}
    </button>
  );
}
