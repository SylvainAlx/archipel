import { useAtom } from "jotai";
import { confirmBox, recoveryKey } from "../utils/store";
import { RecoveryModal } from "../components/modals/recoveryModal";
import ConfirmModal from "../components/modals/confirmModal";

export default function ModalsRouter() {
  const [recovery] = useAtom(recoveryKey);
  const [confirm] = useAtom(confirmBox);
  if (recovery != "") {
    return <RecoveryModal />;
  }
  if (confirm.text != "") {
    return <ConfirmModal />;
  }
}
