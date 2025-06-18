import { useState } from "react";
import { ELEMENTS_DISPLAYED_LIMIT } from "../../settings/consts";
import { StructureListModel } from "../../models/lists/structureListModel";

export function useStructureList() {
  const [structureList, setStructureList] = useState<StructureListModel>(
    new StructureListModel(),
  );
  const [displayedStructures, setDisplayedStructures] = useState(
    ELEMENTS_DISPLAYED_LIMIT.structures,
  );
  return {
    structureList,
    setStructureList,
    displayedStructures,
    setDisplayedStructures,
  };
}
