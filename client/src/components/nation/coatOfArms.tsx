import { lazy, Suspense } from "react";
import { Nation } from "../../types/typNation";
import { handleDeleteImage } from "../../utils/procedures";
import Spinner from "../loading/spinner";
import CrossButton from "../buttons/crossButton";
import { useTranslation } from "react-i18next";
import { BsShieldShaded } from "react-icons/bs";
import Upploader from "../uploader";
import LinkButton from "../buttons/linkButton";
import { COA_MAKER_URL } from "../../settings/consts";
import { FaExternalLinkAlt } from "react-icons/fa";

interface CoatOfArmsProps {
  nation: Nation;
  owner: boolean;
}

export default function CoatOfArms({ nation, owner }: CoatOfArmsProps) {
  const { t } = useTranslation();
  const LazyImage = lazy(() => import("../lazy/lazyImage"));
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
            {owner && (
              <CrossButton
                small={true}
                click={() =>
                  handleDeleteImage({
                    url: nation.data.url.coatOfArms,
                    type: "coatOfArms",
                  })
                }
              />
            )}
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
                  destination="nation"
                  maxSize={500000}
                />
                <LinkButton
                  text={t("components.buttons.generate")}
                  path={COA_MAKER_URL}
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
