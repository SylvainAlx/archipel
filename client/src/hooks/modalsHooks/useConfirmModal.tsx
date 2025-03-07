import { useAtom } from "jotai";
import { confirmBox } from "../../settings/store";
import { FormEvent } from "react";

export function useConfirmModal() {
  const [confirm, setConfirm] = useAtom(confirmBox);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setConfirm({ text: "" });
    if (confirm.actionToDo) {
      confirm.actionToDo();
    }
  };
  return {
    confirm,
    setConfirm,
    handleSubmit,
  };
}
