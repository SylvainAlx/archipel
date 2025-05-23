import { useAtom } from "jotai";
import {
  changePasswordModalAtom,
  confirmBox,
  creditTransferAtom,
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
  showHelpAtom,
  showLangModalAtom,
  showMenuAtom,
} from "../settings/store";
import { RecoveryModal } from "../views/modals/recoveryModal";
import ConfirmModal from "../views/modals/confirmModal";
import InfoModal from "../views/modals/infoModal";
import EditBoxModal from "../views/modals/editBoxModal";
import NewPlaceModal from "../views/modals/newPlaceModal";
import LangModal from "../views/modals/langModal";
import ImageModal from "../views/modals/imageModal";
import MenuModal from "../views/modals/menuModal";
import NewNationModal from "../views/modals/newNationModal";
import { ChangePasswordModal } from "../views/modals/changePasswordModal";
import RelationModal from "../views/modals/relationModal";
import TileFormModal from "../views/modals/tileFormModal";
import NewComModal from "../views/modals/newComModal";
import CreditTransferModal from "../views/modals/creditTransferModal";
import HelpModal from "../views/modals/helpModal";

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
  const [creditTransfer] = useAtom(creditTransferAtom);
  const [showHelp] = useAtom(showHelpAtom);

  if (
    recovery != "" ||
    confirm.text != "" ||
    info.subtitle != "" ||
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
    newCom.origin != "" ||
    creditTransfer.recipient.officialId != "" ||
    showHelp
  ) {
    return (
      <div
        className={`animate-in fade-in z-20 fixed top-0 w-screen h-screen ${(!loading || longLoading) && "bg-black_alpha backdrop-blur-sm"} flex items-center justify-center`}
      >
        <div
          role="dialog"
          aria-modal="true"
          className={`min-w-[350px] max-w-[90%] max-h-[95%] ${(!loading || longLoading) && "bg-slate-800"} rounded-md p-3 flex flex-col items-center gap-4`}
        >
          {loading ? (
            <>{/* <LoadingSpinner /> */}</>
          ) : (
            <>
              {recovery != "" ? (
                <RecoveryModal />
              ) : (
                <>
                  {confirm.text != "" && <ConfirmModal />}
                  {info.subtitle != "" && <InfoModal />}
                  {editBox.original != -1 && <EditBoxModal />}
                  {newPlace.nation != "" && <NewPlaceModal />}
                  {newCom.origin != "" && <NewComModal />}
                  {lang && <LangModal />}
                  {image != "" && <ImageModal />}
                  {menu && <MenuModal />}
                  {newNation.owner != "" && <NewNationModal />}
                  {changePassword && <ChangePasswordModal />}
                  {newRelation.show && (
                    <RelationModal update={newRelation.update} />
                  )}
                  {tile.nationOfficialId != "" && <TileFormModal />}
                  {creditTransfer.recipient.officialId != "" && (
                    <CreditTransferModal />
                  )}
                  {showHelp && <HelpModal />}
                </>
              )}
            </>
          )}
        </div>
      </div>
    );
  }
}
