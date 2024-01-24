import { useAtom } from "jotai";
import {
  comsListAtom,
  confirmBox,
  infoModal,
  nationAtom,
  nationsListAtom,
} from "../../settings/store";
import { useNavigate } from "react-router-dom";
import {
  deleteComFetch,
  DeleteSelfFetch,
  createCom,
  updateNationFetch,
} from "../../utils/fetch";
import { EmptyNation, Nation } from "../../types/typNation";
import Button from "../button";
import { EmptyCom } from "../../types/typCom";
import {
  createElementOfAtomArray,
  deleteElementOfAtomArray,
  updateElementOfAtomArray,
} from "../../utils/functions";

export default function ConfirmModal() {
  const [confirm, setConfirm] = useAtom(confirmBox);
  const [, setInfo] = useAtom(infoModal);
  const [nation, setNation] = useAtom(nationAtom);
  const [comsList, setComsList] = useAtom(comsListAtom);
  const [nationsList, setNationsList] = useAtom(nationsListAtom);
  const navigate = useNavigate();

  const logout = () => {
    setInfo("déconnexion effectuée");
    setNation(EmptyNation);
    localStorage.removeItem("jwt");
    navigate("/");
    // window.location.reload();
  };

  const deleteSelfNation = () => {
    DeleteSelfFetch()
      .then((resp) => {
        createCom({
          originId: nation._id,
          originName: nation.name,
          comType: 2,
        });
        deleteElementOfAtomArray(nation._id, nationsList, setNationsList);
        setComsList([EmptyCom]);
        setInfo(resp.message);
        setNation(EmptyNation);
        localStorage.removeItem("jwt");
        navigate("/");
        // window.location.reload();
      })
      .catch((error) => {
        setInfo(error);
      });
  };

  const deleteCom = () => {
    deleteComFetch(confirm.target)
      .then((resp) => {
        deleteElementOfAtomArray(confirm.target, comsList, setComsList);
        setInfo(resp.message);
      })
      .catch((error) => {
        setInfo(error);
      });
  };

  const createNewCom = (payload: any) => {
    createCom(payload)
      .then((resp) => {
        createElementOfAtomArray(resp.com, comsList, setComsList);
        setInfo(resp.message);
      })
      .catch((error) => {
        setInfo(error);
      });
  };

  const updateNation = (payload: Nation) => {
    updateNationFetch(payload)
      .then((resp) => {
        setNation(resp.nation);
        updateElementOfAtomArray(resp.nation, nationsList, setNationsList);
        localStorage.setItem("jwt", resp.jwt);
        setInfo(resp.message);
      })
      .catch((error) => {
        setInfo(error);
      });
  };

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
