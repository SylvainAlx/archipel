/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from "jotai";
import DashTile from "../../../components/dashTile";
import TileContainer from "../../../components/tileContainer";
import H1 from "../../../components/titles/h1";
import { statsAtom } from "../../../settings/store";
import { StringProps } from "../../../types/typProp";
import { useEffect } from "react";
import H3 from "../../../components/titles/h3";
import { getNationsCount } from "../../../api/nation/nationAPI";
import { getPlacesCount } from "../../../api/place/placeAPI";
import { getCitizensCount } from "../../../api/user/userAPI";

export default function NationStatistics({ text }: StringProps) {
  const [stats] = useAtom(statsAtom);

  useEffect(() => {
    if (stats.counts.nations === 0) {
      getNationsCount();
    }
    if (stats.counts.places === 0) {
      getPlacesCount();
    }
    if (stats.counts.citizens === 0) {
      getCitizensCount();
    }
  }, []);

  return (
    <>
      <H1 text={text} />

      <TileContainer
        children={
          <>
            <DashTile
              title="Nombre total de nations virtuelles"
              children={<H3 text={stats.counts.nations.toString()} />}
            />

            <DashTile
              title="Nombre total de lieux"
              children={<H3 text={stats.counts.places.toString()} />}
            />

            <DashTile
              title="Nombre total de citoyens"
              children={<H3 text={stats.counts.citizens.toString()} />}
            />
          </>
        }
      />
    </>
  );
}
