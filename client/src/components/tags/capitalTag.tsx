import Tag from "../tag";
import { customTagProps } from "../../types/typProp";
import { GiCapitol } from "react-icons/gi";

export default function CapitalTag({ label }: customTagProps) {
  return (
    <Tag
      text={label.toString()}
      bgColor="bg-info"
      children={
        <>
          <GiCapitol />
        </>
      }
    />
  );
}
