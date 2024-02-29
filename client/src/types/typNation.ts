export interface Citizen {
  _id: string;
  nationId: string;
  name: string;
  surname: string;
  image: string;
  role: string;
}

export interface Place {
  _id?: string;
  nationId: string;
  buildDate: Date;
  type: number;
  cost: number;
  level: number;
  points: number;
  slots: number;
  builds: number;
  population: number;
  name: string;
  description: string;
  image: string;
}

export const emptyPlace: Place = {
  nationId: "",
  buildDate: new Date(0),
  type: 0,
  cost: 0,
  level: 0,
  points: 0,
  slots: 0,
  builds: 0,
  population: 0,
  name: "",
  description: "",
  image: "",
};

export interface NationRoleplayData {
  nationId: string;
  citizens: Citizen[];
  places: Place[];
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
      lastUpdated: new Date(),
      points: 0,
      credits: 100,
      capital: "",
      population: 0,
      politicalSide: 0,
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

export interface LabelId {
  id: string;
  label: string;
}
