import { useAtom } from "jotai";
import {
  comsListAtom,
  confirmBox,
  infoModal,
  loadingSpinner,
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
import {
  createElementOfAtomArray,
  deleteElementOfAtomArray,
  updateElementOfAtomArray,
} from "../../utils/functions";
import { EmptyCom } from "../../types/typAtom";

export default function ConfirmModal() {
  const [confirm, setConfirm] = useAtom(confirmBox);
  const [, setInfo] = useAtom(infoModal);
  const [, setLoading] = useAtom(loadingSpinner);
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
    setLoading({ show: true, text: "Connexion au serveur" });
    DeleteSelfFetch()
      .then((resp) => {
        setLoading({ show: false, text: "Connexion au serveur" });
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
        setLoading({ show: false, text: "Connexion au serveur" });
        setInfo(error);
      });
  };

  const deleteCom = () => {
    setLoading({ show: true, text: "Connexion au serveur" });
    deleteComFetch(confirm.target)
      .then((resp) => {
        setLoading({ show: false, text: "Connexion au serveur" });
        deleteElementOfAtomArray(confirm.target, comsList, setComsList);
        setInfo(resp.message);
      })
      .catch((error) => {
        setLoading({ show: false, text: "Connexion au serveur" });
        setInfo(error);
      });
  };

  const createNewCom = (payload: any) => {
    setLoading({ show: true, text: "Connexion au serveur" });
    createCom(payload)
      .then((resp) => {
        setLoading({ show: false, text: "Connexion au serveur" });
        createElementOfAtomArray(resp.com, comsList, setComsList);
        setInfo(resp.message);
      })
      .catch((error) => {
        setLoading({ show: false, text: "Connexion au serveur" });
        setInfo(error);
      });
  };

  const updateNation = (payload: Nation) => {
    setLoading({ show: true, text: "Connexion au serveur" });
    updateNationFetch(payload)
      .then((resp) => {
        setLoading({ show: false, text: "Connexion au serveur" });
        setNation(resp.nation);
        updateElementOfAtomArray(resp.nation, nationsList, setNationsList);
        localStorage.setItem("jwt", resp.jwt);
        setInfo(resp.message);
      })
      .catch((error) => {
        setLoading({ show: false, text: "Connexion au serveur" });
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
