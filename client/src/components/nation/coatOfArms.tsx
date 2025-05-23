import { lazy, Suspense } from "react";
import Spinner from "../ui/loading/spinner";
import CrossButton from "../ui/buttons/crossButton";
import { BsShieldShaded } from "react-icons/bs";
import Upploader from "../ui/uploader";
import LinkButton from "../ui/buttons/linkButton";
import { COA_MAKER_URL } from "../../settings/consts";
import { FaExternalLinkAlt } from "react-icons/fa";
import { NationModel } from "../../models/nationModel";
import useCoatOfArms from "../../hooks/componentsHooks/nation/useCoatOfArms";

interface CoatOfArmsProps {
  nation: NationModel;
  owner: boolean;
  updatePath: (path: string, value: string, needConfirm?: boolean) => void;
}

export default function CoatOfArms({
  nation,
  owner,
  updatePath,
}: CoatOfArmsProps) {
  const LazyImage = lazy(() => import("../ui/lazy/lazyImage"));
  const { handleDeleteImage, t } = useCoatOfArms(nation, updatePath);

  return (
    <div className="relative">
      <div
        className={`w-[200px] h-full flex flex-col items-center justify-end gap-2`}
      >
        {nation.data.url.coatOfArms ? (
          <>
            <Suspense fallback={<Spinner />}>
              <LazyImage
                src={nation.data.url.coatOfArms}
                alt={`coatOfArms of ${nation.name}`}
                className="object-contain w-full h-full cursor-zoom-in"
                hover={t("components.hoverInfos.coatOfArms")}
              />
            </Suspense>
            {owner && <CrossButton small={true} click={handleDeleteImage} />}
          </>
        ) : (
          <>
            <div className="text-9xl">
              <BsShieldShaded />
            </div>
            {owner && (
              <>
                <Upploader
                  path="data.url.coatOfArms"
                  updatePath={updatePath}
                  maxSize={500000}
                />
                <LinkButton
                  text={t("components.buttons.generate")}
                  path={COA_MAKER_URL}
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
