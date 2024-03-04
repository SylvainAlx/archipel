import Tag from "../tag";
import { customTagProps } from "../../types/typProp";

export default function RegimeTag({ label, bgColor }: customTagProps) {
  return <Tag text={label.toString()} bgColor={bgColor} />;
}
