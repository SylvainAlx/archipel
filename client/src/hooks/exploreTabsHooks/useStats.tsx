import { useEffect, useState } from "react";
import { NationListModel } from "../../models/lists/nationListModel";
import { UserListModel } from "../../models/lists/userListModel";
import { PlaceListModel } from "../../models/lists/placeListModel";
import { Hashtag } from "../../types/typNation";
import { NationModel } from "../../models/nationModel";
import {
  myStore,
  nationListAtomV2,
  placeListAtomV2,
  statsAtom,
  userListAtomV2,
} from "../../settings/store";
import { useAtom } from "jotai";
import { getCounts } from "../../services/statService";

export function useStats() {
  const [stats] = useAtom(statsAtom);
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
    if (stats.counts.citizens === 0) {
      getCounts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const loadData = async () => {
      // nations
      if (
        myStore.get(nationListAtomV2).getItems().length != stats.counts.nations
      ) {
        const nationListLoaded = await nationsList.loadNationList("", "");
        setNationsList(nationListLoaded);
      } else {
        setNationsList(myStore.get(nationListAtomV2));
      }
      // users
      if (
        myStore.get(userListAtomV2).getItems().length != stats.counts.citizens
      ) {
        const citizensListLoaded = await citizensList.loadUserList("");
        setCitizensList(citizensListLoaded);
      } else {
        setCitizensList(myStore.get(userListAtomV2));
      }
      // places
      if (
        myStore.get(placeListAtomV2).getItems().length != stats.counts.places
      ) {
        const placeListLoaded = await placesList.loadPlaceList("");
        setPlacesList(placeListLoaded);
      } else {
        setPlacesList(myStore.get(placeListAtomV2));
      }

      const nation = new NationModel();
      const tags = await nation.getAllNationTags();
      setTagList(tags);
    };

    if (stats.counts.citizens != 0) {
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stats]);
  return {
    nationsList,
    citizensList,
    placesList,
    tagList,
  };
}
