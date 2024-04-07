import { IoMdCloseCircle } from "react-icons/io";
import { ClickProps } from "../../types/typProp";
import Button from "./button";

export default function CrossButton({ text, click }: ClickProps) {
  return (
    <div className="cursor-pointer overflow-hidden">
      <Button
        text={text ? text : ""}
        path=""
        bgColor="bg-danger"
        click={click}
        children={
          <div className="hover:animate-ping text-xl">
            <IoMdCloseCircle />
          </div>
        }
      />
    </div>
  );
}
