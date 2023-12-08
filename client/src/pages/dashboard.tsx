import { useAtom } from "jotai"
import { nationAtom } from "../utils/store"
import H1 from "../components/titles/h1"
import Button from "../components/button"

export default function Dashboard(){
    const [nation,] = useAtom(nationAtom)
    return (
        <>
            <H1 text={nation.name} />
            <Button path="delete" text="SUPPRIMER SA NATION" />
        </>
    )
}