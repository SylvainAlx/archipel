interface NationDiplomacyInfo {
  OfficialId: string;
  AmbassadorId: string;
  accepted: boolean;
}

export interface DiplomaticRelationship {
  officialId: string;
  name: string;
  nations: NationDiplomacyInfo[];
  kind: {
    business: boolean;
    economic: boolean;
    cultural: boolean;
    scientific: boolean;
    coop: boolean;
  };
  createdAt: Date;
}

export const emptyDiplomaticRelationship: DiplomaticRelationship = {
  officialId: "",
  name: "",
  nations: [],
  kind: {
    business: false,
    economic: false,
    cultural: false,
    scientific: false,
    coop: false,
  },
  createdAt: new Date(),
};
