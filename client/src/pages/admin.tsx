import { Suspense, useEffect, useState } from "react";
import H1 from "../components/titles/h1";
import { comFetchedListAtom, paramsListAtom } from "../settings/store";
import { useAtom } from "jotai";
import { getAllParams } from "../api/param/paramAPI";
import H2 from "../components/titles/h2";
import TileContainer from "../components/tileContainer";
import DashTile from "../components/dashTile";
import BarreLoader from "../components/loading/barreLoader";
import AdminComTile from "../components/tiles/adminComTile";
import IndexTag from "../components/tags/indexTag";
import Button from "../components/buttons/button";
import { useTranslation } from "react-i18next";
import { getAdminComs } from "../api/admin/adminAPI";

export default function Admin() {
  const [paramsList] = useAtom(paramsListAtom);
  const [adminComs] = useAtom(comFetchedListAtom);
  const [displayedComs, setDisplayedComs] = useState(10);
  const { t } = useTranslation();

  useEffect(() => {
    if (adminComs.length === 0) {
      getAdminComs();
    }
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
      <section className="w-full flex gap-1 flex-wrap items-center flex-col-reverse">
        {adminComs != undefined &&
          adminComs.length > 0 &&
          adminComs.map((com, i) => {
            if (i < displayedComs) {
              return (
                <Suspense key={i} fallback={<BarreLoader />}>
                  <div className="min-w-[300px] w-full relative transition-all duration-300 animate-fadeIn">
                    <AdminComTile com={com} />
                    <IndexTag text={i} />
                  </div>
                </Suspense>
              );
            }
          })}
      </section>
      {displayedComs < adminComs.length && (
        <Button
          click={() => setDisplayedComs(displayedComs + 5)}
          text={t("components.buttons.showMore")}
        />
      )}
    </>
  );
}
