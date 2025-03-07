import { useState } from "react";
import { UserListModel } from "../../models/lists/userListModel";
import { ELEMENTS_DISPLAYED_LIMIT } from "../../settings/consts";

export function useCitizenList() {
  const [citizensList, setCitizensList] = useState<UserListModel>(
    new UserListModel(),
  );
  const [displayedCitizens, setDisplayedCitizens] = useState(
    ELEMENTS_DISPLAYED_LIMIT.citizens,
  );

  return {
    citizensList,
    displayedCitizens,
    setDisplayedCitizens,
    setCitizensList,
  };
}
