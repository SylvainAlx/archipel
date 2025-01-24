/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAtom } from "jotai";
import { confirmBox } from "../../settings/store";
import Button from "../buttons/button";
import { useTranslation } from "react-i18next";
import {
  changeStatus,
  deleteUser,
  logout,
  updateUser,
} from "../../api/user/userAPI";
import { useNavigate } from "react-router-dom";
import { updateRelation } from "../../api/relation/relationAPI";
import { createTile, deleteTile, updateTile } from "../../api/tile/tileAPI";
import { ConfirmBoxDefault } from "../../types/typAtom";

export default function ConfirmModal() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [confirm, setConfirm] = useAtom(confirmBox);

  const handleClick = () => {
    setConfirm({ action: confirm.action, text: "", result: "OK" });
    if (confirm.actionToDo) {
      confirm.actionToDo();
    } else {
      if (confirm.action === "logout") {
        logout();
        navigate("/");
      }
      if (confirm.action === "deleteUser") {
        deleteUser(confirm.payload);
      }
      if (confirm.action === "changeStatus") {
        changeStatus(confirm.payload);
      }
      if (confirm.action === "leave") {
        updateRelation(confirm.payload);
      }
      if (confirm.action === "acceptRelation") {
        updateRelation(confirm.payload);
      }
      if (confirm.action === "deleteTile") {
        deleteTile(confirm.payload);
      }
      if (confirm.action === "createTile") {
        createTile(confirm.payload);
      }
      if (confirm.action === "updateTile") {
        updateTile(confirm.payload);
      }
      if (confirm.action === "updateUser") {
        updateUser(confirm.payload);
      }
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
