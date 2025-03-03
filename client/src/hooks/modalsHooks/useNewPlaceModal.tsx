import { useAtom } from "jotai";
import { newPlaceAtom, placeListAtomV2 } from "../../settings/store";
import { ChangeEvent, FormEvent } from "react";
import { PlaceModel } from "../../models/placeModel";
import { PlaceListModel } from "../../models/lists/placeListModel";
import { emptyPlace } from "../../types/typPlace";
import { useNavigate } from "react-router-dom";

export function useNewPlaceModal() {
  const navigate = useNavigate();
  const [newPlace, setNewPlace] = useAtom(newPlaceAtom);
  const [placeList, setPlaceList] = useAtom(placeListAtomV2);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const placeToInsert = new PlaceModel(newPlace);
    const placeInserted = await placeToInsert.baseInsert();
    const listToUpdate = placeList.addOrUpdate(placeInserted);
    setPlaceList(new PlaceListModel(listToUpdate));
    setNewPlace(emptyPlace);
    navigate(`/place/${placeInserted.officialId}`);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewPlace({ ...newPlace, [name]: value });
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    setNewPlace({ ...newPlace, type: value });
  };
  return {
    handleSubmit,
    handleChange,
    handleSelectChange,
    newPlace,
    setNewPlace,
  };
}
