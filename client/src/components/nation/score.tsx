import { SelectedNationProps } from "../../types/typProp";
import CreditTag from "../tags/creditTag";
import PlaceTag from "../tags/placeTag";
import PopulationTag from "../tags/populationTag";

export default function Score({ selectedNation, owner }: SelectedNationProps) {
  return (
    <div className="w-full px-2 flex items-center justify-center gap-1">
      <PlaceTag label={selectedNation.data.roleplay.places} />
      <PopulationTag label={selectedNation.data.roleplay.citizens} />
      <CreditTag label={selectedNation.data.roleplay.credits} owner={owner} />
    </div>
  );
}
