import { useEffect, useState } from "react";
import { NationListModel } from "../../models/lists/nationListModel";
import { UserListModel } from "../../models/lists/userListModel";
import { PlaceListModel } from "../../models/lists/placeListModel";
import { Hashtag } from "../../types/typNation";
import { NationModel } from "../../models/nationModel";

export function useStats() {
  const [nationsList, setNationsList] = useState<NationListModel>(
    new NationListModel(),
  );
  const [citizensList, setCitizensList] = useState<UserListModel>(
    new UserListModel(),
  );
  const [placesList, setPlacesList] = useState<PlaceListModel>(
    new PlaceListModel(),
  );
  const [tagList, setTagList] = useState<Hashtag[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const nationListLoaded = await nationsList.loadNationList("", "");
      setNationsList(nationListLoaded);
      const citizensListLoaded = await citizensList.loadUserList("");
      setCitizensList(citizensListLoaded);
      const placeListUpdated = await placesList.loadPlaceList("");
      setPlacesList(placeListUpdated);
      const nation = new NationModel();
      const tags = await nation.getAllNationTags();
      setTagList(tags);
    };
    loadData();
  }, []);
  return {
    nationsList,
    citizensList,
    placesList,
    tagList,
  };
}
