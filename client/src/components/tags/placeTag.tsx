import Tag from "../tag";
import { customTagProps } from "../../types/typProp";
import { MdPlace } from "react-icons/md";

export default function PlaceTag({ label }: customTagProps) {
  return (
    <Tag text={label.toString()} bgColor="bg-info" children={<MdPlace />} />
  );
}
