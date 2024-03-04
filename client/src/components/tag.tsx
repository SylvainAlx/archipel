import { TagProps } from "../types/typProp";

export default function Tag({
  text,
  bgColor,
  textColor,
  textStyle,
  children,
  click,
}: TagProps) {
  return (
    <div
      onClick={click && click}
      className={`h-[30px] py-1 px-2 rounded text-sm flex items-center gap-1 ${bgColor && bgColor} ${textStyle && textStyle} ${textColor && textColor} shadow-md ${click && "cursor-pointer"}`}
    >
      {text}
      {children}
    </div>
  );
}
