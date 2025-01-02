import { lazy, Suspense } from "react";
import { Nation } from "../../types/typNation";
import { handleDeleteImage } from "../../utils/procedures";
import Spinner from "../loading/spinner";
import CrossButton from "../buttons/crossButton";
import { GiBlackFlag } from "react-icons/gi";
import Upploader from "../uploader";
import LinkButton from "../buttons/linkButton";
import { FLAG_MAKER_URL } from "../../settings/consts";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

interface FlagProps {
  nation: Nation;
  owner: boolean;
}

export default function BigFlag({ nation, owner }: FlagProps) {
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
            {owner && (
              <CrossButton
                small={true}
                click={() =>
                  handleDeleteImage({
                    url: nation.data.url.flag,
                    type: "flag",
                  })
                }
              />
            )}
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
                  destination="nation"
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
