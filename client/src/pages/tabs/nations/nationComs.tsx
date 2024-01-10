import { useEffect } from "react";
import H1 from "../../../components/titles/h1";
import { StringProps } from "../../../types/typProp";
import { comsListAtom, infoModal, loadingSpinner } from "../../../settings/store";
import { useAtom } from "jotai";
import { getAllComs } from "../../../utils/fetch";
import ListTile from "../../../components/listTile";

export default function NationComs({ text }: StringProps) {
  const [, setLoading] = useAtom(loadingSpinner);
  const [, setInfo] = useAtom(infoModal);
  const [comsList, setComsList] = useAtom(comsListAtom);

  useEffect(() => {
      if(comsList[0].originName === ""){
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
  }, [])


  const dateToString = (date: Date) => {
    const createdAtDate: Date = new Date(date);
    return createdAtDate.toLocaleString("fr")
  }


  return (
    <>
      <H1 text={text} />
      <section className="w-full flex gap-8 flex-wrap items-center flex-col-reverse">
        {comsList != undefined &&
          comsList.map((com, i) => {
            return (
              <ListTile key={i} children={
                <>
                  <em>{dateToString(com.createdAt)}</em>
                  {com.comType === 0 && <p>test</p>}
                  {com.comType === 1 && <p>bienvenue à la nation</p>}
                  {com.comType === 2 && <p>suppression de la nation</p>}
                  <p className="text-xl text-secondary" >{com.originName}</p>
                </>
              }
              />
            )
          })}
      </section>
    </>
  );
}
