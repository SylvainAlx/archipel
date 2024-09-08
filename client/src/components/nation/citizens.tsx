import { useTranslation } from "react-i18next";
import TileContainer from "../tileContainer";
import DashTile from "../dashTile";
import { lazy, Suspense, useEffect, useState } from "react";
import { changeStatus, getNationCitizens } from "../../api/user/userAPI";
import { SelectedNationProps } from "../../types/typProp";
import { nationCitizenListAtom, sessionAtom } from "../../settings/store";
import { useAtom } from "jotai";
import { User } from "../../types/typUser";
import BarreLoader from "../loading/barreLoader";
import Button from "../buttons/button";
import { FaPassport } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Citizens({ selectedNation }: SelectedNationProps) {
  const [nationCitizenList] = useAtom(nationCitizenListAtom);
  const [citizens, setCitizens] = useState<User[]>([]);
  const [session] = useAtom(sessionAtom);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const CitizenTile = lazy(() => import("../tiles/citizenTile"));

  useEffect(() => {
    if (selectedNation.officialId !== "") {
      getNationCitizens(selectedNation.officialId);
    }
  }, [selectedNation.officialId]);

  useEffect(() => {
    const updatedCitizens: User[] = [];
    nationCitizenList.forEach((citizen) => {
      updatedCitizens.push(citizen);
    });
    setCitizens(updatedCitizens.sort());
  }, [nationCitizenList, selectedNation.officialId]);

  const askCtz = () => {
    changeStatus({
      officialId: session.user.officialId,
      nationId: selectedNation.officialId,
      status: 0,
    });
    navigate("/explore");
  };

  return (
    <TileContainer
      children={
        <DashTile
          title={t("pages.nation.simulation.citizens")}
          className="w-full my-2"
          children={
            <>
              {session.user.citizenship.status === -1 && (
                <Button
                  text="Demander la citoyenneté"
                  click={askCtz}
                  children={<FaPassport />}
                />
              )}
              <div className="w-full flex flex-col-reverse gap-2 items-center">
                {citizens.length > 0 ? (
                  citizens.map((citizen, i) => {
                    return (
                      <Suspense key={i} fallback={<BarreLoader />}>
                        <div className="relative w-full">
                          <CitizenTile citizen={citizen} />
                        </div>
                      </Suspense>
                    );
                  })
                ) : (
                  <em className="text-center">
                    {t("pages.nation.simulation.noCitizens")}
                  </em>
                )}
              </div>
            </>
          }
        />
      }
    />
  );
}
