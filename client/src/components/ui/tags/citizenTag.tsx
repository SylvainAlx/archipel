import Tag from "./tag";
import { FaPassport } from "react-icons/fa";
import { useAtom } from "jotai";
import { sessionAtom } from "../../../settings/store";
import { IoMdCloseCircle } from "react-icons/io";
import { MdCheckCircle } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { UserModel } from "../../../models/userModel";

export interface CitizenTagProps {
  label: string;
  citizen: UserModel;
}

export default function CitizenTag({ label, citizen }: CitizenTagProps) {
  const { t } = useTranslation();
  const [session] = useAtom(sessionAtom);

  return (
    <Tag
      text={label.toString().toUpperCase()}
      hover={t("components.hoverInfos.tags.pendingCitizenship")}
      bgColor="bg-complementary3"
    >
      <div className="flex gap-2 items-center">
        {session.user.citizenship.nationId === citizen.citizenship.nationId &&
          session.user.citizenship.nationOwner && (
            <div className="flex items-center bg-light rounded-full px-1">
              <div
                onClick={() => citizen.approveCitizenship()}
                className="cursor-pointer text-xl text-success"
              >
                <MdCheckCircle />
              </div>
              <div
                onClick={() => citizen.declineCitizenship()}
                className="cursor-pointer text-xl text-danger"
              >
                <IoMdCloseCircle />
              </div>
            </div>
          )}
        <FaPassport />
      </div>
    </Tag>
  );
}
