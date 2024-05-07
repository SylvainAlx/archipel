import { useAtom } from "jotai";
import { recoveryKey } from "../../settings/store";
import Button from "../buttons/button";
import { useState } from "react";

export function RecoveryModal() {
  const [recovery, setRecovery] = useAtom(recoveryKey);
  const [checked, setChecked] = useState(false);
  return (
    <>
      <h2 className="text-2xl text-center p-4">INFORMATION IMPORTANTE</h2>
      <p>Merci de conserver précieusement votre phrase de récupération.</p>
      <p className="underline">
        ELLE NE VOUS SERA PLUS COMMUNIQUÉE PAR LA SUITE !
      </p>
      <div className="my-4 p-4 bg-black">
        <code>{recovery}</code>
      </div>
      <div>
        <input
          type="checkbox"
          onClick={() => setChecked(!checked)}
          defaultChecked={checked}
        />
        <span className="ml-4">
          J'ai pris connaissance de cette information
        </span>
      </div>
      {checked && (
        <div className="my-4" onClick={() => setRecovery("")}>
          <Button text="J'AI COMPRIS" />
        </div>
      )}
    </>
  );
}
