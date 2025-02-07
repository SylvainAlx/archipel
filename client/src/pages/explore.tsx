import { lazy, Suspense, useEffect, useState } from "react";
import TabNav from "../components/tabNav";
import { useTranslation } from "react-i18next";
import { StandardOption } from "../types/typAtom";
import { useParams } from "react-router-dom";
import { createPageTitle } from "../utils/procedures";
import ParamSkeleton from "../components/loading/skeletons/paramSkeleton";

export default function Explore() {
  const { t } = useTranslation();
  const nationTabs: StandardOption[] = [
    { id: 1, label: t("pages.explore.stats.title") },
    { id: 2, label: t("pages.explore.nationsList.title") },
    { id: 3, label: t("pages.explore.citizensList.title") },
    { id: 4, label: t("pages.explore.placesList.title") },
    { id: 5, label: t("pages.explore.comsList.title") },
  ];

  const [tab, setTab] = useState(nationTabs[0]);
  const param = useParams();

  const Stats = lazy(() => import("./exploreTabs/stats"));
  const NationList = lazy(() => import("./exploreTabs/nationList"));
  const CitizenList = lazy(() => import("./exploreTabs/citizenList"));
  const PlaceList = lazy(() => import("./exploreTabs/placeList"));
  const ComList = lazy(() => import("./exploreTabs/comList"));

  createPageTitle(tab.label);

  useEffect(() => {
    if (param.id != undefined) {
      setTab(nationTabs[Number(param.id) - 1]);
    }
  }, [param.id]);

  return (
    <>
      <div className="flex items-center">
        <TabNav tabs={nationTabs} tabId={tab.id} />
      </div>
      {tab.id === 1 && (
        <Suspense fallback={<ParamSkeleton />}>
          <Stats text={tab.label} />
        </Suspense>
      )}
      {tab.id === 2 && (
        <Suspense fallback={<ParamSkeleton />}>
          <NationList text={tab.label} />
        </Suspense>
      )}
      {tab.id === 3 && (
        <Suspense fallback={<ParamSkeleton />}>
          <CitizenList text={tab.label} />
        </Suspense>
      )}
      {tab.id === 4 && (
        <Suspense fallback={<ParamSkeleton />}>
          <PlaceList text={tab.label} />
        </Suspense>
      )}
      {tab.id === 5 && (
        <Suspense fallback={<ParamSkeleton />}>
          <ComList text={tab.label} />
        </Suspense>
      )}
    </>
  );
}
