/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAtom } from "jotai";
import {
  comsListAtom,
  confirmBox,
  infoModal,
  loadingSpinner,
  myStore,
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
import { SERVEUR_LOADING_STRING } from "../../settings/consts";

export default function ConfirmModal() {
  const [confirm, setConfirm] = useAtom(confirmBox);
  const [nation, setNation] = useAtom(nationAtom);
  const [comsList, setComsList] = useAtom(comsListAtom);
  const [nationsList, setNationsList] = useAtom(nationsListAtom);
  const navigate = useNavigate();

  const logout = () => {
    myStore.set(infoModal, "déconnexion effectuée");
    setNation(EmptyNation);
    localStorage.removeItem("jwt");
    navigate("/");
  };

  const deleteSelfNation = () => {
    myStore.set(loadingSpinner, { show: true, text: SERVEUR_LOADING_STRING });
    DeleteSelfFetch()
      .then((resp) => {
        myStore.set(loadingSpinner, { show: false, text: "" });
        createCom({
          originId: nation._id,
          originName: nation.name,
          comType: 2,
        });
        deleteElementOfAtomArray(nation._id, nationsList, setNationsList);
        setComsList([EmptyCom]);
        myStore.set(infoModal, resp.message);
        setNation(EmptyNation);
        localStorage.removeItem("jwt");
        navigate("/");
        // window.location.reload();
      })
      .catch((error) => {
        myStore.set(loadingSpinner, { show: false, text: "" });
        myStore.set(infoModal, error);
      });
  };

  const deleteCom = () => {
    myStore.set(loadingSpinner, { show: true, text: SERVEUR_LOADING_STRING });
    deleteComFetch(confirm.target)
      .then((resp) => {
        myStore.set(loadingSpinner, { show: false, text: "" });
        deleteElementOfAtomArray(confirm.target, comsList, setComsList);
        myStore.set(infoModal, resp.message);
      })
      .catch((error) => {
        myStore.set(loadingSpinner, { show: false, text: "" });
        myStore.set(infoModal, error);
      });
  };

  const createNewCom = (payload: any) => {
    myStore.set(loadingSpinner, { show: true, text: SERVEUR_LOADING_STRING });
    createCom(payload)
      .then((resp) => {
        myStore.set(loadingSpinner, { show: false, text: "" });
        createElementOfAtomArray(resp.com, comsList, setComsList);
        myStore.set(infoModal, resp.message);
      })
      .catch((error) => {
        myStore.set(loadingSpinner, { show: false, text: "" });
        myStore.set(infoModal, error);
      });
  };

  const updateNation = (payload: Nation) => {
    myStore.set(loadingSpinner, { show: true, text: SERVEUR_LOADING_STRING });
    updateNationFetch(payload)
      .then((resp) => {
        myStore.set(loadingSpinner, { show: false, text: "" });
        if (resp.nation) {
          setNation(resp.nation);
          updateElementOfAtomArray(resp.nation, nationsList, setNationsList);

          // const updateCom = {
          //   originId: payload._id,
          //   originName: payload.name,
          //   title: "Mise à jour des informations",
          //   comType: comOptions[5].id,
          //   message: payload.name + " a modifié certaines informations",
          // };
          // setConfirm({
          //   action: "createCom",
          //   text: "Mise a jour réussie. Publier la modification dans les communications ?",
          //   result: "",
          //   target: "",
          //   payload: updateCom,
          // });
        } else {
          myStore.set(infoModal, resp.message);
        }
      })
      .catch((error) => {
        myStore.set(loadingSpinner, { show: false, text: "" });
        myStore.set(infoModal, error);
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
