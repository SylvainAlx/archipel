/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAtom } from "jotai";
import { confirmBox } from "../../settings/store";
import Button from "../buttons/button";
import { useTranslation } from "react-i18next";
import { ConfirmBoxDefault } from "../../types/typAtom";

export default function ConfirmModal() {
  const { t } = useTranslation();
  const [confirm, setConfirm] = useAtom(confirmBox);

  const handleClick = () => {
    setConfirm({ action: confirm.action, text: "", result: "OK" });
    if (confirm.actionToDo) {
      confirm.actionToDo();
    }
  };

  return (
    <>
      <h2 className="text-2xl text-center p-4">
        {t("components.modals.confirmModal.title")}
      </h2>
      <p className="text-center">{confirm.text}</p>
      <div className="flex gap-4 justify-center my-4">
        <Button text={t("components.buttons.validate")} click={handleClick} />
        <Button
          text={t("components.buttons.cancel")}
          click={() => setConfirm(ConfirmBoxDefault)}
        />
      </div>
    </>
  );
}
