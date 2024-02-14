import { useEffect, useState } from "react";
import { TagProps } from "../types/typProp";

export default function Tag({ text, bgColor, children }: TagProps) {
  const [fontSize, setFontSize] = useState("text-sm");
  useEffect(() => {
    if (text.length > 7) {
      setFontSize("text-[11px]");
    }
  }, []);
  return (
    <div
      className={`h-[30px] py-1 px-2 rounded ${fontSize} flex items-center gap-1 ${bgColor && bgColor} shadow-md`}
    >
      {text}
      {children}
    </div>
  );
}
