import { emptyUser, Plans, Roles, User } from "../types/typUser";
import { CommonModel } from "./commonModel";

export class UserModel extends CommonModel implements User {
  name!: string;
  bio!: string;
  gender!: number;
  avatar!: string;
  language!: string;
  religion!: number;
  password?: string;
  recovery?: string;
  email!: string;
  link!: string;
  role!: Roles;
  credits!: number;
  plan!: Plans;
  expirationDate!: string;
  citizenship!: {
    status: number;
    nationId: string;
    nationOwner: boolean;
    residence: string;
  };

  constructor(data: Partial<User> = {}) {
    super();
    const defaultData = { ...emptyUser, ...data };
    Object.assign(this, defaultData);
  }
}
