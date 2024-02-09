/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { SelectedNationProps } from "../../../types/typProp";
import DashTile from "../../dashTile";
import TileContainer from "../../tileContainer";
import H2 from "../../titles/h2";
import Tag from "../../tag";
import { MdAddCircle } from "react-icons/md";
import { getPoliticalSide } from "../../../utils/functions";
import EditIcon from "../../editIcon";
import { politicalSideList } from "../../../settings/consts";
import RoleplayTile from "./roleplayTile";

export default function Roleplay({
  selectedNation,
  owner,
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

  const addCredits = () => {
    alert("plus de thune !");
  };

  return (
    <TileContainer
      children={
        <>
          <H2 text="Roleplay" />
          <DashTile
            title="Score"
            children={
              <>
                <div className="w-full px-2 flex items-center justify-center gap-4">
                  <Tag
                    text={
                      selectedNation.data.roleplay.points.toString() + " points"
                    }
                    bgColor="bg-info"
                  />
                  <Tag
                    text={
                      "Crédits : " +
                      selectedNation.data.roleplay.credits.toString()
                    }
                    bgColor="bg-info"
                    children={
                      <span
                        className="text-2xl cursor-pointer"
                        onClick={addCredits}
                      >
                        <MdAddCircle />
                      </span>
                    }
                  />
                </div>
              </>
            }
          />
          <DashTile
            title="Orientation politique"
            children={
              <>
                <div className={`relative text-3xl flex flex-col items-center`}>
                  <em>
                    {getPoliticalSide(
                      selectedNation.data.roleplay.politicalSide,
                    )}
                  </em>
                  {owner && (
                    <EditIcon
                      param={politicalSideList}
                      path="data.roleplay.politicalSide"
                    />
                  )}
                </div>
              </>
            }
          />
          <DashTile
            title="Composantes"
            children={
              <>
                <RoleplayTile
                  owner={owner}
                  title="Citoyens"
                  target={
                    selectedNation.data.roleplay.citizens != undefined
                      ? selectedNation.data.roleplay.citizens
                      : []
                  }
                  cost={100}
                  benefit={1}
                />
              </>
            }
          />
        </>
      }
    />
  );
}
