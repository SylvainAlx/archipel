/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { SelectedNationProps } from "../../../types/typProp";
import DashTile from "../../dashTile";
import TileContainer from "../../tileContainer";
import H2 from "../../titles/h2";
import Tag from "../../tag";
import { MdAddCircle } from "react-icons/md";
import { getPoliticalSide } from "../../../utils/functions";
import EditIcon from "../../editIcon";
import {
  SERVEUR_LOADING_STRING,
  politicalSideList,
} from "../../../settings/consts";
import {
  citizensListAtom,
  infoModal,
  loadingSpinner,
  placesListAtom,
} from "../../../settings/store";
import { useAtom } from "jotai";
import {
  getNationCitizensFetch,
  getNationPlacesFetch,
} from "../../../utils/fetch";
import RoleplayTile from "./roleplayTile";

export default function Roleplay({
  selectedNation,
  owner,
}: SelectedNationProps) {
  const [citizensList, setCitizensList] = useAtom(citizensListAtom);
  const [placesList, setPlacesList] = useAtom(placesListAtom);
  const [, setLoading] = useAtom(loadingSpinner);
  const [, setInfo] = useAtom(infoModal);

  useEffect(() => {
    if (citizensList.length < 1) {
      setLoading({ show: true, text: SERVEUR_LOADING_STRING });
      getNationCitizensFetch(selectedNation._id)
        .then((data) => {
          setLoading({ show: false, text: SERVEUR_LOADING_STRING });
          setCitizensList(data);
        })
        .catch((error) => {
          setLoading({ show: false, text: SERVEUR_LOADING_STRING });
          setInfo(error.message);
        });
    }
    if (placesList.length < 1) {
      setLoading({ show: true, text: SERVEUR_LOADING_STRING });
      getNationPlacesFetch(selectedNation._id)
        .then((data) => {
          setLoading({ show: false, text: SERVEUR_LOADING_STRING });
          setPlacesList(data);
        })
        .catch((error) => {
          setLoading({ show: false, text: SERVEUR_LOADING_STRING });
          setInfo(error.message);
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
                  target={citizensList}
                  cost={100}
                  benefit={1}
                />
                <RoleplayTile
                  owner={owner}
                  title="Lieux"
                  target={placesList}
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
