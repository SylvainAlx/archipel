import { useState } from "react";
import { NationListModel } from "../../models/lists/nationListModel";
import { ELEMENTS_DISPLAYED_LIMIT } from "../../settings/consts";

export function useNationList() {
  const [nationsList, setNationsList] = useState<NationListModel>(
    new NationListModel(),
  );
  const [displayedNations, setDisplayedNations] = useState(
    ELEMENTS_DISPLAYED_LIMIT.nations,
  );
  return {
    nationsList,
    setNationsList,
    displayedNations,
    setDisplayedNations,
  };
}
