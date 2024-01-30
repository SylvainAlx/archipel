import { GiBlackFlag } from "react-icons/gi";
import { regimeOptions } from "../../../settings/consts";
import DashTile from "../../dashTile";
import Input from "../../form/input";
import Select from "../../form/select";
import TileContainer from "../../tileContainer";
import H3 from "../../titles/h3";
import { FaLink } from "react-icons/fa6";
import Tag from "../../tag";
import { ChangeEvent } from "react";
import { GeneralInfoProps } from "../../../types/typProp";
import { selectedNationAtom } from "../../../settings/store";
import { useAtom } from "jotai";

export default function GeneralInformations({ saved }: GeneralInfoProps) {
  const [selectedNation, setSelectedNation] = useAtom(selectedNationAtom);
  // useEffect(() => {
  //   setTempNation(selectedNation);
  // }, [saved]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedNation({ ...selectedNation, name: e.target.value });
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const data = { ...selectedNation.data };
    data.general.regime = Number(e.target.value);
    setSelectedNation({ ...selectedNation, data });
  };

  return (
    <TileContainer
      children={
        <>
          <DashTile
            title="Informations générales"
            className="w-full"
            children={
              <>
                <div className="flex gap-2">
                  {selectedNation.role === "admin" && (
                    <Tag text="admin" bgColor="bg-success" />
                  )}
                  {regimeOptions.map((regime, i) => {
                    if (regime.id === selectedNation.data.general.regime) {
                      return (
                        <span key={i}>
                          <Tag text={regime.label} bgColor={regime.color} />
                        </span>
                      );
                    }
                  })}
                </div>
                {!saved && (
                  <div className="p-4 flex flex-col gap-2 items-center">
                    <Select
                      options={regimeOptions}
                      onChange={handleSelectChange}
                      value={selectedNation.data.general.regime}
                    />
                  </div>
                )}
                <div className="p-4 flex flex-col gap-2 items-center">
                  <H3 text={selectedNation.name} />
                  {!saved && (
                    <Input
                      placeholder={selectedNation.name}
                      value={selectedNation.name}
                      name="name"
                      onChange={handleInputChange}
                      type="text"
                    />
                  )}
                </div>
              </>
            }
          />
          <DashTile
            title="Symboles"
            children={
              <>
                <div className="w-[50px] h-[50px] bg-complementary rounded-full flex flex-col items-center justify-center">
                  {selectedNation.data.url.flagUrl ? (
                    <img
                      src={selectedNation.data.url.flagUrl}
                      alt={`flag of ${selectedNation.name}`}
                      className="w-full h-full"
                    />
                  ) : (
                    <div className="text-[3.1rem]">
                      <GiBlackFlag />
                    </div>
                  )}
                </div>
                <em>
                  {selectedNation.data.general.motto
                    ? selectedNation.data.general.motto
                    : "Pas de devise"}
                </em>
              </>
            }
          />

          <DashTile
            title="Lien externe"
            children={
              <>
                <div className=" bg-complementary rounded-full flex flex-col items-center justify-center">
                  {selectedNation.data.url.websiteUrl ? (
                    <a
                      href={selectedNation.data.url.websiteUrl}
                      className="cursor-pointer"
                    >
                      <div className="text-[3.1rem] flex justify-center">
                        <FaLink />
                      </div>
                      <p>{selectedNation.data.url.websiteUrl}</p>
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
