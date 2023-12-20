export interface Nation {
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
  }
}