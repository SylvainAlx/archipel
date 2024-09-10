import { Place } from "./typPlace";
import { User } from "./typUser";

export interface NationRoleplayData {
  nationId: string;
  citizens: User[];
  places: Place[];
}

export interface Nation {
  _id?: string;
  officialId: string;
  name: string;
  owner: string;
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
      motto: string;
      nationalDay: string;
      regime: number;
      currency: string;
      tags: string[];
    };
    roleplay: {
      capital: string;
      citizens: number;
      places: number;
    };
  };
  createdAt: Date;
}

export const EmptyNation: Nation = {
  officialId: "",
  name: "",
  owner: "",
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
      motto: "",
      nationalDay: "",
      regime: 0,
      currency: "",
      tags: [],
    },
    roleplay: {
      capital: "",
      citizens: 0,
      places: 0,
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

export interface NewNationPayload {
  name: string;
  owner: string;
  motto: string;
  regime: number;
  currency: string;
}

export const emptyNewNationPayload: NewNationPayload = {
  name: "",
  owner: "",
  motto: "",
  regime: 0,
  currency: "",
};
