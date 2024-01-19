/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from "jotai";
import { nationAtom, selectedNationAtom } from "../../../settings/store";
import { useEffect, useState } from "react";
import { EmptyNation } from "../../../types/typNation";
import H1 from "../../../components/titles/h1";
import DashTile from "../../../components/dashTile";
import { StringProps } from "../../../types/typProp";
import { GiBlackFlag } from "react-icons/gi";
import { FaLink, FaRegImage } from "react-icons/fa6";
import Tag from "../../../components/tag";
import TileContainer from "../../../components/tileContainer";
import H3 from "../../../components/titles/h3";
import H2 from "../../../components/titles/h2";

// import { GiBlackFlag } from "react-icons/gi";
// import Uploader from "../components/uploader";

export default function DashboardMain({ text }: StringProps) {
  const [myNation] = useAtom(nationAtom);
  const [selectedNation] = useAtom(selectedNationAtom);
  const [nation, setNation] = useState(EmptyNation);
  const [owner, setOwner] = useState(false);

  useEffect(() => {
    if (myNation._id === selectedNation._id) {
      setNation(myNation);
      setOwner(true);
    } else {
      setNation(selectedNation);
      setOwner(false);
    }
  }, [selectedNation]);

  return (
    <>
      <H1 text={text} />
      <TileContainer
        children={
          <>
            <DashTile
              title="Bannière"
              className="w-full"
              children={
                <div className="w-[50px] h-[50px] bg-complementary rounded-full flex items-center justify-center">
                  {nation.data.url.bannerUrl ? (
                    <img
                      src={nation.data.url.bannerUrl}
                      alt={`banner of ${nation.name}`}
                      className="w-full h-full"
                    />
                  ) : (
                    <div className="text-[3.1rem]">
                      <FaRegImage />
                    </div>
                  )}
                </div>
              }
            />
            <DashTile
              title="Informations générales"
              className="min-w-[300px]"
              children={
                <>
                  <div className="flex gap-2">
                    {nation.role === "admin" && (
                      <Tag text="admin" bgColor="bg-info" />
                    )}
                    {nation.data.general.regime === -1 && (
                      <Tag
                        text="régime politique inconnu"
                        bgColor="bg-danger"
                      />
                    )}
                  </div>
                  <H2 text={nation.name} />
                </>
              }
            />
            <DashTile
              title="Symboles"
              className="min-w-[300px]"
              children={
                <>
                  <div className="w-[50px] h-[50px] bg-complementary rounded-full flex flex-col items-center justify-center">
                    {nation.data.url.flagUrl ? (
                      <img
                        src={nation.data.url.flagUrl}
                        alt={`flag of ${nation.name}`}
                        className="w-full h-full"
                      />
                    ) : (
                      <div className="text-[3.1rem]">
                        <GiBlackFlag />
                      </div>
                    )}
                  </div>
                  <em>
                    {nation.data.general.motto
                      ? nation.data.general.motto
                      : "Pas de devise"}
                  </em>
                </>
              }
            />
            <DashTile
              title="Points Navir"
              children={
                <>
                  <H3 text={nation.data.general.points} />
                </>
              }
            />
            <DashTile
              title="Lien externe"
              children={
                <>
                  <div className=" bg-complementary rounded-full flex flex-col items-center justify-center">
                    {nation.data.url.websiteUrl ? (
                      <a
                        href={nation.data.url.websiteUrl}
                        className="cursor-pointer"
                      >
                        <div className="text-[3.1rem] flex justify-center">
                          <FaLink />
                        </div>
                        <p>{nation.data.url.websiteUrl}</p>
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
      {owner && <></>}
    </>
  );
}
