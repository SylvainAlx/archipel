/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import H1 from '../../../components/titles/h1'
import { StringProps } from '../../../types/typProp'
import {
  comsListAtom,
  confirmBox,
  infoModal,
  loadingSpinner,
  nationAtom,
} from '../../../settings/store'
import { useAtom } from 'jotai'
import { getAllComs } from '../../../utils/fetch'
import Button from '../../../components/button'
import { IoMdTrash } from "react-icons/io";

export default function NationComs({ text }: StringProps) {
  const [, setLoading] = useAtom(loadingSpinner)
  const [, setInfo] = useAtom(infoModal)
  const [nation,] = useAtom(nationAtom);
  const [comsList, setComsList] = useAtom(comsListAtom)
  const [, setConfirm] = useAtom(confirmBox);

  useEffect(() => {
    if (comsList === undefined || comsList.length === 1) {
      getComs()
    }
  }, [])

  const getComs = () => {
    setLoading({ show: true, text: 'Connexion au serveur' })
    getAllComs()
      .then((data) => {
        setLoading({ show: false, text: 'Connexion au serveur' })
        if (data != undefined) {
          setComsList(data)
        }
      })
      .catch((error) => {
        setLoading({ show: false, text: 'Connexion au serveur' })
        setInfo(error.message)
      })
  }

  const dateToString = (date: Date) => {
    const createdAtDate: Date = new Date(date)
    return createdAtDate.toLocaleString('fr')
  }

  const handleDelete = (id: string) => {
    setConfirm({
      action: "deleteCom",
      text: "Confirmez-vous la suppression de la communication ?",
      result: "",
      target: id
    })
  }

  return (
    <>
      <H1 text={text} />
      <div className="mb-4 w-max">
        <Button text="ACTUALISER" path="" click={getComs} />
      </div>
      <section className="w-full min-w-[300px] flex flex-col-reverse justify-center gap-1 items-center text-sm">
        {comsList != undefined &&
          comsList.map((com, i) => {
            if(com.comType != -1) {
              return (
                <div
                  key={i}
                  className={`rounded w-full p-2 flex flex-col justify-between gap-2 bg-complementary ${
                    com.comType === 1 && 'bg-success'
                  } ${com.comType === 2 && 'bg-fail'}`}
                >
                  <div className="flex justify-between items-center">
                    <span className="w-1/4 flex gap-1 items-center">
                      {nation.role === "admin" && <div onClick={() => handleDelete(com._id)} className="text-lg hover:scale-110 hover:cursor-pointer transition-all"><IoMdTrash /></div>}
                      <div className="text-xs">{dateToString(com.createdAt)}</div>
                    </span>
                    {com.comType === 0 && (
                      <span className="w-1/4">Déclaration officielle</span>
                    )}
                    {com.comType === 1 && (
                      <span className="w-1/4">Nouvelle nation</span>
                    )}
                    {com.comType === 2 && (
                      <span className="w-1/4">Suppression de la nation</span>
                    )}
                    <span className="w-2/4 text-right text-md">
                      {com.originName}
                    </span>
                  </div>
                  {com.title && (
                    <b className="text-center text-lg"> {com.title}</b>
                  )}
                  {com.message && (
                    <blockquote className="rounded p-1 bg-black_alpha">
                      {com.message}
                    </blockquote>
                  )}
                </div>
              )
            }
          })}
      </section>
    </>
  )
}
