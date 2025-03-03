// import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";
import { loadingAtom, myStore } from "../../settings/store";
import Button from "../../components/buttons/button";
import Spinner from "../../components/loading/spinner";
import { useModal } from "../../hooks/useModal";
import { useLoadingSpinner } from "../../hooks/modalsHooks/useLoadingSpinner";

export default function LoadingSpinner() {
  const { t } = useTranslation();
  const { longLoading } = useLoadingSpinner();
  const modalRef = useModal(() => myStore.set(loadingAtom, false));

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
