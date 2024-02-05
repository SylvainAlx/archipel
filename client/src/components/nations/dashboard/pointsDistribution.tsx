/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { SelectedNationProps } from "../../../types/typProp";
import DashTile from "../../dashTile";
import TileContainer from "../../tileContainer";
import H2 from "../../titles/h2";
import H3 from "../../titles/h3";

export default function PointsDistribution({
  selectedNation,
}: SelectedNationProps) {
  const [points] = useState(selectedNation.data.roleplay.points);
  const [credits] = useState(selectedNation.data.roleplay.credits);

  return (
    <TileContainer
      children={
        <>
          <H2 text="Distribution des points" />
          <DashTile
            title="Total points Navir"
            children={
              <>
                <H3 text={points.toString()} />
              </>
            }
          />
          <DashTile
            title="Crédits"
            children={
              <>
                <H3 text={credits.toString()} />
              </>
            }
          />
        </>
      }
    />
  );
}
