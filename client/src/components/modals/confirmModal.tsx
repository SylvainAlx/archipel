/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAtom } from "jotai";
import { confirmBox } from "../../settings/store";
import Button from "../buttons/button";
import { deleteSelfNation, updateNation } from "../../api/nation/nationAPI";
import { logout } from "../../api/authentification/authAPI";
import { createNewCom, deleteCom } from "../../api/communication/comAPI";
import { deletePlace, updatePlace } from "../../api/place/placeAPI";
import { useTranslation } from "react-i18next";

export default function ConfirmModal() {
  const { t } = useTranslation();
  const [confirm, setConfirm] = useAtom(confirmBox);

  return (
    <>
      <h2 className="text-2xl text-center p-4">
        {t("components.modals.confirmModal.title")}
      </h2>
      <p className="text-center">{confirm.text}</p>
      <div className="flex gap-4 justify-center my-4">
        <Button
          text={t("components.buttons.validate")}
          path=""
          click={() => {
            setConfirm({ action: confirm.action, text: "", result: "OK" });
            if (confirm.action === "logout") {
              logout();
            }
            if (confirm.action === "deleteSelfNation") {
              deleteSelfNation();
            }
            if (confirm.action === "deleteCom") {
              deleteCom();
            }
            if (confirm.action === "createCom") {
              createNewCom(confirm.payload);
            }
            if (confirm.action === "updateNation") {
              updateNation(confirm.payload);
            }
            if (confirm.action === "deletePlace") {
              deletePlace(confirm.target.officialId);
            }
            if (confirm.action === "updatePlace") {
              updatePlace(confirm.payload);
            }
          }}
        />
        <Button
          text={t("components.buttons.cancel")}
          path=""
          click={() =>
            setConfirm({ action: confirm.action, text: "", result: "KO" })
          }
        />
      </div>
    </>
  );
}
