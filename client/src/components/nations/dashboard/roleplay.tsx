import { SelectedNationProps } from "../../../types/typProp";
import DashTile from "../../dashTile";
import H2 from "../../titles/h2";
import { IoMdPersonAdd } from "react-icons/io";
import { MdOutlineAddLocationAlt } from "react-icons/md";

export default function RolePlay({ owner }: SelectedNationProps) {
  return (
    <div className="w-full p-1 flex flex-wrap gap-1 justify-center">
      <H2 text="Roleplay" />
      <DashTile
        title="Citoyens"
        children={
          <>
            {owner && (
              <div className="text-5xl hover:scale-105 hover:text-secondary cursor-pointer transition-all">
                <IoMdPersonAdd />
              </div>
            )}
          </>
        }
      />
      <DashTile
        title="Lieux"
        children={
          <>
            {owner && (
              <div className="text-5xl hover:scale-105 hover:text-secondary cursor-pointer transition-all">
                <MdOutlineAddLocationAlt />
              </div>
            )}
          </>
        }
      />
    </div>
  );
}
