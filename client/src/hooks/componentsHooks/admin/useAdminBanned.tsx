import { useAtom } from "jotai";
import { bannedCitizensAtom } from "../../../settings/store";
import { useEffect, useState } from "react";

export default function useAdminBanned() {
  const [bannedUsers] = useAtom(bannedCitizensAtom);
  const [displayedCitizens, setDisplayedCitizens] = useState(10);

  useEffect(() => {
    const getUsers = () => {
      bannedUsers.loadBannedCitizensAtom();
    };
    if (bannedUsers.getItems().length === 0) {
      getUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    displayedCitizens,
    setDisplayedCitizens,
    bannedUsers,
  };
}
