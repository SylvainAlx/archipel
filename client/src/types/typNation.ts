export interface Nation {
  _id: string,
  name: string,
  role: string,
  data: {
    url: {
      flagUrl: string,
      bannerUrl: string,
      websiteUrl: string,
    },
    general: {
      motto: string,
      nationalDay: Date,
      regime: number,
      points: number,
      politicalSide: number,
    },
    distribution: [
      {
        workId: number,
        points: number,
      },
    ],
  },
  createdAt: string
}

export const EmptyNation : Nation = {
  _id: "",
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
  },
  createdAt: ""
}