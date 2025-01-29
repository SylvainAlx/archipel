export enum Plans {
  free = "free",
  premium = "premium",
  elite = "elite",
}

export enum Roles {
  standard = "standard",
  admin = "admin",
}

export interface User {
  officialId: string;
  name: string;
  bio: string;
  gender: number;
  avatar: string;
  language: string;
  religion: number;
  password?: string;
  recovery?: string;
  email: string;
  link: string;
  role: Roles;
  credits: number;
  plan: Plans;
  expirationDate: string;
  reported: boolean;
  banished: boolean;
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
  religion: 0,
  password: "",
  recovery: "",
  email: "",
  link: "",
  role: Roles.standard,
  credits: 0,
  plan: Plans.free,
  expirationDate: "",
  reported: false,
  banished: false,
  citizenship: {
    status: -1,
    nationId: "",
    nationOwner: false,
    residence: "",
  },
  createdAt: new Date(),
};
