export interface Nation {
  _id?: string;
  officialId: string;
  name: string;
  owner: string;
  reported: boolean;
  banished: boolean;
  data: {
    url: {
      flag: string;
      coatOfArms: string;
      anthem: string;
      map: string;
      website: string;
      wiki: string;
      instagram: string;
      discord: string;
    };
    general: {
      motto: string;
      nationalDay: string;
      isNationState: boolean;
      regime: number;
      currency: string;
      tags: string[];
      description: string;
    };
    roleplay: {
      treasury: number;
      capital: string;
      citizens: number;
      places: number;
      officialOwner: string;
    };
  };
  createdAt: Date;
}

export const EmptyNation: Nation = {
  officialId: "",
  name: "",
  owner: "",
  reported: false,
  banished: false,
  data: {
    url: {
      flag: "",
      coatOfArms: "",
      anthem: "",
      map: "",
      website: "",
      wiki: "",
      instagram: "",
      discord: "",
    },
    general: {
      motto: "",
      nationalDay: "",
      isNationState: true,
      regime: 0,
      currency: "",
      tags: [],
      description: "",
    },
    roleplay: {
      treasury: 0,
      capital: "",
      citizens: 0,
      places: 0,
      officialOwner: "",
    },
  },
  createdAt: new Date(0),
};

export interface Regime {
  id: number;
  type: number;
  label: string;
  color: string;
}

export interface LabelId {
  id: string;
  label: string;
}

export interface NewNationPayload {
  name: string;
  owner: string;
  motto: string;
  isNationState: boolean;
  regime: number;
  currency: string;
  nationalDay: string;
  tags: string[];
}

export const emptyNewNationPayload: NewNationPayload = {
  name: "",
  owner: "",
  motto: "",
  isNationState: true,
  regime: 0,
  currency: "",
  nationalDay: "",
  tags: [],
};

export interface Hashtag {
  label: string;
  occurrence: number;
}

export interface TranferCreditPayload {
  nationOwnerId: string;
  recipientId: string;
  amount: number;
}

export interface GiveOwnershipPayload {
  nationOfficialId: string;
  sellerOfficialId: string;
  buyerOfficialId: string;
  password: string;
}
