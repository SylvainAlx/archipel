/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAtom } from "jotai";
import { confirmBox } from "../../settings/store";
import Button from "../buttons/button";
import { deleteSelfNation, updateNation } from "../../api/nation/nationAPI";
import { useTranslation } from "react-i18next";
import {
  changeStatus,
  deleteUser,
  logout,
  updateUser,
} from "../../api/user/userAPI";
import { deleteUploadedFile } from "../../api/files/fileAPI";
import { useNavigate } from "react-router-dom";
import { updateRelation } from "../../api/relation/relationAPI";
import { createTile, deleteTile, updateTile } from "../../api/tile/tileAPI";
import { ConfirmBoxDefault } from "../../types/typAtom";
import { banContent, reportContent } from "../../api/admin/adminAPI";

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
      if (confirm.action === "deleteSelfNation") {
        deleteSelfNation();
      }
      if (confirm.action === "deleteUser") {
        deleteUser(confirm.payload);
      }
      if (confirm.action === "updateNation") {
        updateNation(confirm.payload);
      }
      if (confirm.action === "deleteFile") {
        deleteUploadedFile({
          url: confirm.payload,
          type: confirm.target,
        });
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
      if (confirm.action === "adminReport") {
        reportContent(confirm.target);
      }
      if (confirm.action === "adminReportReverse") {
        reportContent(confirm.target, true);
      }
      if (confirm.action === "adminBan") {
        banContent(confirm.target);
      }
      if (confirm.action === "adminBanReverse") {
        banContent(confirm.target, true);
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
