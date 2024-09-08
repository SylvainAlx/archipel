import Tag from "./tag";
import { FaPassport } from "react-icons/fa";
import { User } from "../../types/typUser";
import { useAtom } from "jotai";
import { sessionAtom } from "../../settings/store";
import { IoMdCloseCircle } from "react-icons/io";
import { MdCheckCircle } from "react-icons/md";
import { changeStatus } from "../../api/user/userAPI";
// import { useTranslation } from "react-i18next";

export interface CitizenTagProps {
  label: string;
  citizen: User;
}

export default function CitizenTag({ label, citizen }: CitizenTagProps) {
  //   const { t } = useTranslation();
  const [session] = useAtom(sessionAtom);

  const declineCitizenship = () => {
    changeStatus({
      officialId: citizen.officialId,
      nationId: citizen.citizenship.nationId,
      status: -1,
    });
  };

  const approveCitizenship = () => {
    changeStatus({
      officialId: citizen.officialId,
      nationId: citizen.citizenship.nationId,
      status: 1,
    });
  };

  return (
    <Tag
      text={label.toString().toUpperCase()}
      hover="citoyenneté"
      bgColor="bg-complementary3"
      // textStyle="uppercase"
      children={
        <div className="flex gap-2 items-center">
          {session.user.citizenship.nationId === citizen.citizenship.nationId &&
            session.user.citizenship.nationOwner && (
              <div className="flex items-center">
                <div
                  onClick={approveCitizenship}
                  className="cursor-pointer text-xl text-success"
                >
                  <MdCheckCircle />
                </div>
                <div
                  onClick={declineCitizenship}
                  className="cursor-pointer text-xl text-danger"
                >
                  <IoMdCloseCircle />
                </div>
              </div>
            )}
          <FaPassport />
        </div>
      }
    />
  );
}
