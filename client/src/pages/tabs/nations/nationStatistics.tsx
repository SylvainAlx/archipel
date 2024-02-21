import { useAtom } from "jotai";
import DashTile from "../../../components/dashTile";
import TileContainer from "../../../components/tileContainer";
import H1 from "../../../components/titles/h1";
import {
  infoModal,
  loadingSpinner,
  myStore,
  nationsListAtom,
} from "../../../settings/store";
import { StringProps } from "../../../types/typProp";
import { useEffect, useState } from "react";
import { getAllNations } from "../../../utils/fetch";
import H3 from "../../../components/titles/h3";
import { SERVEUR_LOADING_STRING } from "../../../settings/consts";

export default function NationStatistics({ text }: StringProps) {
  const [nationsList, setNationsList] = useAtom(nationsListAtom);
  const [, setInfo] = useAtom(infoModal);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    if (nationsList.length > 0) {
      let points = 0;
      for (let i = 0; i < nationsList.length - 1; i++) {
        points += nationsList[i].data.roleplay.points;
      }
      setTotalPoints(points);
      if (nationsList[0]._id === "") {
        myStore.set(loadingSpinner, {
          show: true,
          text: SERVEUR_LOADING_STRING,
        });
        getAllNations("")
          .then((data) => {
            myStore.set(loadingSpinner, { show: false, text: "" });
            if (data != undefined) {
              setNationsList(data);
            }
          })
          .catch((error) => {
            myStore.set(loadingSpinner, { show: false, text: "" });
            setInfo(error.message);
          });
      }
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
            </>
          }
        />
      )}
    </>
  );
}
