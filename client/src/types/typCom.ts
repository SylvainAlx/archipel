export interface Com {
  _id: string;
  officialId: string;
  origin?: string;
  destination?: string;
  title: string;
  comType: number;
  message: string;
  reported: boolean;
  banished: boolean;
  createdAt: Date;
}

export const EmptyCom: Com = {
  _id: "",
  officialId: "",
  origin: "",
  destination: "",
  title: "",
  comType: -1,
  message: "",
  reported: false,
  banished: false,
  createdAt: new Date(),
};

export interface ComPayload {
  origin: string;
  destination: string;
  title: string;
  comType: number;
  message: string;
}

export const emptyComPayload: ComPayload = {
  origin: "",
  destination: "",
  title: "",
  comType: -1,
  message: "",
};
