/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import Globe from "react-globe.gl";
import { StringProps } from "../../../types/typProp";
import H1 from "../../../components/titles/h1";
import { useAtom } from "jotai";
import { nationsListAtom, selectedNationAtom } from "../../../settings/store";
import { useEffect, useRef, useState } from "react";
import Button from "../../../components/button";
import { useNavigate } from "react-router-dom";
import { GiBlackFlag } from "react-icons/gi";
import { getNations } from "../../../api/nation/nationAPI";

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
  const globe = useRef<any>(null);
  const [largeur, setLargeur] = useState<number | undefined>(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    if (nationsList.length === 0) {
      getNations("");
    }
  }, []);

  useEffect(() => {
    globe.current.controls().autoRotate = true;
    globe.current.controls().autoRotateSpeed = 0.3;
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
        className="relative w-[90%] flex flex-col items-center rounded-xl overflow-hidden shadow-xl"
      >
        {showInfos.name != "" && (
          <div className="z-20 absolute top-0 right-0 p-2 bg-complementary flex flex-col rounded gap-1">
            <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
              {showInfos.flag != "" ? (
                <img
                  className="w-full h-full object-cover"
                  src={showInfos.flag}
                />
              ) : (
                <div className="text-[3.1rem]">
                  <GiBlackFlag />
                </div>
              )}
            </div>
            <div className="text-lg">{showInfos.name}</div>
            <div className="text-sm">
              <div>Population : {showInfos.population}</div>
              <div>Points : {showInfos.points}</div>
            </div>
            <Button text="VOIR" path="" click={handleClick} />
          </div>
        )}
        <Globe
          ref={globe}
          width={largeur}
          height={500}
          labelsData={nationsList}
          labelLat={(d: any): number => d.data.general.coords.lat}
          labelLng={(d: any): number => d.data.general.coords.lng}
          labelText={(d: any): string => d.name}
          labelSize={(d: any): number => 2 + d.data.roleplay.population / 1000}
          labelDotRadius={(d: any): number =>
            2 + d.data.roleplay.population / 1000
          }
          labelColor={() => "rgb(0, 129, 138)"}
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
