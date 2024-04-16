import { Citizen } from "./typCitizen";
import { Place } from "./typPlace";

export interface NationRoleplayData {
  nationId: string;
  citizens: Citizen[];
  places: Place[];
}

export interface Nation {
  _id: string;
  officialId: string;
  name: string;
  role: string;
  data: {
    url: {
      flag: string;
      coatOfArms: string;
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
      citizens: number;
      places: number;
      politicalSide: number;
    };
  };
  createdAt: Date;
}

export const EmptyNation: Nation = {
  _id: "",
  officialId: "",
  name: "",
  role: "",
  data: {
    url: {
      flag: "",
      coatOfArms: "",
      website: "",
      wiki: "",
      instagram: "",
      discord: "",
    },
    general: {
      coords: {
        lat: 0,
        lng: 0,
      },
      motto: "",
      nationalDay: new Date(0),
      regime: 0,
    },
    roleplay: {
      lastUpdated: new Date(),
      points: 0,
      credits: 100,
      capital: "",
      citizens: 0,
      places: 0,
      politicalSide: 0,
    },
  },
  createdAt: new Date(0),
};

export interface RegimeType {
  type: number;
  color: string;
}

export interface Regime {
  id: number;
  type: number;
  label: string;
}

export interface RegimeOption {
  id: number;
  label?: string;
  type: number;
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
