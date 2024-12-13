import MDEditor from "@uiw/react-md-editor";
import { Com } from "../../types/typCom";
import NationTag from "../tags/nationTag";
import { useAtom } from "jotai";
import { confirmBox, myStore, sessionAtom } from "../../settings/store";
import { useEffect, useState } from "react";
import CrossButton from "../buttons/crossButton";
import { useTranslation } from "react-i18next";
import DateTag from "../tags/dateTag";
import ReportPanel from "../reportPanel";

export interface ComTileProps {
  com: Com;
  owner: boolean;
}

export default function ComTile({ com }: ComTileProps) {
  const [session] = useAtom(sessionAtom);
  const [owner, setOwner] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    if (
      session.user.citizenship.nationId === com.origin &&
      session.user.citizenship.nationOwner
    ) {
      setOwner(true);
    } else {
      setOwner(false);
    }
  }, [com.origin, session]);

  const handleDelete = () => {
    myStore.set(confirmBox, {
      action: "deleteCom",
      text: t("components.modals.confirmModal.deleteCom"),
      result: "",
      target: com,
    });
  };

  return (
    <div
      className={`p-2 rounded flex flex-col items-center gap-3 bg-complementary shadow-xl`}
    >
      <div className="w-full flex justify-between">
        <h3 className="text-light text-xl pl-4 pr-6">{com.title}</h3>
        <div className="flex gap-1 items-center flex-wrap justify-end">
          <DateTag date={com.createdAt} />
          {com.origin != undefined && com.origin.charAt(2) === "n" && (
            <NationTag label={com.origin} />
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <MDEditor.Markdown
          className="bg-transparent text-light text-justify"
          source={com.message}
          style={{ whiteSpace: "pre-wrap" }}
        />
      </div>
      <div className="w-max self-end">
        {owner ? (
          <CrossButton click={handleDelete} />
        ) : (
          <ReportPanel content={com} center={false} />
        )}
      </div>
    </div>
  );
}
