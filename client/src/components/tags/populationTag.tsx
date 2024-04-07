import { FaUserGroup } from "react-icons/fa6";
import Tag from "./tag";
import { customTagProps } from "../../types/typProp";

export default function PopulationTag({ label }: customTagProps) {
  return (
    <Tag text={label.toString()} bgColor="bg-info" children={<FaUserGroup />} />
  );
}
