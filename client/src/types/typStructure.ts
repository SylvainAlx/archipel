export enum StructureType {
  association = "association",
  company = "company",
  NGO = "NGO",
  politicalParty = "politicalParty",
}

export type Structure = {
  officialId: string;
  name: string;
  type: StructureType;
  owner: string;
  description: string;
  image: string;
  members: string[];
  establishments: string[];
  link: string;
  updatedAt: Date;
  createdAt: Date;
};

export const emptyStructure: Structure = {
  officialId: "",
  name: "",
  type: StructureType.association,
  owner: "",
  description: "",
  image: "",
  members: [],
  establishments: [],
  link: "",
  updatedAt: new Date(0),
  createdAt: new Date(0),
};
