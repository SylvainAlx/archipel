import { useAtom } from "jotai";
import {
  changePasswordModalAtom,
  confirmBox,
  // editPlaceAtom,
  editbox,
  imageAtom,
  infoModalAtom,
  loadingAtom,
  newNationAtom,
  newPlaceAtom,
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
// import PlaceModal from "../components/modals/placeModal";
import LangModal from "../components/modals/langModal";
import ImageModal from "../components/modals/imageModal";
import MenuModal from "../components/modals/menuModal";
import NewNationModal from "../components/modals/newNationModal";
import { ChangePasswordModal } from "../components/modals/changePasswordModal";

export default function ModalsRouter() {
  const [recovery] = useAtom(recoveryKey);
  const [confirm] = useAtom(confirmBox);
  const [info] = useAtom(infoModalAtom);
  const [loading] = useAtom(loadingAtom);
  const [editBox] = useAtom(editbox);
  const [newPlace] = useAtom(newPlaceAtom);
  // const [editPlace] = useAtom(editPlaceAtom);
  const [lang] = useAtom(showLangModalAtom);
  const [image] = useAtom(imageAtom);
  const [menu] = useAtom(showMenuAtom);
  const [newNation] = useAtom(newNationAtom);
  const [changePassword] = useAtom(changePasswordModalAtom);

  if (
    recovery != "" ||
    confirm.text != "" ||
    info != "" ||
    loading ||
    editBox.original != -1 ||
    newPlace.nation != "" ||
    // editPlace.update != undefined ||
    lang ||
    image != "" ||
    menu ||
    newNation.owner != "" ||
    changePassword
  ) {
    return (
      <div className="animate-in fade-in z-20 fixed top-0 w-screen h-screen backdrop-blur-sm bg-black_alpha flex items-center justify-center">
        <div
          className={`min-w-[350px] max-w-[90%] ${!loading && "bg-slate-800"} rounded-md p-6 flex flex-col items-center gap-4`}
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
                  {info != "" && <InfoModal />}
                  {editBox.original != -1 && <EditBoxModal />}
                  {newPlace.nation != "" && <NewPlaceModal />}
                  {/* {editPlace.update != undefined && <PlaceModal />} */}
                  {lang && <LangModal />}
                  {image != "" && <ImageModal />}
                  {menu && <MenuModal />}
                  {newNation.owner != "" && <NewNationModal />}
                  {changePassword && <ChangePasswordModal />}
                </>
              )}
            </>
          )}
        </div>
      </div>
    );
  }
}
