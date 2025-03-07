import { useAtom } from "jotai";
import { infoModalAtom, myStore } from "../../settings/store";
import { emptyInfo } from "../../types/typAtom";

export function useInfoModal() {
  const [info] = useAtom(infoModalAtom);
  const handleClose = () => {
    myStore.set(infoModalAtom, emptyInfo);
  };
  return {
    info,
    handleClose,
  };
}
