import { useAtom } from "jotai";
import { recoveryKey } from "../../settings/store";
import Button from "../../components/buttons/button";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { errorMessage, successMessage } from "../../utils/toasts";
import { FaRegCopy } from "react-icons/fa6";
import { useModal } from "../../hooks/useModal";

export function RecoveryModal() {
  const [recovery, setRecovery] = useAtom(recoveryKey);
  const [checked, setChecked] = useState(false);
  const { t } = useTranslation();
  const modalRef = useModal(() =>
    console.error(t("components.modals.recoveryModal.confirm")),
  );
  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(recovery);
      successMessage(t("toasts.successCopy"));
    } catch (error) {
      errorMessage(t("toasts.failedCopy"));
    }
  };
  const handleConfirm = () => {
    setRecovery("");
  };
  return (
    <div
      ref={modalRef}
      tabIndex={-1}
      className="flex flex-col items-center gap-2"
    >
      <h2 className="text-2xl text-center p-4">
        {t("components.modals.recoveryModal.title")}
      </h2>
      <p>{t("components.modals.recoveryModal.info")}</p>
      <p className="underline">
        {t("components.modals.recoveryModal.boldInfo")}
      </p>
      <p
        onClick={handleClick}
        className="flex gap-1 items-center cursor-pointer bg-black text-white text-sm px-2 py-1 rounded"
      >
        <FaRegCopy />
        {recovery}
      </p>
      <div>
        <input
          type="checkbox"
          onClick={() => setChecked(!checked)}
          defaultChecked={checked}
        />
        <span className="ml-4">
          {t("components.modals.recoveryModal.confirm")}
        </span>
      </div>
      {checked && (
        <div className="my-4" onClick={handleConfirm}>
          <Button text={t("components.buttons.validate")} />
        </div>
      )}
    </div>
  );
}
