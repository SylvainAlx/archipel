import { SelectedNationProps } from "../../types/typProp";
import EditIcon from "../editIcon";
import HashTag from "../tags/hashTag";

export default function TagList({
  selectedNation,
  owner,
}: SelectedNationProps) {
  return (
    <div className="w-full px-2 flex flex-wrap items-center justify-center gap-2">
      {selectedNation.data.general.tags.map((hashtag, i) => {
        return (
          <span className="flex justify-center items-center gap-1" key={i}>
            <HashTag label={hashtag} />
          </span>
        );
      })}
      {owner && (
        <EditIcon
          target="nation"
          param={selectedNation.data.general.tags}
          path="data.general.tags"
        />
      )}
    </div>
  );
}
