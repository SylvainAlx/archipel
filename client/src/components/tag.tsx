import { TagProps } from "../types/typProp";

export default function Tag({ text, bgColor }: TagProps) {
  return (
    <div className={`p-1 rounded text-sm ${bgColor && bgColor}`}>{text}</div>
  );
}
