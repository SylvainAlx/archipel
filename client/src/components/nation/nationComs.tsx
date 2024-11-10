import { useTranslation } from "react-i18next";
import DashTile from "../dashTile";
import { SelectedNationProps } from "../../types/typProp";
import { useAtom } from "jotai";
import { comFetchedListAtom, myStore, newComAtom } from "../../settings/store";
import { getPublicComs } from "../../api/communication/comAPI";
import { lazy, Suspense, useEffect } from "react";
import BarreLoader from "../loading/barreLoader";
import Button from "../buttons/button";
import { FaComment } from "react-icons/fa";
import { ComPayload, emptyComPayload } from "../../types/typCom";

export default function NationComs({
  selectedNation,
  owner,
}: SelectedNationProps) {
  const { t } = useTranslation();
  const [nationComList] = useAtom(comFetchedListAtom);
  const ComTile = lazy(() => import("../tiles/comTile"));

  useEffect(() => {
    if (selectedNation != undefined) {
      getPublicComs(selectedNation.officialId);
    }
  }, [selectedNation]);

  const handleClick = () => {
    const newComPayload: ComPayload = {
      comType: 10,
      message: emptyComPayload.message,
      origin: selectedNation.officialId,
      destination: emptyComPayload.destination,
      title: emptyComPayload.title,
    };
    myStore.set(newComAtom, newComPayload);
  };

  return (
    <DashTile
      title={t("pages.nation.coms.title")}
      children={
        <section className="w-full flex flex-col items-center rounded">
          <div className="w-full flex flex-col gap-2 items-center">
            {owner && (
              <Button
                text={t("components.buttons.createCom")}
                children={<FaComment />}
                click={handleClick}
              />
            )}
            {nationComList.length > 0 ? (
              nationComList.map((com, i) => {
                return (
                  <Suspense key={i} fallback={<BarreLoader />}>
                    <div className="relative w-full">
                      <ComTile com={com} owner={owner ? owner : false} />
                    </div>
                  </Suspense>
                );
              })
            ) : (
              <em className="text-center">{t("pages.nation.coms.noComs")}</em>
            )}
          </div>
        </section>
      }
    />
  );
}
