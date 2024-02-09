export interface Citizen {
  nationality: number;
  name: string;
  surname: string;
  image: string;
  role: string;
}

export interface Structure {
  nation: number;
  type: number;
  name: string;
  image: string;
}

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
      credits: number;
      politicalSide: number;
      citizens: Citizen[];
      structures: Structure[];
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
      credits: 100,
      politicalSide: 0,
      citizens: [],
      structures: [],
    },
  },
  createdAt: new Date(0),
};

export interface RegimeOption {
  id: number;
  label: string;
  color: string;
}

export interface PoliticalSide {
  id: number;
  label: string;
}
