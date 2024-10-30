import Tag from "./tag";
import { customTagProps } from "../../types/typProp";
import { FaCoins } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { MdAddCircle } from "react-icons/md";
import { errorMessage } from "../../utils/toasts";

export default function CreditTag({ owner, label }: customTagProps) {
  const { t } = useTranslation();
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
              onClick={() => errorMessage(t("toasts.user.creditsNotReady"))}
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
