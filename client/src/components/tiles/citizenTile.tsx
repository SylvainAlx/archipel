import { useLocation, useNavigate } from "react-router-dom";
import { User } from "../../types/typUser";
import EyeButton from "../buttons/eyeButton";
import IdTag from "../tags/idTag";
import RoleTag from "../tags/roleTag";
import Avatar from "../avatar";
import CitizenTag from "../tags/citizenTag";
import {
  citizenFetchAtom,
  myStore,
  nationFetchedAtom,
  sessionAtom,
} from "../../settings/store";
import { EmptyNation } from "../../types/typNation";
import { declineCitizenship } from "../../utils/functions";
import CrossButton from "../buttons/crossButton";
import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";
import NationTag from "../tags/nationTag";

export interface CitizenTileProps {
  citizen: User;
}

export default function CitizenTile({ citizen }: CitizenTileProps) {
  const navigate = useNavigate();
  const emplacement = useLocation();
  const { t } = useTranslation();
  const [session] = useAtom(sessionAtom);
  const handleClick = () => {
    myStore.set(citizenFetchAtom, citizen);
    myStore.set(nationFetchedAtom, EmptyNation);
    navigate(`/citizen/${citizen.officialId}`);
  };

  return (
    <div
      className={`p-2 rounded flex flex-col items-center gap-3 bg-complementary shadow-xl`}
    >
      <div className="w-full flex justify-between">
        <div className="flex items-center">
          <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center overflow-hidden">
            <Avatar url={citizen.avatar} />
          </div>
          <h3 className="text-light text-xl pl-4 pr-6">{citizen.name}</h3>
        </div>
        <EyeButton click={handleClick} />
      </div>
      {session.user.citizenship.nationOwner &&
        session.user.citizenship.nationId === citizen.citizenship.nationId &&
        session.user.officialId != citizen.officialId &&
        emplacement.pathname != "/explore" &&
        citizen.citizenship.status > 0 && (
          <div className="w-max self-end">
            <CrossButton click={() => declineCitizenship(citizen)} />
          </div>
        )}

      <div className="max-w-[90%] flex flex-wrap items-center self-end justify-end gap-1">
        {citizen.citizenship.status === 0 && (
          <CitizenTag
            label={t("components.hoverInfos.tags.pendingCitizenship")}
            citizen={citizen}
          />
        )}
        {citizen.role === "admin" && <RoleTag label="admin" />}
        {citizen.officialId && <IdTag label={citizen.officialId} />}
        {citizen.citizenship.nationId != "" && (
          <NationTag
            label={citizen.citizenship.nationId}
            founder={citizen.citizenship.nationOwner}
          />
        )}
      </div>
    </div>
  );
}
