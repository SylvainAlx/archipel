import { useAtom } from "jotai";
import { bannedCitizensAtom, paramsListAtom } from "../../settings/store";
import DashTile from "../dashTile";
import TileContainer from "../tileContainer";
import H2 from "../titles/h2";
import { useEffect } from "react";
import { getBannedUsers } from "../../api/admin/adminAPI";
import { getAllParams } from "../../api/param/paramAPI";

export default function AdminParams() {
  const [paramsList] = useAtom(paramsListAtom);
  const [bannedUsers] = useAtom(bannedCitizensAtom);
  useEffect(() => {
    if (paramsList.length === 0) {
      getAllParams();
    }
    if (bannedUsers.length === 0) {
      getBannedUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <TileContainer
      children={
        <>
          <H2 text="Paramètres" />
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
  );
}
