import { useAtom } from "jotai";
import {
  confirmBox,
  infoModal,
  loadingSpinner,
  recoveryKey,
} from "../settings/store";
import { RecoveryModal } from "../components/modals/recoveryModal";
import ConfirmModal from "../components/modals/confirmModal";
import InfoModal from "../components/modals/infoModal";
import LoadingSpinner from "../components/modals/loadingSpinner";

export default function ModalsRouter() {
  const [recovery] = useAtom(recoveryKey);
  const [confirm] = useAtom(confirmBox);
  const [info] = useAtom(infoModal);
  const [loading] = useAtom(loadingSpinner);

  if (recovery != "" || confirm.text != "" || info != "" || loading.show) {
    return (
      <div className="animate-in fade-in z-20 fixed top-0 w-[100%] h-[100%] backdrop-blur-sm bg-black_alpha flex items-center justify-center">
        <div className="w-[350px] bg-slate-800 rounded-md p-6 flex flex-col items-center gap-4">
          {recovery != "" && <RecoveryModal />}
          {confirm.text != "" && <ConfirmModal />}
          {info != "" && <InfoModal />}
          {loading.show && <LoadingSpinner />}
        </div>
      </div>
    );
  }
}
