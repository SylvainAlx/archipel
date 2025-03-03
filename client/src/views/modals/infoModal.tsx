import Button from "../../components/buttons/button";
import { useTranslation } from "react-i18next";
import { useModal } from "../../hooks/useModal";
import { useInfoModal } from "../../hooks/modalsHooks/useInfoModal";

export default function InfoModal() {
  const { t } = useTranslation();
  const { info, handleClose } = useInfoModal();
  const modalRef = useModal(() => handleClose());

  return (
    <div
      className="w-full flex flex-col items-center gap-4"
      ref={modalRef}
      tabIndex={-1}
    >
      <h2 className="text-2xl text-center p-4">
        {t("components.modals.infoModal.title")}
      </h2>
      {info.subtitle && <h3>{info.subtitle}</h3>}
      {info.children}
      <Button text={t("components.buttons.close")} click={handleClose} />
    </div>
  );
}
