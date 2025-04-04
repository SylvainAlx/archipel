import TileContainer from "../ui/tileContainer";
import DashTile from "../ui/dashTile";
import { lazy, Suspense } from "react";
import { SelectedNationProps } from "../../types/typProp";
import Button from "../ui/buttons/button";
import { FaPassport } from "react-icons/fa";
import TileSkeleton from "../ui/loading/skeletons/tileSkeleton";
import useCitizens from "../../hooks/componentsHooks/nation/useCitizens";

export default function Citizens({ selectedNation }: SelectedNationProps) {
  const CitizenTile = lazy(() => import("../ui/tiles/citizenTile"));
  const { askCtz, session, nationUsers, t } = useCitizens(selectedNation);

  return (
    <TileContainer>
      <DashTile
        title={t("pages.nation.citizens.title")}
        className="w-full min-w-[300px] flex-grow"
      >
        <>
          {session.user.citizenship.status === -1 &&
            session.user.officialId != "" && (
              <Button
                text={t("components.buttons.askCitizenship")}
                click={askCtz}
              >
                <FaPassport />
              </Button>
            )}
          <div className="w-full flex flex-col-reverse gap-2 items-center">
            {nationUsers.getItems().length > 0 ? (
              nationUsers.getItems().map((citizen, i) => {
                if (
                  citizen.citizenship.nationId === selectedNation.officialId
                ) {
                  return (
                    <Suspense key={i} fallback={<TileSkeleton />}>
                      <div className="relative w-full">
                        <CitizenTile citizen={citizen} />
                      </div>
                    </Suspense>
                  );
                }
              })
            ) : (
              <em className="text-center">
                {t("pages.nation.citizens.noCitizens")}
              </em>
            )}
          </div>
        </>
      </DashTile>
    </TileContainer>
  );
}
