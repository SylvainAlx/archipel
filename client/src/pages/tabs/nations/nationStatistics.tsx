/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from "jotai";
import DashTile from "../../../components/dashTile";
import TileContainer from "../../../components/tileContainer";
import H1 from "../../../components/titles/h1";
import { nationsListAtom, placesListAtom } from "../../../settings/store";
import { StringProps } from "../../../types/typProp";
import { useEffect } from "react";
import H3 from "../../../components/titles/h3";
import { getNations } from "../../../api/nation/nationAPI";
import { getAllPlaces } from "../../../api/place/placeAPI";

export default function NationStatistics({ text }: StringProps) {
  const [nationsList] = useAtom(nationsListAtom);
  const [placeList] = useAtom(placesListAtom);

  useEffect(() => {
    if (nationsList.length > 0) {
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
