export interface User {
  officialId: string;
  name: string;
  surname: string;
  gender: number;
  avatar: string;
  language: string;
  password?: string;
  recovery?: string;
  email: string;
  link: string;
  role: string;
  citizenship: {
    status: number;
    nationId: string;
    nationOwner: boolean;
    residence: string;
  };
  createdAt: Date;
}

export interface AuthPayload {
  name: string;
  password: string;
  gender?: number;
  language?: string;
}

export interface RecoveryPayload {
  name: string;
  recovery: string;
  password?: string;
  newPassword?: string;
}

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export interface changeStatusPayload {
  officialId: string;
  nationId: string;
  status: number;
}

export const emptyUser: User = {
  officialId: "",
  name: "",
  surname: "",
  gender: 0,
  avatar: "",
  language: "",
  password: "",
  recovery: "",
  email: "",
  link: "",
  role: "",
  citizenship: {
    status: -1,
    nationId: "",
    nationOwner: false,
    residence: "",
  },
  createdAt: new Date(),
};
