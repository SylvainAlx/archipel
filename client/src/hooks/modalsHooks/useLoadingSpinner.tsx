import { useAtom } from "jotai";
import { longLoadingAtom } from "../../settings/store";
import { useEffect } from "react";

export function useLoadingSpinner() {
  const [longLoading, setLongLoading] = useAtom(longLoadingAtom);
  useEffect(() => {
    setTimeout(() => {
      setLongLoading(true);
    }, 2000);

    return setLongLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {
    longLoading,
  };
}
