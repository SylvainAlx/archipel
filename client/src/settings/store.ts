import { atom } from 'jotai'
import { Nation } from '../types/typNation'

export const EmptyNation : Nation = {
    name: "",
    role:"",
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
}
export const nationAtom = atom(EmptyNation);
const atomString: string = "";
export const recoveryKey = atom(atomString);
export const confirmBox = atom({action:"", text:"", result:""});
export const infoModal = atom("");
const loadingAtom = {
    show: false,
    text: "",
}
export const loadingSpinner = atom(loadingAtom);