import { SelectedNationProps } from "../../../types/typProp";
import DashTile from "../../dashTile";
import H2 from "../../titles/h2";

export default function RolePlay({ selectedNation }: SelectedNationProps) {
  return (
    <div className="w-full p-1 flex flex-wrap gap-1 justify-center">
      <H2 text="Roleplay" />
      <DashTile
        title="Citoyens"
        children={
          <>
            {!selectedNation.data.roleplay.citizens && <em>Aucun citoyen</em>}
          </>
        }
      />
      <DashTile
        title="Lieux"
        children={
          <>
            {" "}
            {!selectedNation.data.roleplay.structures && <em>Aucun lieux</em>}
          </>
        }
      />
    </div>
  );
}
