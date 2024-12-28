import { useTranslation } from "react-i18next";
import { Nation } from "../../types/typNation";
import EditIcon from "../editIcon";
import HashTag from "../tags/hashTag";

interface TagListProps {
  nation: Nation;
  owner?: boolean;
  isTile: boolean;
}

export default function TagList({ nation, owner, isTile }: TagListProps) {
  const { t } = useTranslation();
  return (
    <div
      className={`w-full flex flex-wrap items-center gap-1 ${isTile ? "justify-end" : "justify-center"}`}
    >
      {nation.data.general.tags.length > 0 ? (
        nation.data.general.tags.map((hashtag, i) => {
          return (
            <span className="flex justify-center items-center gap-1" key={i}>
              <HashTag label={hashtag} occurrence={-1} />
            </span>
          );
        })
      ) : (
        <HashTag
          label={t("pages.nation.nationIdentity.noTags")}
          occurrence={-1}
        />
      )}
      {owner && (
        <EditIcon
          target="nation"
          param={nation.data.general.tags}
          path="data.general.tags"
        />
      )}
    </div>
  );
}
