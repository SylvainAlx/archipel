import { Nation } from "../../types/typNation";
import EditIcon from "../editIcon";
import HashTag from "../tags/hashTag";

interface TagListProps {
  nation: Nation;
  owner?: boolean;
  isTile: boolean;
}

export default function TagList({ nation, owner, isTile }: TagListProps) {
  return (
    <div
      className={`w-full flex flex-wrap items-center gap-1 ${isTile ? "justify-end" : "justify-center"}`}
    >
      {nation.data.general.tags.map((hashtag, i) => {
        return (
          <span className="flex justify-center items-center gap-1" key={i}>
            <HashTag label={hashtag} />
          </span>
        );
      })}
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
