// import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";
import { loadingAtom, myStore } from "../../settings/store";
import Button from "../buttons/button";
import Spinner from "../loading/spinner";
import { useEffect, useState } from "react";

export default function LoadingSpinner() {
  const { t } = useTranslation();
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowMore(true);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      {showMore && (
        <div>
          <h2 className="animate-fadeIn text-2xl text-center p-4">
            {t("components.modals.loadingModal.title")}
          </h2>
          <p className="text-center">
            {t("components.modals.loadingModal.information")}
          </p>
        </div>
      )}
      <Spinner />
      {showMore && (
        <Button
          text={t("components.buttons.cancel")}
          click={() => myStore.set(loadingAtom, false)}
        />
      )}
    </div>
  );
}
