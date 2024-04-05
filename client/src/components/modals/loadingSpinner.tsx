// import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";
import { loadingAtom, myStore } from "../../settings/store";
import Button from "../buttons/button";
import Spinner from "../loading/spinner";

export default function LoadingSpinner() {
  const { t } = useTranslation();

  const handleClick = () => {
    myStore.set(loadingAtom, false);
  };

  return (
    <>
      <h2 className="animate-fadeIn text-2xl text-center p-4">
        {t("components.modals.loadingModal.title")}
      </h2>
      <p className="text-center">
        {t("components.modals.loadingModal.information")}
      </p>
      <Spinner />
      <div onClick={handleClick}>
        <Button path="/" text={t("components.buttons.cancel")} />
      </div>
    </>
  );
}
