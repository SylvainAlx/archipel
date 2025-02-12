import { MouseEventHandler, useState } from "react";
import HoverInfo from "../hoverInfo";

export interface TagProps {
  text: string;
  hover: string;
  bgColor?: string;
  textColor?: string;
  textStyle?: string;
  children?: JSX.Element;
  click?: MouseEventHandler<HTMLDivElement>;
}

export default function Tag({
  text,
  hover,
  bgColor,
  textColor,
  textStyle,
  children,
  click,
}: TagProps) {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <div
      onMouseEnter={() => setShowInfo(true)}
      onMouseLeave={() => setShowInfo(false)}
      onClick={click && click}
      className={`relative min-h-[30px] py-1 px-2 rounded-md text-sm flex items-center gap-1 ${bgColor && bgColor} ${textStyle && textStyle} ${textColor && textColor} shadow-md ${click ? "cursor-pointer hover:bg-secondary transition-all" : "cursor-default"}`}
    >
      {children}
      {showInfo && hover != "" && <HoverInfo text={hover} />}
      {text}
    </div>
  );
}
