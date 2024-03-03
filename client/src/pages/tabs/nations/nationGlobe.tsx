/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import Globe from "react-globe.gl";
import { StringProps } from "../../../types/typProp";
import H1 from "../../../components/titles/h1";
import { color_primary } from "../../../settings/consts";
import { useAtom } from "jotai";
import { nationsListAtom } from "../../../settings/store";
import { useEffect, useRef, useState } from "react";
import { getNations } from "../../../utils/api";

export default function NationGlobe({ text }: StringProps) {
  const [nationsList] = useAtom(nationsListAtom);
  const container = useRef<HTMLDivElement>(null);
  const [largeur, setLargeur] = useState<number | undefined>(undefined);

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

  return (
    <>
      <H1 text={text} />

      <div ref={container} className="w-full flex items-center">
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
          backgroundColor={color_primary}
          showGraticules={true}
          showAtmosphere={false}
          showGlobe={false}
        />
      </div>
    </>
  );
}
