import H1 from "../../components/ui/titles/h1";
import { lazy, Suspense } from "react";
import EditButton from "../../components/ui/buttons/editButton";
import ReportPanel from "../../components/ui/reportPanel";
import { createPageTitle } from "../../utils/procedures";
import IdSkeleton from "../../components/ui/loading/skeletons/idSkeleton";
import TileSkeleton from "../../components/ui/loading/skeletons/tileSkeleton";
import ParamSkeleton from "../../components/ui/loading/skeletons/paramSkeleton";
import { useCitizen } from "../../hooks/pagesHooks/useCitizen";

export default function Citizen() {
  const Personal = lazy(() => import("../../components/citizen/personal"));
  const Citizenship = lazy(
    () => import("../../components/citizen/citizenship"),
  );
  const Settings = lazy(() => import("../../components/citizen/settings"));
  const CitizenCom = lazy(() => import("../../components/citizen/citizensCom"));

  const { citizen, nation, owner, setCitizen, updatePath, t } = useCitizen();

  createPageTitle(citizen.name);

  return citizen.officialId ? (
    <>
      <div className="flex items-center gap-1">
        <H1 text={citizen.name} />
        {owner && (
          <EditButton
            editBox={{
              target: "citizen",
              original: citizen.name,
              new: citizen.name,
              path: "name",
              action: updatePath,
              canBeEmpty: false,
            }}
          />
        )}
      </div>
      <section className="w-full flex flex-wrap gap-8 items-start justify-between">
        {(!citizen.reported || owner) && (
          <>
            <Suspense fallback={<IdSkeleton />}>
              <Personal
                citizen={citizen}
                owner={owner}
                updatePath={updatePath}
              />
            </Suspense>
            <Suspense fallback={<ParamSkeleton />}>
              <Citizenship
                citizen={citizen}
                setCitizen={setCitizen}
                nation={nation}
                owner={owner}
                updatePath={updatePath}
              />
            </Suspense>
          </>
        )}
        {owner ? (
          <Suspense fallback={<ParamSkeleton />}>
            <Settings citizen={citizen} />
          </Suspense>
        ) : (
          <div className="w-full flex justify-center">
            <ReportPanel content={citizen} />
          </div>
        )}
        {owner && (
          <Suspense fallback={<TileSkeleton />}>
            <CitizenCom citizen={citizen} />
          </Suspense>
        )}
      </section>
    </>
  ) : (
    <em className="text-center">{t("pages.citizen.noCitizen")}</em>
  );
}
