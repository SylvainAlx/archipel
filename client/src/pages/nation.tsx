import H1 from "../components/titles/h1";
import Links from "../components/nation/links";
import { lazy, Suspense } from "react";
import { FaExchangeAlt } from "react-icons/fa";
import CrossButton from "../components/buttons/crossButton";
import ReportPanel from "../components/reportPanel";
import EditButton from "../components/buttons/editButton";
import IdSkeleton from "../components/loading/skeletons/idSkeleton";
import MapSkeleton from "../components/loading/skeletons/mapSkeleton";
import TileSkeleton from "../components/loading/skeletons/tileSkeleton";
import CreditTransferButton from "../components/buttons/creditTransferButton";
import Button from "../components/buttons/button";
import { createPageTitle } from "../utils/procedures";
import { useNation } from "../hooks/pagesHooks/useNation";
import VerifiedTag from "../components/tags/verifiedTag";
import { RiVerifiedBadgeFill } from "react-icons/ri";

const NationIdentity = lazy(
  () => import("../components/nation/nationIdentity"),
);
const NationMap = lazy(() => import("../components/nation/nationMap"));
const FreeTiles = lazy(() => import("../components/nation/freeTiles"));
const Diplomacy = lazy(() => import("../components/nation/diplomacy"));
const Citizens = lazy(() => import("../components/nation/citizens"));
const Places = lazy(() => import("../components/nation/places"));
const NationComs = lazy(() => import("../components/nation/nationComs"));

export default function Nation() {
  const {
    nation,
    owner,
    nationPlaceList,
    handleDelete,
    giveOwnerShip,
    askOfficial,
    updatePath,
    t,
  } = useNation();

  createPageTitle(nation.name);

  return nation.officialId ? (
    <>
      <div className="w-full relative flex items-center justify-center gap-2">
        <H1 text={nation.name} />
        {owner && (
          <EditButton
            editBox={{
              target: "nation",
              original: nation.name,
              new: nation.name,
              path: "name",
              action: updatePath,
              canBeEmpty: false,
            }}
          />
        )}
        {nation.data.roleplay.officialOwner === nation.owner && <VerifiedTag />}
      </div>
      {!nation.reported && (
        <section className="w-full flex flex-wrap gap-8 items-start justify-between">
          <div className="w-full flex flex-col gap-3 items-center justify-center">
            <Links
              selectedNation={nation}
              owner={owner}
              updatePath={updatePath}
            />
            <CreditTransferButton target={nation} />
          </div>
          <Suspense fallback={<IdSkeleton />}>
            <NationIdentity
              selectedNation={nation}
              nationPlaceList={nationPlaceList}
              owner={owner}
              updatePath={updatePath}
            />
          </Suspense>
          <Suspense fallback={<MapSkeleton />}>
            <NationMap
              selectedNation={nation}
              owner={owner}
              updatePath={updatePath}
            />
          </Suspense>
          <Suspense fallback={<TileSkeleton />}>
            <FreeTiles selectedNation={nation} owner={owner} />
          </Suspense>
          <Suspense fallback={<TileSkeleton />}>
            <Diplomacy selectedNation={nation} owner={owner} />
          </Suspense>
          <Suspense fallback={<TileSkeleton />}>
            <Citizens selectedNation={nation} owner={owner} />
          </Suspense>
          <Suspense fallback={<TileSkeleton />}>
            <Places
              selectedNation={nation}
              nationPlaceList={nationPlaceList}
              owner={owner}
            />
          </Suspense>
          <Suspense fallback={<TileSkeleton />}>
            <NationComs selectedNation={nation} owner={owner} />
          </Suspense>
        </section>
      )}
      <section className="pt-10 flex flex-col items-center gap-4">
        {owner ? (
          <>
            <CrossButton
              text={t("components.buttons.delete")}
              click={handleDelete}
              disabled={nation.data.roleplay.citizens > 1}
            />
            <Button
              text={t("components.buttons.askOfficial")}
              click={askOfficial}
              children={<RiVerifiedBadgeFill />}
              disabled={nation.data.roleplay.officialOwner === nation.owner}
            />
            <Button
              text={t("components.buttons.giveOwnership")}
              click={giveOwnerShip}
              children={<FaExchangeAlt />}
              disabled={nation.data.roleplay.citizens < 2}
            />
          </>
        ) : (
          <ReportPanel content={nation} />
        )}
      </section>
    </>
  ) : (
    <em className="text-center">{t("pages.nation.noNation")}</em>
  );
}
