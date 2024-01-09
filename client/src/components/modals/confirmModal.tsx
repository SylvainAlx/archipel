import { useAtom } from "jotai";
import { confirmBox, infoModal, nationAtom } from "../../settings/store";
import { useNavigate } from "react-router-dom";
import { DeleteSelfFetch } from "../../utils/fetch";
import { EmptyNation } from "../../types/typNation";
import Button from "../button";

export default function ConfirmModal() {
  const [confirm, setConfirm] = useAtom(confirmBox);
  const [, setInfo] = useAtom(infoModal);
  const [, setNation] = useAtom(nationAtom);
  const navigate = useNavigate();

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
              setInfo("déconnexion effectuée");
              setNation(EmptyNation);
              localStorage.removeItem("jwt");
              navigate("/");
              // window.location.reload();
            }
            if (confirm.action === "delete") {
              DeleteSelfFetch()
                .then((resp) => {
                  setInfo(resp.message);
                  setNation(EmptyNation);
                  localStorage.removeItem("jwt");
                  navigate("/");
                  // window.location.reload();
                })
                .catch((error) => {
                  console.log(error);
                });
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
