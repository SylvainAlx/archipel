/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAtom } from "jotai";
import { confirmBox } from "../../settings/store";
import Button from "../button";
import { deleteSelfNation, updateNation } from "../../api/nation/nationAPI";
import { logout } from "../../api/authentification/authAPI";
import { createNewCom, deleteCom } from "../../api/communication/comAPI";
import { deletePlace } from "../../api/place/placeAPI";

export default function ConfirmModal() {
  const [confirm, setConfirm] = useAtom(confirmBox);

  return (
    <>
      <h2 className="text-2xl text-center p-4">DEMANDE DE CONFIRMATION</h2>
      <p className="text-center">{confirm.text}</p>
      <div className="flex gap-4 justify-center my-4">
        <Button
          text="VALIDER"
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
              deletePlace(confirm.target._id);
            }
          }}
        />
        <Button
          text="ANNULER"
          path=""
          click={() =>
            setConfirm({ action: confirm.action, text: "", result: "KO" })
          }
        />
      </div>
    </>
  );
}
