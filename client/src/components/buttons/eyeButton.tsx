import { IoMdEye } from "react-icons/io";
import { ClickProps } from "../../types/typProp";
import Button from "./button";

export default function EyeButton({ text, click }: ClickProps) {
  return (
    <div className="cursor-pointer overflow-hidden">
      <Button
        text={text ? text : ""}
        path=""
        click={click}
        children={
          <div className="hover:animate-ping text-xl">
            <IoMdEye />
          </div>
        }
      />
    </div>
  );
}
