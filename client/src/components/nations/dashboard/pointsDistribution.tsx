import { SelectedNationProps } from "../../../types/typProp";
import DashTile from "../../dashTile";
import TileContainer from "../../tileContainer";
import H3 from "../../titles/h3";

export default function PointsDistribution({
  selectedNation,
}: SelectedNationProps) {
  return (
    <TileContainer
      children={
        <>
          <DashTile
            title="Total points Navir"
            children={
              <>
                <H3 text={selectedNation.data.roleplay.points.toString()} />
              </>
            }
          />
          <DashTile
            title="Points non attribués"
            children={
              <>
                <H3
                  text={selectedNation.data.roleplay.unusedPoints.toString()}
                />
              </>
            }
          />
        </>
      }
    />
  );
}
