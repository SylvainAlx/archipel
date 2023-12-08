import { useAtom } from "jotai";
import { nationAtom } from "./store";

export const GET_JWT = () => localStorage.getItem("jwt");

export const logout = () => {
    const [nation, setNation] = useAtom(nationAtom);
    if (window.confirm(`Souhaitez-vous vous déconnecter ?`)) {
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
    }
}