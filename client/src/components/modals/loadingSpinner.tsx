// import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";
import { loadingAtom, longLoadingAtom, myStore } from "../../settings/store";
import Button from "../buttons/button";
import Spinner from "../loading/spinner";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { useModal } from "../../hooks/useModal";

export default function LoadingSpinner() {
  const { t } = useTranslation();
  const [longLoading, setLongLoading] = useAtom(longLoadingAtom);
  const modalRef = useModal(() => myStore.set(loadingAtom, false));

  useEffect(() => {
    setTimeout(() => {
      setLongLoading(true);
    }, 2000);

    return setLongLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={modalRef}
      className="flex flex-col justify-center items-center gap-4"
    >
      {longLoading && (
        <div className="animate-fadeIn">
          <h2 className="text-2xl text-center p-4">
            {t("components.modals.loadingModal.title")}
          </h2>
          <p className="text-center text-lg">
            {t("components.modals.loadingModal.information")}
          </p>
        </div>
      )}
      <Spinner showClock={longLoading} />
      {longLoading && (
        <Button
          text={t("components.buttons.cancel")}
          click={() => myStore.set(loadingAtom, false)}
        />
      )}
    </div>
  );
}
