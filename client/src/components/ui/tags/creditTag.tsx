import Tag from "./tag";
import { customTagProps } from "../../../types/typProp";
import { FaCoins } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { MdAddCircle } from "react-icons/md";
import { errorMessage } from "../../../utils/toasts";

export default function CreditTag({ owner, label }: customTagProps) {
  const { t } = useTranslation();

  return (
    <Tag
      text={label != undefined ? label.toString() : ""}
      hover={t("components.hoverInfos.tags.credits")}
      bgColor={owner ? "bg-complementary2" : "bg-gold"}
    >
      <>
        {owner && (
          <span
            className="text-2xl cursor-not-allowed"
            onClick={() => errorMessage(t("toasts.errors.creditsNotReady"))}
          >
            <MdAddCircle />
          </span>
        )}
        <FaCoins />
      </>
    </Tag>
  );
}
