import Button from "../../components/ui/buttons/button";
import { useTranslation } from "react-i18next";
import { ConfirmBoxDefault } from "../../types/typAtom";
import { useModal } from "../../hooks/useModal";
import { useConfirmModal } from "../../hooks/modalsHooks/useConfirmModal";

export default function ConfirmModal() {
  const { t } = useTranslation();
  const { confirm, setConfirm, handleSubmit } = useConfirmModal();
  const modalRef = useModal(() => setConfirm({ text: "" }));

  return (
    <div ref={modalRef} tabIndex={-1}>
      <h2 className="text-2xl text-center p-4">
        {t("components.modals.confirmModal.title")}
      </h2>
      <p className="text-center">{confirm.text}</p>
      <form onSubmit={handleSubmit} className="flex gap-4 justify-center my-4">
        <Button text={t("components.buttons.validate")} type="submit" />
        <Button
          text={t("components.buttons.cancel")}
          click={() => setConfirm(ConfirmBoxDefault)}
        />
      </form>
    </div>
  );
}
