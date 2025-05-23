import { lazy, Suspense } from "react";
import Spinner from "../ui/loading/spinner";
import CrossButton from "../ui/buttons/crossButton";
import { GiBlackFlag } from "react-icons/gi";
import Upploader from "../ui/uploader";
import LinkButton from "../ui/buttons/linkButton";
import { FLAG_MAKER_URL } from "../../settings/consts";
import { FaExternalLinkAlt } from "react-icons/fa";
import useBigFlag from "../../hooks/componentsHooks/nation/useBigFlag";
import { NationModel } from "../../models/nationModel";

interface FlagProps {
  nation: NationModel;
  owner: boolean;
  updatePath: (path: string, value: string, needConfirm?: boolean) => void;
}

export default function BigFlag({ nation, owner, updatePath }: FlagProps) {
  const { handleDeleteImage, t } = useBigFlag(nation, updatePath);

  const LazyImage = lazy(() => import("../ui/lazy/lazyImage"));
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
                >
                  <FaExternalLinkAlt />
                </LinkButton>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
