/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import H1 from "../components/titles/h1";
import { getTop100 } from "../utils/fetch";
import { loadingSpinner, selectedNation } from "../settings/store";
import { useAtom } from "jotai";
import PublicNationTile from "../components/nations/publicNationTile";
import { useNavigate } from "react-router-dom";
import { EmptyNation, Nation } from "../types/typNation";

export default function Nations() {
  const [nationsList, setNationsList] = useState<Nation[]>([EmptyNation]);
  const [, setLoading] = useAtom(loadingSpinner);
  const [, setNation] = useAtom(selectedNation);

  const navigate = useNavigate();

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
              <div
                key={i}
                onClick={() => {
                  setNation(nation);
                  navigate("/dashboard");
                }}
              >
                <PublicNationTile
                  name={nation.name}
                  _id={nation._id}
                  role={nation.role}
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
