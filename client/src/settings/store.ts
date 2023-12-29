import { atom } from 'jotai'
import { EmptyNation } from '../types/typNation'


export const nationAtom = atom(EmptyNation);
export const selectedNation = atom(EmptyNation);
const atomString: string = "";
export const recoveryKey = atom(atomString);
export const confirmBox = atom({action:"", text:"", result:""});
export const infoModal = atom("");
const loadingAtom = {
    show: false,
    text: "",
}
export const loadingSpinner = atom(loadingAtom);