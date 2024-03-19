export interface TypNation {
  _id?: string;
  name: string;
  role: string;
  data: {
    url: {
      flag: string;
      banner: string;
      website: string;
      wiki: string;
      instagram: string;
      discord: string;
    };
    general: {
      coords: {
        lat: number;
        lng: number;
      };
      motto: string;
      nationalDay: Date;
      regime: number;
    };
    roleplay: {
      lastUpdated: Date;
      points: number;
      credits: number;
      capital: string;
      population: number;
      politicalSide: number;
    };
  };
  createdAt: Date;
}
