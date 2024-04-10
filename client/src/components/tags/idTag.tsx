import Tag from "./tag";
import { customTagProps } from "../../types/typProp";
import { TbWorld } from "react-icons/tb";

export default function IdTag({ label }: customTagProps) {
  return (
    <Tag
      text={label.toString().toUpperCase()}
      bgColor="bg-[rgba(255,255,255,0.3)]"
      // textStyle="uppercase"
      children={<TbWorld />}
    />
  );
}
