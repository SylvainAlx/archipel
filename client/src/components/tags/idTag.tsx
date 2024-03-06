import Tag from "../tag";
import { customTagProps } from "../../types/typProp";
import { FaFile } from "react-icons/fa6";

export default function IdTag({ label }: customTagProps) {
  return (
    <Tag
      text={
        label.toString().substring(0, 2).toUpperCase() +
        label.toString().substring(label.toString().length - 8)
      }
      bgColor="bg-[rgba(255,255,255,0.3)]"
      // textStyle="uppercase"
      children={<FaFile />}
    />
  );
}
