export interface Com {
  _id: string;
  origin?: string;
  destination?: string;
  title: string;
  comType: number;
  message: string;
  createdAt: Date;
}

export const EmptyCom: Com = {
  _id: "",
  origin: "",
  destination: "",
  title: "",
  comType: -1,
  message: "",
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
