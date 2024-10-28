export interface User {
  officialId: string;
  name: string;
  bio: string;
  gender: number;
  avatar: string;
  language: string;
  password?: string;
  recovery?: string;
  email: string;
  link: string;
  role: "standard" | "admin";
  credits: number;
  plan: "free" | "premium" | "elite";
  expirationDate: string;
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
  bio: "",
  gender: 0,
  avatar: "",
  language: "",
  password: "",
  recovery: "",
  email: "",
  link: "",
  role: "standard",
  credits: 0,
  plan: "free",
  expirationDate: "",
  citizenship: {
    status: -1,
    nationId: "",
    nationOwner: false,
    residence: "",
  },
  createdAt: new Date(),
};
