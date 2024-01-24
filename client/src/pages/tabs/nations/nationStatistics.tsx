import { useAtom } from "jotai";
import DashTile from "../../../components/dashTile";
import TileContainer from "../../../components/tileContainer";
import H1 from "../../../components/titles/h1";
import {
  infoModal,
  loadingSpinner,
  nationsListAtom,
} from "../../../settings/store";
import { StringProps } from "../../../types/typProp";
import { useEffect, useState } from "react";
import { getAllNations } from "../../../utils/fetch";
import H3 from "../../../components/titles/h3";

export default function NationStatistics({ text }: StringProps) {
  const [nationsList, setNationsList] = useAtom(nationsListAtom);
  const [, setLoading] = useAtom(loadingSpinner);
  const [, setInfo] = useAtom(infoModal);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    if (nationsList.length > 0) {
      let points = 0;
      for (let i = 0; i < nationsList.length - 1; i++) {
        points += nationsList[i].data.general.points;
      }
      setTotalPoints(points);
      if (nationsList[0]._id === "") {
        setLoading({ show: true, text: "Connexion au serveur" });
        getAllNations("")
          .then((data) => {
            setLoading({ show: false, text: "Connexion au serveur" });
            if (data != undefined) {
              setNationsList(data);
            }
          })
          .catch((error) => {
            setLoading({ show: false, text: "Connexion au serveur" });
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
