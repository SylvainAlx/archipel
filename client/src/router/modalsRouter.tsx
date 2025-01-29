import { useAtom } from "jotai";
import {
  changePasswordModalAtom,
  confirmBox,
  editbox,
  editTileAtom,
  imageAtom,
  infoModalAtom,
  loadingAtom,
  longLoadingAtom,
  newComAtom,
  newNationAtom,
  newPlaceAtom,
  newRelationAtom,
  recoveryKey,
  showLangModalAtom,
  showMenuAtom,
} from "../settings/store";
import { RecoveryModal } from "../components/modals/recoveryModal";
import ConfirmModal from "../components/modals/confirmModal";
import InfoModal from "../components/modals/infoModal";
import LoadingSpinner from "../components/modals/loadingSpinner";
import EditBoxModal from "../components/modals/editBoxModal";
import NewPlaceModal from "../components/modals/newPlaceModal";
import LangModal from "../components/modals/langModal";
import ImageModal from "../components/modals/imageModal";
import MenuModal from "../components/modals/menuModal";
import NewNationModal from "../components/modals/newNationModal";
import { ChangePasswordModal } from "../components/modals/changePasswordModal";
import NewRelationModal from "../components/modals/newRelationModal";
import TileFormModal from "../components/modals/tileFormModal";
import NewComModal from "../components/modals/newComModal";

export default function ModalsRouter() {
  const [recovery] = useAtom(recoveryKey);
  const [confirm] = useAtom(confirmBox);
  const [info] = useAtom(infoModalAtom);
  const [loading] = useAtom(loadingAtom);
  const [longLoading] = useAtom(longLoadingAtom);
  const [editBox] = useAtom(editbox);
  const [newPlace] = useAtom(newPlaceAtom);
  const [lang] = useAtom(showLangModalAtom);
  const [image] = useAtom(imageAtom);
  const [menu] = useAtom(showMenuAtom);
  const [newNation] = useAtom(newNationAtom);
  const [changePassword] = useAtom(changePasswordModalAtom);
  const [newRelation] = useAtom(newRelationAtom);
  const [tile] = useAtom(editTileAtom);
  const [newCom] = useAtom(newComAtom);

  if (
    recovery != "" ||
    confirm.text != "" ||
    info.text != "" ||
    loading ||
    editBox.original != -1 ||
    newPlace.nation != "" ||
    lang ||
    image != "" ||
    menu ||
    newNation.owner != "" ||
    changePassword ||
    newRelation.show ||
    tile.nationOfficialId != "" ||
    newCom.origin != ""
  ) {
    return (
      <div
        className={`animate-in fade-in z-20 fixed top-0 w-screen h-screen ${(!loading || longLoading) && "bg-black_alpha backdrop-blur-sm"} flex items-center justify-center`}
      >
        <div
          className={`min-w-[350px] max-w-[90%] ${(!loading || longLoading) && "bg-slate-800"} rounded-md p-3 flex flex-col items-center gap-4`}
        >
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              {recovery != "" ? (
                <RecoveryModal />
              ) : (
                <>
                  {confirm.text != "" && <ConfirmModal />}
                  {info.text != "" && <InfoModal />}
                  {editBox.original != -1 && <EditBoxModal />}
                  {newPlace.nation != "" && <NewPlaceModal />}
                  {newCom.origin != "" && <NewComModal />}
                  {lang && <LangModal />}
                  {image != "" && <ImageModal />}
                  {menu && <MenuModal />}
                  {newNation.owner != "" && <NewNationModal />}
                  {changePassword && <ChangePasswordModal />}
                  {newRelation.show && (
                    <NewRelationModal update={newRelation.update} />
                  )}
                  {tile.nationOfficialId != "" && <TileFormModal />}
                </>
              )}
            </>
          )}
        </div>
      </div>
    );
  }
}
