import { useAtom } from "jotai";
import { confirmBox } from "../../utils/store";

export default function ConfirmModal() {
  const [confirm, setConfirm] = useAtom(confirmBox);

  return (
    <div className="absolute z-20 w-[45%] min-w-fit bg-slate-800 rounded-md p-8">
      <h2 className="text-2xl text-center p-4">DEMANDE DE CONFIRMATION</h2>
      <p className="text-center">{confirm.text}</p>
      <div className="flex gap-4 justify-center my-4">
        <button onClick={() => setConfirm({ text: "", result: "OK" })}>
          VALIDER
        </button>
        <button onClick={() => setConfirm({ text: "", result: "KO" })}>
          ANNULER
        </button>
      </div>
    </div>
  );
}
