import { useAtom } from "jotai";
import { recoveryKey } from "../../settings/store";
import Button from "../buttons/button";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function RecoveryModal() {
  const [recovery, setRecovery] = useAtom(recoveryKey);
  const [checked, setChecked] = useState(false);
  const { t } = useTranslation();
  return (
    <>
      <h2 className="text-2xl text-center p-4">
        {t("components.modals.recoveryModal.title")}
      </h2>
      <p>{t("components.modals.recoveryModal.info")}</p>
      <p className="underline">
        {t("components.modals.recoveryModal.boldInfo")}
      </p>
      <div className="my-4 p-4 bg-black">
        <code>{recovery}</code>
      </div>
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
