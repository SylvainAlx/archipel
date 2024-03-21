/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from "jotai";
import DashTile from "../../../components/dashTile";
import TileContainer from "../../../components/tileContainer";
import H1 from "../../../components/titles/h1";
import { nationsListAtom, placesListAtom } from "../../../settings/store";
import { StringProps } from "../../../types/typProp";
import { useEffect, useState } from "react";
import H3 from "../../../components/titles/h3";
import { getNations } from "../../../api/nation/nationAPI";
import { getAllPlaces } from "../../../api/place/placeAPI";

export default function NationStatistics({ text }: StringProps) {
  const [nationsList] = useAtom(nationsListAtom);
  const [placeList] = useAtom(placesListAtom);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    if (nationsList.length > 0) {
      let points = 0;
      for (let i = 0; i < nationsList.length - 1; i++) {
        points += nationsList[i].data.roleplay.points;
      }
      setTotalPoints(points);
      if (nationsList[0]._id === "") {
        getNations("");
      }
    }
    if (placeList.length === 0) {
      getAllPlaces();
    }
  }, []);

  return (
    <>
      <H1 text={text} />
      {nationsList != undefined && (
        <TileContainer
          children={
            <>
              <DashTile
                title="Nombre total de nations virtuelles"
                children={<H3 text={nationsList.length.toString()} />}
              />
              <DashTile
                title="Nombre total de points Navir"
                children={<H3 text={totalPoints.toString()} />}
              />
              {placeList != undefined && (
                <DashTile
                  title="Nombre total de villes"
                  children={<H3 text={placeList.length.toString()} />}
                />
              )}
            </>
          }
        />
      )}
    </>
  );
}
