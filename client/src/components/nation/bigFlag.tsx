import { lazy, Suspense } from "react";
import { Nation } from "../../types/typNation";
import { deleteImage } from "../../utils/procedures";
import Spinner from "../loading/spinner";
import CrossButton from "../buttons/crossButton";
import { GiBlackFlag } from "react-icons/gi";
import Upploader from "../uploader";
import LinkButton from "../buttons/linkButton";
import { FLAG_MAKER_URL } from "../../settings/consts";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { confirmBox, myStore } from "../../settings/store";

interface FlagProps {
  nation: Nation;
  owner: boolean;
  updatePath: (path: string, value: string, needConfirm?: boolean) => void;
}

export default function BigFlag({ nation, owner, updatePath }: FlagProps) {
  const handleDeleteImage = async () => {
    myStore.set(confirmBox, {
      text: t("components.modals.confirmModal.deleteFile"),
      actionToDo: async () => {
        const result = await deleteImage(nation.data.url.flag);
        if (result) {
          updatePath("data.url.flag", "", false);
        }
      },
    });
  };

  const { t } = useTranslation();
  const LazyImage = lazy(() => import("../lazy/lazyImage"));
  return (
    <div className="relative">
      <div className={`w-[200px] flex flex-col items-center justify-end gap-2`}>
        {nation.data.url.flag ? (
          <div className="relative">
            <Suspense fallback={<Spinner />}>
              <LazyImage
                src={nation.data.url.flag}
                alt={`flag of ${nation.name}`}
                className="object-contain w-full h-full rounded cursor-zoom-in"
                hover={t("components.hoverInfos.flag")}
              />
            </Suspense>
            {owner && <CrossButton small={true} click={handleDeleteImage} />}
          </div>
        ) : (
          <>
            <div className="text-9xl">
              <GiBlackFlag />
            </div>
            {owner && (
              <>
                <Upploader
                  path="data.url.flag"
                  updatePath={updatePath}
                  maxSize={500000}
                />
                <LinkButton
                  text={t("components.buttons.generate")}
                  path={FLAG_MAKER_URL}
                  children={<FaExternalLinkAlt />}
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
