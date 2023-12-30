/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import H1 from "../components/titles/h1";
import { getTop100 } from "../utils/fetch";
import {
  loadingSpinner,
  nationsListAtom,
  selectedNationAtom,
} from "../settings/store";
import { useAtom } from "jotai";
import PublicNationTile from "../components/nations/publicNationTile";
import { useNavigate } from "react-router-dom";

export default function Nations() {
  const [nationsList, setNationsList] = useAtom(nationsListAtom);
  const [, setLoading] = useAtom(loadingSpinner);
  const [, setNation] = useAtom(selectedNationAtom);

  const navigate = useNavigate();

  useEffect(() => {
    if (nationsList[0]._id === "") {
      setLoading({ show: true, text: "Connexion au serveur" });
      getTop100()
        .then((data) => {
          setLoading({ show: false, text: "Connexion au serveur" });
          if (data != undefined) {
            setNationsList(data);
          }
        })
        .catch((error) => alert(error.message));
    }
  }, []);

  return (
    <>
      <H1 text="Liste des nations" />
      <section className="w-full px-4 flex gap-4 flex-wrap items-center flex-col md:flex-row md:justify-between">
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
                  role={nation.role}
                  data={nation.data}
                />
              </div>
            );
          })}
      </section>
    </>
  );
}
