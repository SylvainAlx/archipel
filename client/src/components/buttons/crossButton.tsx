import { IoMdCloseCircle } from "react-icons/io";
import Button from "./button";
import { useTranslation } from "react-i18next";
import { MouseEventHandler } from "react";

interface CrossButtonProps {
  text?: string;
  click: MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
  small?: boolean;
  absolute?: boolean;
  widthFull?: boolean;
}

export default function CrossButton({
  click,
  small,
  text,
  widthFull,
}: CrossButtonProps) {
  const { t } = useTranslation();
  return (
    <>
      {!small ? (
        <Button
          text={text ? text : t("components.buttons.delete")}
          bgColor="bg-danger"
          click={click}
          children={<IoMdCloseCircle />}
          widthFull={widthFull && widthFull}
        />
      ) : (
        <div
          onClick={click}
          className="absolute cursor-pointer text-xl hover:text-danger rounded-full transition-all top-2 right-2"
        >
          <IoMdCloseCircle />
        </div>
      )}
    </>
  );
}
