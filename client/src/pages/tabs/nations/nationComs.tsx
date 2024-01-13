/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import H1 from "../../../components/titles/h1";
import { StringProps } from "../../../types/typProp";
import {
  comsListAtom,
  infoModal,
  loadingSpinner,
} from "../../../settings/store";
import { useAtom } from "jotai";
import { getAllComs } from "../../../utils/fetch";

export default function NationComs({ text }: StringProps) {
  const [, setLoading] = useAtom(loadingSpinner);
  const [, setInfo] = useAtom(infoModal);
  const [comsList, setComsList] = useAtom(comsListAtom);

  useEffect(() => {
    if (comsList[0].originName === "") {
      setLoading({ show: true, text: "Connexion au serveur" });
      getAllComs()
        .then((data) => {
          setLoading({ show: false, text: "Connexion au serveur" });
          if (data != undefined) {
            setComsList(data);
          }
        })
        .catch((error) => {
          setLoading({ show: false, text: "Connexion au serveur" });
          setInfo(error.message);
        });
    }
  }, []);

  const dateToString = (date: Date) => {
    const createdAtDate: Date = new Date(date);
    return createdAtDate.toLocaleString("fr");
  };

  return (
    <>
      <H1 text={text} />
      <section className="w-[80%] min-w-[300px] flex flex-col-reverse justify-center gap-2 items-center text-sm">
        {comsList != undefined &&
          comsList.map((com, i) => {
            return (
              <div
                key={i}
                className={`rounded w-full p-2 flex justify-between gap-2 bg-complementary ${
                  com.comType === 1 && "bg-success"
                } ${com.comType === 2 && "bg-fail"}`}
              >
                <span className="w-1/5 text-xs">
                  {dateToString(com.createdAt)}
                </span>
                {com.comType === 0 && <span className="w-2/5">test</span>}
                {com.comType === 1 && (
                  <span className="w-2/5">Bienvenue à la nation</span>
                )}
                {com.comType === 2 && (
                  <span className="w-2/5">Suppression de la nation</span>
                )}
                <span className="w-2/5">{com.originName}</span>
              </div>
            );
          })}
      </section>
    </>
  );
}
