/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useEffect, useState } from "react";
import { SelectedNationProps } from "../../../types/typProp";
import DashTile from "../../dashTile";
import TileContainer from "../../tileContainer";
import H2 from "../../titles/h2";
import H3 from "../../titles/h3";
import { Distribution } from "../../../types/typNation";

export default function PointsDistribution({
  selectedNation,
  owner,
}: SelectedNationProps) {
  const [points, setPoints] = useState(selectedNation.data.roleplay.points);
  const [unusedPoints, setUnusedPoints] = useState(
    selectedNation.data.roleplay.unusedPoints,
  );
  const [distribution, setDistribution] = useState<Distribution>(
    selectedNation.data.roleplay.pointsDistribution,
  );

  useEffect(() => {
    setUnusedPoints(
      selectedNation.data.roleplay.unusedPoints -
        distribution.citizens -
        distribution.structures,
    );
    setPoints(
      selectedNation.data.roleplay.points +
        distribution.citizens +
        distribution.structures,
    );
  }, [distribution]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (unusedPoints > 0) {
      const newValue = Number(e.target.value);
      const name = e.target.name;
      const updatedElement = { ...distribution, [name]: newValue };
      setDistribution(updatedElement);
    } else {
      const newValue = Number(e.target.value);
      const name = e.target.name;
      Object.entries(distribution).map(([key, value]) => {
        if (name === key && newValue < value) {
          const updatedElement = { ...distribution, [name]: newValue };
          setDistribution(updatedElement);
        }
      });
    }
  };

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
            title="Points non attribués"
            className={unusedPoints < 0 ? "text-danger" : ""}
            children={
              <>
                <H3 text={unusedPoints.toString()} />
              </>
            }
          />
          <DashTile
            title="Distribution"
            className="w-full"
            children={
              <>
                <div className="w-[70%] max-w-[600px] flex flex-col items-start justify-around">
                  {Object.entries(distribution).map(([key, value], i) => {
                    return (
                      <div key={i} className="w-full flex justify-between">
                        <span>{key}</span>
                        <span>{value}</span>
                        {owner && (
                          <input
                            type="range"
                            id={i.toString()}
                            name={key}
                            value={value}
                            max={
                              selectedNation.data.roleplay.unusedPoints >= value
                                ? selectedNation.data.roleplay.unusedPoints
                                : value
                            }
                            onChange={handleChange}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            }
          />
        </>
      }
    />
  );
}
