/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { SelectedNationProps } from "../../../types/typProp";
import DashTile from "../../dashTile";
import TileContainer from "../../tileContainer";
import H2 from "../../titles/h2";
import H3 from "../../titles/h3";

export default function DashStatistics({
  selectedNation,
}: SelectedNationProps) {
  const [locationCount, setLocationCount] = useState(0);

  useEffect(() => {
    if (selectedNation.data.roleplay.structures) {
      selectedNation.data.roleplay.structures.map((structure) => {
        if (structure.type === 1) {
          setLocationCount(locationCount + 1);
        }
      });
    }
  }, []);

  return (
    <TileContainer
      children={
        <>
          <H2 text="Statistiques" />
          <DashTile
            title="Total points Navir"
            children={
              <>
                <H3 text={selectedNation.data.roleplay.points.toString()} />
              </>
            }
          />
          <DashTile
            title="Crédits"
            children={
              <>
                <H3 text={selectedNation.data.roleplay.credits.toString()} />
              </>
            }
          />
          <DashTile
            title="Citoyens"
            children={
              <>
                {selectedNation.data.roleplay.citizens ? (
                  <H3
                    text={selectedNation.data.roleplay.citizens.length.toString()}
                  />
                ) : (
                  <H3 text="0" />
                )}
              </>
            }
          />
          <DashTile
            title="Lieux"
            children={<H3 text={locationCount.toString()} />}
          />
        </>
      }
    />
  );
}
