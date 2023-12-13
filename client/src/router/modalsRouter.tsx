import { useAtom } from "jotai";
import { confirmBox, infoModal, recoveryKey } from "../utils/store";
import { RecoveryModal } from "../components/modals/recoveryModal";
import ConfirmModal from "../components/modals/confirmModal";
import InfoModal from "../components/modals/infoModal";

export default function ModalsRouter() {
  const [recovery] = useAtom(recoveryKey);
  const [confirm] = useAtom(confirmBox);
  const [info] = useAtom(infoModal);

  if(recovery != "" || confirm.text != "" || info != ""){
    return (
      <div className="animate-in fade-in z-20 absolute top-0 w-[100vw] h-[100vh] backdrop-blur-sm bg-black/20 flex items-center justify-center">
        <div className="w-[40%] min-w-min bg-slate-800 rounded-md p-8 flex flex-col items-center gap-4">
          {recovery != "" && <RecoveryModal />}
          {confirm.text != "" && <ConfirmModal />}
          {info != "" && <InfoModal />}
        </div>
      </div>
    )
  }
  
}
