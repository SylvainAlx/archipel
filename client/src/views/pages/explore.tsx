import { lazy, Suspense } from "react";
import TabNav from "../../components/tabNav";
import { useNavigate } from "react-router-dom";
import { createPageTitle } from "../../utils/procedures";
import ParamSkeleton from "../../components/loading/skeletons/paramSkeleton";
import { useExplore } from "../../hooks/pagesHooks/useExplore";

export default function Explore() {
  const navigate = useNavigate();

  const Stats = lazy(() => import("../exploreTabs/stats"));
  const NationList = lazy(() => import("../exploreTabs/nationList"));
  const CitizenList = lazy(() => import("../exploreTabs/citizenList"));
  const PlaceList = lazy(() => import("../exploreTabs/placeList"));
  const ComList = lazy(() => import("../exploreTabs/comList"));
  const { tab, nationTabs } = useExplore();

  createPageTitle(tab.label);

  return (
    <>
      <div className="flex items-center">
        <TabNav
          tabs={nationTabs}
          tabId={tab.id}
          click={(id) => navigate(`/explore/${id.toString()}`)}
        />
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
