import { useAtom } from "jotai";
import { infoModal } from "../../utils/store";
import Button from "../button";

export default function InfoModal(){
    const [info,] = useAtom(infoModal)
    return (
            <>
              <h2 className="text-2xl text-center p-4">INFORMATION</h2>
              <p className="text-center">{info}</p>
              <Button path="info" text="FERMER" />
            </>
    )
}