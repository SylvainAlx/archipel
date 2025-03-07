import MDEditor from "@uiw/react-md-editor";
import NationTag from "../tags/nationTag";
import { useAtom } from "jotai";
import {
  comListAtomV2,
  confirmBox,
  myStore,
  sessionAtom,
} from "../../../settings/store";
import { useEffect, useState } from "react";
import CrossButton from "../buttons/crossButton";
import { useTranslation } from "react-i18next";
import DateTag from "../tags/dateTag";
import ReportPanel from "../reportPanel";
import { ComModel } from "../../../models/comModel";
import { NationModel } from "../../../models/nationModel";
import { FaCheckSquare } from "react-icons/fa";
import Button from "../buttons/button";
import { ImCheckboxUnchecked } from "react-icons/im";
import { isNation } from "../../../utils/functions";
import { COM_TYPE } from "../../../settings/consts";
import { RiChatPrivateFill } from "react-icons/ri";

export interface ComTileProps {
  nation?: NationModel;
  com: ComModel;
}

export default function ComTile({ nation, com }: ComTileProps) {
  const [session] = useAtom(sessionAtom);
  const [comList] = useAtom(comListAtomV2);
  const [nationOwner, setNationOwner] = useState(false);
  const [comOwner, setComOwner] = useState(false);
  const [read, setRead] = useState(com.read);
  const { t } = useTranslation();

  useEffect(() => {
    if (
      (session.user.citizenship.nationId === com.origin ||
        session.user.citizenship.nationId === com.destination) &&
      session.user.citizenship.nationOwner
    ) {
      setNationOwner(true);
    } else {
      setNationOwner(false);
    }
    if (session.user.officialId === com.destination) {
      setComOwner(true);
    } else {
      setComOwner(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [com.origin, session]);

  const handleDelete = () => {
    myStore.set(confirmBox, {
      text: t("components.modals.confirmModal.deleteCom"),
      actionToDo: async () => {
        const comToDelete = new ComModel();
        comToDelete.baseDelete(com._id);
        if (nation) await comList.removeByBaseId(com._id);
      },
    });
  };

  const handleRead = async () => {
    await com.readCom(!read);
    setRead(!read);
  };

  return (
    <div
      className={`${(comOwner || nationOwner) && !com.read ? "bg-complementary2" : "bg-complementary"} p-2 rounded flex flex-col items-center gap-3 shadow-xl `}
    >
      <div className="w-full flex justify-between">
        <h3 className="pl-4 pr-6 text-light text-xl flex items-center gap-2">
          {com.comType === COM_TYPE.nationPrivate.id && <RiChatPrivateFill />}
          {com.title}
        </h3>
        <div className="flex gap-1 items-center flex-wrap justify-end">
          <DateTag date={com.createdAt} />
          {com.origin != undefined && isNation(com.origin) && (
            <NationTag label={com.origin} />
          )}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        {com.message.split("|").map((message, i) => {
          return (
            <MDEditor.Markdown
              key={i}
              className="bg-transparent text-light text-justify"
              source={message}
              style={{ whiteSpace: "wrap" }}
            />
          );
        })}
      </div>
      <div className="w-full flex items-center justify-end gap-2">
        {(comOwner || nationOwner) && (
          <Button
            click={handleRead}
            text={
              read
                ? t("components.buttons.markAsUnread")
                : t("components.buttons.markAsRead")
            }
          >
            {read ? <FaCheckSquare /> : <ImCheckboxUnchecked />}
          </Button>
        )}
        {comOwner || nationOwner ? (
          <CrossButton click={handleDelete} />
        ) : (
          <ReportPanel content={com} center={false} />
        )}
      </div>
    </div>
  );
}
