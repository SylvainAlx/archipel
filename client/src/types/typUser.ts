export interface User {
  name: string;
  surname: string;
  avatar: string;
  password: string;
  recovery: string;
  role: string;
  citizenship: {
    nationId: string;
    nationName: string;
    nationOwner: boolean
  },
  createdAt: Date;
}

export interface AuthPayload {
  name: string;
  password: string;
}

export interface RecoveryPayload {
  name: string;
  recovery: string;
  password?: string;
  newPassword?: string;
}

export const emptyUser: User = {
  name: "",
  surname: "",
  avatar: "",
  password: "",
  recovery: "",
  role: "",
  citizenship: {
    nationId: "",
    nationName: "",
    nationOwner: false
  },
  createdAt: new Date()
}

