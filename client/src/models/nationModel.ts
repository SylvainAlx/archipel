import { EmptyNation, Nation } from "../types/typNation";
import { CommonModel } from "./commonModel";

export class NationModel extends CommonModel implements Nation {
  _id?: string | undefined;
  name!: string;
  owner!: string;
  data!: {
    url: {
      flag: string;
      coatOfArms: string;
      map: string;
      website: string;
      wiki: string;
      instagram: string;
      discord: string;
    };
    general: {
      motto: string;
      nationalDay: string;
      isNationState: boolean;
      regime: number;
      currency: string;
      tags: string[];
      description: string;
    };
    roleplay: {
      treasury: number;
      capital: string;
      citizens: number;
      places: number;
    };
  };

  constructor(data: Partial<Nation> = {}) {
    super();
    const defaultData = { ...EmptyNation, ...data };
    Object.assign(this, defaultData);
  }
}
