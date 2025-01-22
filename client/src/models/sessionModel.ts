import { UserModel } from "./userModel";
import { NationModel } from "./nationModel";

export interface Session {
  user: UserModel;
  nation: NationModel;
  jwt: string;
}

export class SessionModel implements Session {
  jwt: string;
  user: UserModel;
  nation: NationModel;

  constructor() {
    this.jwt = "";
    this.user = new UserModel();
    this.nation = new NationModel();
  }

  setUser = (user: UserModel) => {
    this.user = new UserModel(user);
    return this;
  };

  setNation = (nation: NationModel) => {
    this.nation = new NationModel(nation);
    return this;
  };

  setJwt = (jwt: string) => {
    this.jwt = jwt;
    return this;
  };
}
