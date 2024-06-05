export interface User {
  officialId: string;
  name: string;
  surname: string;
  avatar: string;
  language: string;
  password?: string;
  recovery?: string;
  role: string;
  citizenship: {
    nationId: string;
    nationOwner: boolean;
  };
  createdAt: Date;
}

export interface AuthPayload {
  name: string;
  password: string;
  language?: string;
}

export interface RecoveryPayload {
  name: string;
  recovery: string;
  password?: string;
  newPassword?: string;
}

export const emptyUser: User = {
  officialId: "",
  name: "",
  surname: "",
  avatar: "",
  language: "",
  password: "",
  recovery: "",
  role: "",
  citizenship: {
    nationId: "",
    nationOwner: false,
  },
  createdAt: new Date(),
};
