export interface NationDiplomacyInfo {
  OfficialId: string;
  AmbassadorId: string;
  accepted: boolean;
}

export interface RelationKind {
  business: boolean;
  economic: boolean;
  cultural: boolean;
  scientific: boolean;
  coop: boolean;
}

export interface DiplomaticRelationship {
  officialId: string;
  name: string;
  description: string;
  nations: NationDiplomacyInfo[];
  kind: RelationKind;
  createdAt?: Date;
}

export const emptyDiplomaticRelationship: DiplomaticRelationship = {
  officialId: "",
  name: "",
  description: "",
  nations: [],
  kind: {
    business: false,
    economic: false,
    cultural: false,
    scientific: false,
    coop: false,
  },
};
