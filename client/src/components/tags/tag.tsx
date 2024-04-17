import { useState } from "react";
import { TagProps } from "../../types/typProp";
import HoverInfo from "../hoverInfo";

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
      className={`relative h-[30px] py-1 px-2 rounded-full text-sm flex items-center gap-1 ${bgColor && bgColor} ${textStyle && textStyle} ${textColor && textColor} shadow-md ${click ? "cursor-pointer" : "cursor-default"}`}
    >
      {children}
      {showInfo && hover != "" && <HoverInfo text={hover} />}
      {text}
    </div>
  );
}