import { useAtom } from "jotai";
import { recoveryKey } from "../../utils/store";
import Button from "../button";
import { useState } from "react";

export function RecoveryModal() {
  const [recovery, setRecovery] = useAtom(recoveryKey);
  const [checked, setChecked] = useState(false);
  return (
    <div className="absolute z-20 w-[45%] min-w-fit bg-slate-800 rounded-md p-8">
      <h2 className="text-2xl text-center p-4">INFORMATION IMPORTANTE</h2>
      <p>
        Merci de conserver précieusement votre phrase de récupération.
        <div className="underline">
          ELLE NE VOUS SERA PLUS COMMUNIQUÉE PAR LA SUITE !
        </div>
      </p>
      <div className="my-4 p-4 bg-black">
        <code>{recovery}</code>
      </div>
      <input
        type="checkbox"
        onClick={() => setChecked(!checked)}
        defaultChecked={checked}
      />
      <span className="ml-4">J'ai pris connaissance de cette information</span>
      {checked && (
        <div className="my-4" onClick={() => setRecovery("")}>
          <Button path="dashboard" text="SUIVANT" />
        </div>
      )}
    </div>
  );
}
