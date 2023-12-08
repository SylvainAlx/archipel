import { useAtom } from "jotai";
import { useEffect } from "react"
import { nationAtom } from "../utils/store";

export default function Logout(){
    const [nation, setNation] = useAtom(nationAtom);
    useEffect(()=>{
        localStorage.removeItem("jwt");
        setNation({
            name: "",
            data: {
                url: {
                    flagUrl: "",
                    bannerUrl: "",
                    websiteUrl: "",
                },
                general: {
                    motto: "",
                    nationalDay: new Date(0),
                    regime: -1,
                    points: -1,
                    politicalSide: -1,
                },
                distribution: [
                    {
                    workId: -1,
                    points: -1,
                    },
                ],
            }
        });    
    },[])

    return (
        <h1>Vous avez été déconnecté</h1>
    )
}