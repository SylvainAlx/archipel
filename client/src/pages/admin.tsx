import { useEffect } from "react";
import H1 from "../components/titles/h1";
import { paramsListAtom } from "../settings/store";
import { useAtom } from "jotai";
import { getAllParams } from "../api/param/paramAPI";
import H2 from "../components/titles/h2";
import TileContainer from "../components/tileContainer";
import DashTile from "../components/dashTile";

export default function Admin() {
  const [paramsList] = useAtom(paramsListAtom);

  useEffect(() => {
    if (paramsList.length === 0) {
      getAllParams();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <H1 text="Administration" />
      <H2 text="Paramètres" />
      <TileContainer
        children={
          <>
            {paramsList.map((param, i) => {
              return (
                <div key={i}>
                  <DashTile
                    title={param.name}
                    children={
                      <>
                        {param.props.map((prop, j) => {
                          return (
                            <div
                              key={j}
                              className="w-full flex items-center justify-between"
                            >
                              <p>{prop.label}</p>
                              <p className="text-right">{prop.value}</p>
                            </div>
                          );
                        })}
                      </>
                    }
                  />
                </div>
              );
            })}
          </>
        }
      />
    </>
  );
}
