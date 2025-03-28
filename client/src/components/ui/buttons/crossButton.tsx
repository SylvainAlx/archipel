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
  disabled?: boolean;
}

export default function CrossButton({
  click,
  small,
  text,
  widthFull,
  disabled,
}: CrossButtonProps) {
  const { t } = useTranslation();
  return (
    <>
      {!small ? (
        <Button
          text={text ? text : t("components.buttons.delete")}
          bgColor="bg-danger"
          click={click}
          widthFull={widthFull && widthFull}
          disabled={disabled}
        >
          <IoMdCloseCircle />
        </Button>
      ) : (
        <button
          aria-label={t("components.buttons.delete")}
          onClick={click}
          className="absolute cursor-pointer text-xl text-danger hover:text-wait rounded-full transition-all top-2 right-2"
        >
          <IoMdCloseCircle />
        </button>
      )}
    </>
  );
}
