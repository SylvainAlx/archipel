/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import Globe from "react-globe.gl";
import { StringProps } from "../../../types/typProp";
import H1 from "../../../components/titles/h1";
import { useAtom } from "jotai";
import { nationsListAtom, selectedNationAtom } from "../../../settings/store";
import { useEffect, useRef, useState } from "react";
import { getNations } from "../../../utils/api";
import Button from "../../../components/button";
import { useNavigate } from "react-router-dom";

export default function NationGlobe({ text }: StringProps) {
  const [nationsList] = useAtom(nationsListAtom);
  const [selectedNation, setSelectedNation] = useAtom(selectedNationAtom);
  const [showInfos, setShowInfos] = useState<{
    id: string;
    flag: string;
    name: string;
    population: number;
    points: number;
  }>({ id: "", flag: "", name: "", population: -1, points: -1 });
  const container = useRef<HTMLDivElement>(null);
  const [largeur, setLargeur] = useState<number | undefined>(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    getNations("");
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (container.current) {
        const rect = container.current.getBoundingClientRect();
        setLargeur(rect.width);
      }
    };

    window.addEventListener("resize", handleResize);

    // Nettoyage de l'écouteur d'événement lors du démontage du composant
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClick = () => {
    navigate(`/dashboard/${selectedNation._id}`);
  };

  return (
    <>
      <H1 text={text} />

      <div
        onClick={() =>
          setShowInfos({
            id: "",
            flag: "",
            name: "",
            population: -1,
            points: -1,
          })
        }
        ref={container}
        className="relative w-[90%] max-w-3xl flex flex-col items-center rounded-xl border-2 border-secondary overflow-hidden"
      >
        {showInfos.name != "" && (
          <div className="z-20 absolute top-0 right-0 p-2 bg-complementary flex flex-col rounded">
            <div className="w-[70px] h-[50px]">
              <img
                className="w-full h-full object-cover"
                src={showInfos.flag}
              />
            </div>
            <div>Nom : {showInfos.name}</div>
            <div>Population : {showInfos.population}</div>
            <div>Points : {showInfos.points}</div>
            <Button text="VOIR" path="" click={handleClick} />
          </div>
        )}
        <Globe
          width={largeur}
          height={500}
          labelsData={nationsList}
          labelLat={(d: any): number => d.data.general.coords.lat}
          labelLng={(d: any): number => d.data.general.coords.lng}
          labelText={(d: any): string => d.name}
          labelSize={(d: any): number =>
            1.5 + d.data.roleplay.population / 1000
          }
          labelDotRadius={(d: any): number =>
            1 + d.data.roleplay.population / 1000
          }
          onLabelClick={(d: any) => {
            setSelectedNation(d);
            setShowInfos({
              id: d._id,
              flag: d.data.url.flag,
              name: d.name,
              population: d.data.roleplay.population,
              points: d.data.roleplay.points,
            });
          }}
          backgroundColor={"rgba(0,0,0,0.3)"}
          showGraticules={true}
          showAtmosphere={false}
          showGlobe={false}
        />
      </div>
    </>
  );
}
