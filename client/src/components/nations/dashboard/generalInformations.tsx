import { GiBlackFlag } from "react-icons/gi";
import { regimeOptions } from "../../../settings/consts";
import DashTile from "../../dashTile";
import TileContainer from "../../tileContainer";
import H3 from "../../titles/h3";
import { FaLink } from "react-icons/fa6";
import Tag from "../../tag";
import { SelectedNationProps } from "../../../types/typProp";
import EditIcon from "../../editIcon";

export default function GeneralInformations({
  selectedNation,
  owner,
}: SelectedNationProps) {
  return (
    <TileContainer
      children={
        <>
          <DashTile
            title="Informations générales"
            className="min-w-[300px]"
            children={
              <>
                <div className="p-4 flex flex-col gap-2 items-center">
                  <div className="flex gap-2 items-center">
                    <div className="w-[200px] h-[140px] bg-complementary flex flex-col items-center justify-center rounded overflow-hidden">
                      {selectedNation.data.url.flag ? (
                        <img
                          src={selectedNation.data.url.flag}
                          alt={`flag of ${selectedNation.name}`}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="text-[3.1rem]">
                          <GiBlackFlag />
                        </div>
                      )}
                    </div>
                    {owner && (
                      <EditIcon
                        param={selectedNation.data.url.flag}
                        path="data.url.flag"
                      />
                    )}
                  </div>
                  <div className="flex gap-2 items-center">
                    <H3 text={selectedNation.name} />
                    {owner && (
                      <EditIcon param={selectedNation.name} path="name" />
                    )}
                  </div>
                  <div className="flex gap-2 items-center">
                    <em>
                      {selectedNation.data.general.motto
                        ? selectedNation.data.general.motto
                        : "Pas de devise"}
                    </em>
                    {owner && (
                      <EditIcon
                        param={
                          selectedNation.data.general.motto
                            ? selectedNation.data.general.motto
                            : ""
                        }
                        path="data.general.motto"
                      />
                    )}
                  </div>
                  <div className="flex gap-2">
                    {selectedNation.role === "admin" && (
                      <Tag text="admin" bgColor="bg-success" />
                    )}
                    {regimeOptions.map((regime, i) => {
                      if (regime.id === selectedNation.data.general.regime) {
                        return (
                          <span key={i} className="flex gap-2 items-center">
                            <Tag text={regime.label} bgColor={regime.color} />
                            {owner && (
                              <EditIcon
                                param={regimeOptions}
                                path="data.general.regime"
                                indice={regime.id}
                              />
                            )}
                          </span>
                        );
                      }
                    })}
                  </div>
                </div>
              </>
            }
          />
          <DashTile
            title="Lien externe"
            children={
              <>
                <div className=" bg-complementary rounded-full flex flex-col items-center justify-center">
                  {selectedNation.data.url.website ? (
                    <a
                      href={selectedNation.data.url.website}
                      className="cursor-pointer"
                    >
                      <div className="text-[3.1rem] flex justify-center">
                        <FaLink />
                      </div>
                      <p>{selectedNation.data.url.website}</p>
                    </a>
                  ) : (
                    <div>
                      <div className="text-[3.1rem] flex justify-center cursor-not-allowed">
                        <FaLink />
                      </div>
                      <p>aucun lien</p>
                    </div>
                  )}
                </div>
              </>
            }
          />
        </>
      }
    />
  );
}
