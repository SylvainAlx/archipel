import { IoMdCloseCircle } from "react-icons/io";
import { ClickProps } from "../../types/typProp";
import Button from "./button";
import { useTranslation } from "react-i18next";

export default function CrossButton({ click, small, text }: ClickProps) {
  const { t } = useTranslation();
  return (
    <>
      {!small ? (
        <Button
          text={text ? text : t("components.buttons.delete")}
          bgColor="bg-danger"
          click={click}
          children={<IoMdCloseCircle />}
        />
      ) : (
        <div
          onClick={click}
          className="absolute cursor-pointer text-xl hover:animate-pulse rounded-full bg-danger transition-all top-2 right-2"
        >
          <IoMdCloseCircle />
        </div>
      )}
    </>
  );
}
