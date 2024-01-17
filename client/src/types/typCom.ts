export interface Com {
  _id: string;
  originId: string;
  originName: string;
  title: string;
  comType: number;
  message: string;
  createdAt: Date;
}

export const EmptyCom: Com = {
  _id: "",
  originId: "",
  originName: "",
  title: "",
  comType: -1,
  message: "",
  createdAt: new Date(),
};
