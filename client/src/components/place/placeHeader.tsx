import { FaSortAmountDownAlt } from "react-icons/fa";
import CrossButton from "../ui/buttons/crossButton";
import ParentButton from "../ui/buttons/parentButton";
import EditButton from "../ui/buttons/editButton";
import ShareButton from "../ui/buttons/shareButton";
import { PlaceModel } from "../../models/placeModel";
import { NationModel } from "../../models/nationModel";
import { PLACE_TYPE } from "../../settings/consts";
import usePlaceHeader from "../../hooks/componentsHooks/place/usePlaceHeader";

interface PlaceHeaderProps {
  place: PlaceModel;
  nation: NationModel;
  owner: boolean;
  updatePath: (path: string, value: string) => void;
}

export default function PlaceHeader({
  place,
  nation,
  owner,
  updatePath,
}: PlaceHeaderProps) {
  const { handleClick, handleDelete, parentName, placeList } = usePlaceHeader(
    place,
    nation,
  );

  return (
    <>
      <div className="w-full flex items-center justify-center flex-wrap gap-1">
        <ParentButton click={handleClick} />
        {owner && <CrossButton click={handleDelete} />}
        <ShareButton label={place.name} />
      </div>
      <div className="flex items-center gap-2 text-complementary3">
        <FaSortAmountDownAlt />
        <p>{parentName}</p>
        {owner && (
          <EditButton
            editBox={{
              target: "place",
              original: placeList.getLabelIdPlaceList(
                [PLACE_TYPE.state.id, PLACE_TYPE.county.id],
                nation,
                place.officialId,
              ),
              new: place.parentId,
              path: "parentId",
              indice: place.parentId,
              action: updatePath,
            }}
          />
        )}
      </div>
    </>
  );
}
