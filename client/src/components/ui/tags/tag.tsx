import { useState } from "react";
import HoverInfo from "../hoverInfo";

export interface TagProps {
  text: string;
  hover: string;
  bgColor?: string;
  textColor?: string;
  textStyle?: string;
  // eslint-disable-next-line no-undef
  children?: JSX.Element;
  click?: () => void;
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
      role={click && "button"}
      tabIndex={click && 0}
      onMouseEnter={() => setShowInfo(true)}
      onMouseLeave={() => setShowInfo(false)}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && click) {
          if (click) click();
        }
      }}
      onClick={click && click}
      className={`relative min-h-[30px] py-1 px-2 rounded-md text-sm flex items-center justify-center gap-1 ${bgColor && bgColor} ${textStyle && textStyle} ${textColor && textColor} shadow-md ${click ? "cursor-pointer hover:bg-secondary transition-all" : "cursor-help"}`}
    >
      {children}
      {showInfo && hover != "" && <HoverInfo text={hover} />}
      <span className="w-max">{text}</span>
    </div>
  );
}
