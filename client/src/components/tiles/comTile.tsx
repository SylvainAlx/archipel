import MDEditor from "@uiw/react-md-editor";
import { Com } from "../../types/typCom";
import NationTag from "../tags/nationTag";
import EditIcon from "../editIcon";
import { useAtom } from "jotai";
import { sessionAtom } from "../../settings/store";
import { useEffect, useState } from "react";

export interface ComTileProps {
  com: Com;
}

export default function ComTile({ com }: ComTileProps) {
  const [session] = useAtom(sessionAtom);
  const [owner, setOwner] = useState(false);
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
  return (
    <div
      className={`p-2 rounded flex flex-col items-center gap-3 bg-complementary shadow-xl`}
    >
      <div className="w-full flex justify-between">
        <h3 className="text-light text-xl pl-4 pr-6">{com.title}</h3>
        <NationTag label={com.origin != undefined ? com.origin : ""} />
      </div>
      <div className="flex items-center gap-2">
        <MDEditor.Markdown
          className="bg-transparent text-light text-justify"
          source={com.message}
          style={{ whiteSpace: "pre-wrap" }}
        />
        {owner && <EditIcon target="com" param={com.message} path="message" />}
      </div>
    </div>
  );
}
