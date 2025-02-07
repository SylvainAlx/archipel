import { useAtom } from "jotai";
import { recoveryKey } from "../../settings/store";
import Button from "../buttons/button";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { errorMessage, successMessage } from "../../utils/toasts";
import { FaRegCopy } from "react-icons/fa6";

export function RecoveryModal() {
  const [recovery, setRecovery] = useAtom(recoveryKey);
  const [checked, setChecked] = useState(false);
  const { t } = useTranslation();
  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(recovery);
      successMessage(t("toasts.successCopy"));
    } catch (error) {
      errorMessage(t("toasts.failedCopy"));
    }
  };
  return (
    <>
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
        <div className="my-4" onClick={() => setRecovery("")}>
          <Button text={t("components.buttons.validate")} />
        </div>
      )}
    </>
  );
}
