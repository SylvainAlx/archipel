import Tag from "./tag";
import { customTagProps } from "../../types/typProp";
import { FaCoins } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { MdAddCircle } from "react-icons/md";
import { useAtom } from "jotai";
import { infoModalAtom } from "../../settings/store";

export default function CreditTag({ owner, label }: customTagProps) {
  const { t } = useTranslation();
  const [, showInfo] = useAtom(infoModalAtom);
  return (
    <Tag
      text={label.toString()}
      hover={t("components.hoverInfos.tags.credits")}
      bgColor="bg-info"
      children={
        <>
          {owner && (
            <span
              className="text-2xl cursor-pointer"
              onClick={() =>
                showInfo(
                  "[A TRADUIRE] L'ajout de crédits n'est pas encore disponible",
                )
              }
            >
              <MdAddCircle />
            </span>
          )}
          <FaCoins />
        </>
      }
    />
  );
}
