import { useAtom } from 'jotai'
import {
  comsListAtom,
  confirmBox,
  infoModal,
  nationAtom,
  nationsListAtom,
} from '../../settings/store'
import { useNavigate } from 'react-router-dom'
import { DeleteCom, DeleteSelfFetch, createCom } from '../../utils/fetch'
import { EmptyNation } from '../../types/typNation'
import Button from '../button'
import { EmptyCom } from '../../types/typCom'

export default function ConfirmModal() {
  const [confirm, setConfirm] = useAtom(confirmBox)
  const [, setInfo] = useAtom(infoModal)
  const [nation, setNation] = useAtom(nationAtom)
  const [, setComsList] = useAtom(comsListAtom)
  const [, setNationsList] = useAtom(nationsListAtom)
  const navigate = useNavigate()

  return (
    <>
      <h2 className="text-2xl text-center p-4">DEMANDE DE CONFIRMATION</h2>
      <p className="text-center">{confirm.text}</p>
      <div className="flex gap-4 justify-center my-4">
        <Button
          text="VALIDER"
          path=""
          click={() => {
            setConfirm({ action: confirm.action, text: '', result: 'OK' })
            if (confirm.action === 'logout') {
              setInfo('déconnexion effectuée')
              setNation(EmptyNation)
              localStorage.removeItem('jwt')
              navigate('/')
              // window.location.reload();
            }
            if (confirm.action === 'deleteSelfNation') {
              DeleteSelfFetch()
                .then((resp) => {
                  createCom({
                    originId: nation._id,
                    originName: nation.name,
                    comType: 2,
                  })
                  setComsList([EmptyCom])
                  setNationsList([EmptyNation])
                  setInfo(resp.message)
                  setNation(EmptyNation)
                  localStorage.removeItem('jwt')
                  navigate('/')
                  // window.location.reload();
                })
                .catch((error) => {
                  console.log(error)
                })
            }
            if (confirm.action === 'deleteCom') {
              DeleteCom(confirm.target)
                .then((resp) => {
                  setComsList([EmptyCom])
                  setInfo(resp.message)
                })
                .catch((error) => {
                  console.log(error)
                })
            }
          }}
        />
        <Button
          text="ANNULER"
          path=""
          click={() =>
            setConfirm({ action: confirm.action, text: '', result: 'KO' })
          }
        />
      </div>
    </>
  )
}
