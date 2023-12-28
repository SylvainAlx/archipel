/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import H1 from "../components/titles/h1";
import { getTop100 } from "../utils/fetch";
import { loadingSpinner } from "../settings/store";
import { useAtom } from "jotai";
import PublicNationTile from "../components/nations/publicNationTile";
import { NationProps } from "../types/typProp";

export default function Nations() {
  const [nationsList, setNationsList] = useState<NationProps[]>([
    { _id: "", name: "", data: [], createdAt: "" },
  ]);
  const [, setLoading] = useAtom(loadingSpinner);

  useEffect(() => {
    setLoading({ show: true, text: "Connexion au serveur" });
    getTop100()
      .then((data) => {
        setLoading({ show: false, text: "Connexion au serveur" });
        if (data != undefined) {
          setNationsList(data);
        }
      })
      .catch((error) => alert(error.message));
  }, []);

  return (
    <>
      <H1 text="Liste des nations" />
      <section className="w-full px-4 flex gap-4 flex-wrap items-center justify-evenly">
        {nationsList != undefined &&
          nationsList.map((nation, i) => {
            return (
              <div key={i}>
                <PublicNationTile
                  name={nation.name}
                  _id={nation._id}
                  data={nation.data}
                  createdAt={nation.createdAt}
                />
              </div>
            );
          })}
      </section>
    </>
  );
}
