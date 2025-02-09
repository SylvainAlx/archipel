import { useAtom } from "jotai";
import Button from "../buttons/button";
import { infoModalAtom, myStore } from "../../settings/store";
import { useTranslation } from "react-i18next";
import useClickOutside from "../../hooks/useClickOutside";
import { emptyInfo } from "../../types/typAtom";

export default function InfoModal() {
  const [info] = useAtom(infoModalAtom);
  const { t } = useTranslation();
  const ref = useClickOutside(() => handleClose());

  const handleClose = () => {
    myStore.set(infoModalAtom, emptyInfo);
  };

  return (
    <div className="flex flex-col items-center gap-4" ref={ref}>
      <h2 className="text-2xl text-center p-4">
        {t("components.modals.infoModal.title")}
      </h2>
      {info.subtitle && <h3>{info.subtitle}</h3>}
      {info.children}
      <Button text={t("components.buttons.close")} click={handleClose} />
    </div>
  );
}
