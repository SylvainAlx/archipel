import { TagProps } from "../types/typProp";

export default function Tag({ text, bgColor, children }: TagProps) {
  return (
    <div
      className={`h-[30px] py-1 px-2 rounded text-sm flex items-center gap-1 ${bgColor && bgColor}`}
    >
      {text}
      {children}
    </div>
  );
}
