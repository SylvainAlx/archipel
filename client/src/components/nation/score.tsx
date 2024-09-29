import { SelectedNationProps } from "../../types/typProp";
import PlaceTag from "../tags/placeTag";
import PopulationTag from "../tags/populationTag";

export default function Score({ selectedNation }: SelectedNationProps) {
  return (
    <div className="px-2 flex items-center justify-center gap-1">
      <PlaceTag label={selectedNation.data.roleplay.places} />
      <PopulationTag label={selectedNation.data.roleplay.citizens} />
    </div>
  );
}
