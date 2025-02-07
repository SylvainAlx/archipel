import { useAtom } from "jotai";
import Button from "../buttons/button";
import { infoModalAtom, myStore } from "../../settings/store";
import { useTranslation } from "react-i18next";
import useClickOutside from "../../hooks/useClickOutside";
import { errorMessage, successMessage } from "../../utils/toasts";
import { emptyInfo } from "../../types/typAtom";
import { FaRegCopy } from "react-icons/fa";

export default function InfoModal() {
  const [info] = useAtom(infoModalAtom);
  const { t } = useTranslation();
  const ref = useClickOutside(() => handleClose());

  const handleClose = () => {
    myStore.set(infoModalAtom, emptyInfo);
  };

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(info.text);
      successMessage(t("toasts.successCopy"));
    } catch (error) {
      errorMessage(t("toasts.failedCopy"));
    }
  };

  return (
    <div className="flex flex-col items-center gap-4" ref={ref}>
      <h2 className="text-2xl text-center p-4">
        {t("components.modals.infoModal.title")}
      </h2>
      {info.subtitle && <h3>{info.subtitle}</h3>}
      {info.copy ? (
        <p
          onClick={handleClick}
          className="flex gap-1 items-center cursor-pointer bg-black text-white text-sm px-2 py-1 rounded"
        >
          <FaRegCopy />
          {info.text}
        </p>
      ) : (
        <p className="text-center break-all">{info.text}</p>
      )}

      {info.image && (
        <img
          src={info.image}
          alt={info.text}
          className="object-contain w-full h-full"
        />
      )}
      <Button text={t("components.buttons.close")} click={handleClose} />
    </div>
  );
}
