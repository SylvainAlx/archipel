/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAtom } from "jotai";
import { confirmBox } from "../../settings/store";
import Button from "../buttons/button";
import { useTranslation } from "react-i18next";
import { ConfirmBoxDefault } from "../../types/typAtom";
import { FormEvent } from "react";

export default function ConfirmModal() {
  const { t } = useTranslation();
  const [confirm, setConfirm] = useAtom(confirmBox);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setConfirm({ text: "" });
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
      <form onSubmit={handleSubmit} className="flex gap-4 justify-center my-4">
        <Button text={t("components.buttons.validate")} type="submit" />
        <Button
          text={t("components.buttons.cancel")}
          click={() => setConfirm(ConfirmBoxDefault)}
        />
      </form>
    </>
  );
}
