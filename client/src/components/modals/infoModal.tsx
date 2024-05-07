import { useAtom } from "jotai";
import Button from "../buttons/button";
import { infoModalAtom, myStore } from "../../settings/store";

export default function InfoModal() {
  const [info] = useAtom(infoModalAtom);
  return (
    <>
      <h2 className="text-2xl text-center p-4">INFORMATION</h2>
      <p className="text-center">{info}</p>
      <Button text="FERMER" click={() => myStore.set(infoModalAtom, "")} />
    </>
  );
}
