import { IoMdEye } from "react-icons/io";
import { ClickProps } from "../../types/typProp";
import Tag from "../tag";

export default function EyeButton({ text, click }: ClickProps) {
  return (
    <div className="cursor-pointer">
      <Tag
        text={text ? text : ""}
        bgColor="bg-secondary"
        click={click}
        children={
          <div className="text-xl hover:animate-ping">
            <IoMdEye />
          </div>
        }
      />
    </div>
  );
}
