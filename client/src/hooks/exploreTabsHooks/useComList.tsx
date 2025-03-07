import { useState } from "react";
import { ComListModel } from "../../models/lists/comListModel";
import { ELEMENTS_DISPLAYED_LIMIT } from "../../settings/consts";

export function useComList() {
  const [comList, setComList] = useState<ComListModel>(new ComListModel());
  const [displayedComs, setDisplayedComs] = useState(
    ELEMENTS_DISPLAYED_LIMIT.coms,
  );
  return {
    comList,
    setComList,
    displayedComs,
    setDisplayedComs,
  };
}
