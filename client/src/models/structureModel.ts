import { getStructureFetch } from "../services/structureService";
import { loadingAtom, myStore, structureListAtomV2 } from "../settings/store";
import { emptyStructure, Structure } from "../types/typStructure";
import { errorCatching } from "../utils/displayInfos";
import { CommonModel } from "./commonModel";

export class StructureModel extends CommonModel implements Structure {
  name!: string;
  owner!: string;
  description!: string;
  image!: string;
  members!: string[];
  establishments!: string[];
  link!: string;

  constructor(data: Partial<Structure | StructureModel> = {}) {
    super();
    const defaultData = { ...emptyStructure, ...data };
    Object.assign(this, defaultData);
  }

  updateFields(fields: Partial<Structure | StructureModel>) {
    Object.assign(this, fields);
    return this;
  }

  loadStructure = async (officialId: string) => {
    myStore.set(loadingAtom, true);
    try {
      const structure = myStore
        .get(structureListAtomV2)
        .getItems()
        .find((s) => s.officialId === officialId);
      if (structure) {
        this.updateFields(structure);
      } else {
        const response: { structure: Structure } =
          await getStructureFetch(officialId);
        this.updateFields(response.structure);
        myStore
          .get(structureListAtomV2)
          .addToStructureListAtom([response.structure]);
      }
    } catch (error) {
      errorCatching(error);
    } finally {
      myStore.set(loadingAtom, false);
      return new StructureModel(this);
    }
  };
}
