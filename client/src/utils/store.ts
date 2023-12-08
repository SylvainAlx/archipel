import { atom } from 'jotai'
import { Nation } from './types'

const nation : Nation = {
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
}
export const nationAtom = atom(nation)