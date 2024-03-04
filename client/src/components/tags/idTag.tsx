import Tag from "../tag";
import { customTagProps } from "../../types/typProp";

export default function IdTag({ label }: customTagProps) {
  return (
    <Tag
      text={"@" + label.toString().substring(0, 10)}
      bgColor="bg-[rgba(255,255,255,0.4)]"
    />
  );
}
