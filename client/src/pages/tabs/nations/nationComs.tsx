/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import H1 from "../../../components/titles/h1";
import { StringProps } from "../../../types/typProp";
import {
  comsListAtom,
  confirmBox,
  infoModal,
  loadingSpinner,
  nationAtom,
} from "../../../settings/store";
import { useAtom } from "jotai";
import { getAllComs } from "../../../utils/fetch";
import Button from "../../../components/button";
import { IoMdTrash } from "react-icons/io";
import { SERVEUR_LOADING_STRING, comOptions } from "../../../settings/consts";
import { dateToString } from "../../../utils/functions";

export default function NationComs({ text }: StringProps) {
  const [, setLoading] = useAtom(loadingSpinner);
  const [, setInfo] = useAtom(infoModal);
  const [nation] = useAtom(nationAtom);
  const [comsList, setComsList] = useAtom(comsListAtom);
  const [, setConfirm] = useAtom(confirmBox);

  useEffect(() => {
    if (comsList === undefined || comsList.length === 1) {
      getComs();
    }
  }, []);

  const getComs = () => {
    setLoading({ show: true, text: SERVEUR_LOADING_STRING });
    getAllComs()
      .then((data) => {
        setLoading({ show: false, text: SERVEUR_LOADING_STRING });
        if (data != undefined) {
          setComsList(data);
        }
      })
      .catch((error) => {
        setLoading({ show: false, text: SERVEUR_LOADING_STRING });
        setInfo(error.message);
      });
  };

  const handleDelete = (id: string) => {
    setConfirm({
      action: "deleteCom",
      text: "Confirmez-vous la suppression de la communication ?",
      result: "",
      target: id,
    });
  };

  return (
    <>
      <H1 text={text} />
      <div className="mb-4 w-max">
        <Button text="ACTUALISER" path="" click={getComs} />
      </div>
      <section className="w-full min-w-[300px] flex flex-col-reverse justify-center gap-1 items-center text-sm">
        {comsList != undefined &&
          comsList.map((com, i) => {
            if (com.comType > 0) {
              return (
                <div
                  key={i}
                  className={`rounded w-full p-2 flex flex-col justify-between gap-2 bg-complementary ${
                    com.comType === 1 && "bg-success"
                  } ${com.comType === 2 && "bg-danger"}`}
                >
                  <div className="flex justify-between items-center">
                    <span className="w-1/4 flex gap-1 items-center">
                      {nation.role === "admin" && (
                        <div
                          onClick={() => handleDelete(com._id)}
                          className="text-lg hover:scale-110 hover:cursor-pointer transition-all"
                        >
                          <IoMdTrash />
                        </div>
                      )}
                      <div className="text-[10px]">
                        {dateToString(com.createdAt)}
                      </div>
                    </span>
                    <span className="w-1/4">
                      {comOptions[com.comType].label}
                    </span>
                    <span className="w-2/4 text-right text-md">
                      {com.originName}
                    </span>
                  </div>
                  {com.message != undefined && (
                    <div className="bg-black_alpha p-2 rounded">
                      <b className="text-lg"> {com.title}</b>
                      <blockquote>{com.message}</blockquote>
                    </div>
                  )}
                </div>
              );
            }
          })}
      </section>
    </>
  );
}
