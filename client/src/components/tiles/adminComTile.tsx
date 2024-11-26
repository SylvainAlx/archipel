import { Com } from "../../types/typCom";
import { confirmBox, myStore } from "../../settings/store";
import { useEffect } from "react";
import CrossButton from "../buttons/crossButton";
import { useTranslation } from "react-i18next";
import DateTag from "../tags/dateTag";
import LinkButton from "../buttons/linkButton";
import Button from "../buttons/button";
import { BiSolidHide } from "react-icons/bi";
import { FaBan } from "react-icons/fa";
import { reportContent } from "../../api/admin/adminAPI";

export interface ComTileProps {
  com: Com;
}

export default function AdminComTile({ com }: ComTileProps) {
  const { t } = useTranslation();
  useEffect(() => {}, [com]);

  const handleWarn = (target: string) => {
    reportContent(target);
  };

  const handleBan = (target: string) => {
    console.log(target);
  };

  const handleDelete = () => {
    myStore.set(confirmBox, {
      action: "deleteCom",
      text: t("components.modals.confirmModal.deleteCom"),
      result: "",
      target: com,
    });
  };

  const getTargetPath = (target: string) => {
    let path: string = "";
    switch (target.charAt(2)) {
      case "c":
        path = `/citizen/${target}`;
        break;
      case "n":
        path = `/nation/${target}`;
        break;
      case "p":
        path = `/place/${target}`;
        break;
      default:
        break;
    }
    return path;
  };

  return (
    <div
      className={`p-2 rounded flex flex-col items-center gap-3 bg-complementary shadow-xl`}
    >
      <div className="w-full flex justify-between">
        <h3 className="text-light text-xl pl-4 pr-6">{com.title}</h3>
        <div className="flex gap-1 items-center flex-wrap justify-end">
          {com.origin && (
            <LinkButton
              text={`ORIGINE: @${com.origin}`}
              path={`/citizen/${com.origin}`}
              blank={false}
            />
          )}
          {com.destination && (
            <LinkButton
              text={`CIBLE: @${com.destination}`}
              path={getTargetPath(com.destination)}
              blank={false}
            />
          )}
          <DateTag date={com.createdAt} />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <p className="bg-transparent text-light text-justify">{com.message}</p>
      </div>
      <div className="w-max self-end flex items-center gap-1">
        <Button
          text="masquer"
          bgColor="bg-wait"
          children={<BiSolidHide />}
          click={() =>
            handleWarn(
              com.destination && com.origin
                ? com.destination
                : com.origin
                  ? com.origin
                  : "",
            )
          }
        />
        <Button
          text="bannir"
          bgColor="bg-danger"
          children={<FaBan />}
          click={() =>
            handleBan(
              com.destination && com.origin
                ? com.destination
                : com.origin
                  ? com.origin
                  : "",
            )
          }
        />
      </div>
      <div className="self-end">
        <CrossButton click={handleDelete} text="supprimer com" />
      </div>
    </div>
  );
}
