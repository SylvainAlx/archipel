export interface Nation {
  _id: string;
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
      motto: string;
      nationalDay: Date;
      regime: number;
    };
    roleplay: {
      points: number;
      unusedPoints: number;
      politicalSide: number;
      pointsDistribution: {
        citizens: number;
        structures: number;
      };
    };
  };
  createdAt: Date;
}

export const EmptyNation: Nation = {
  _id: "",
  name: "",
  role: "",
  data: {
    url: {
      flag: "",
      banner: "",
      website: "",
      wiki: "",
      instagram: "",
      discord: "",
    },
    general: {
      motto: "",
      nationalDay: new Date(0),
      regime: 0,
    },
    roleplay: {
      points: 0,
      unusedPoints: 100,
      politicalSide: 0,
      pointsDistribution: {
        citizens: 0,
        structures: 0,
      },
    },
  },
  createdAt: new Date(0),
};

export interface RegimeOption {
  id: number;
  label: string;
  color: string;
}

export interface Distribution {
  citizens: number;
  structures: number,
}
