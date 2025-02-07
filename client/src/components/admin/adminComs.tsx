import { Suspense, useEffect, useState } from "react";
import TileContainer from "../tileContainer";
import AdminComTile from "../tiles/adminComTile";
import H2 from "../titles/h2";
import IndexTag from "../tags/indexTag";
import Button from "../buttons/button";
import { useTranslation } from "react-i18next";
import { ComListModel } from "../../models/lists/comListModel";
import TileSkeleton from "../loading/skeletons/tileSkeleton";

export default function AdminComs() {
  const [adminComList, setAdminComList] = useState<ComListModel>(
    new ComListModel(),
  );
  const [displayedComs, setDisplayedComs] = useState(10);
  const { t } = useTranslation();

  useEffect(() => {
    const loadList = async () => {
      const updatedList = await adminComList.loadAdminComList();
      updatedList && setAdminComList(updatedList);
    };
    loadList();
  }, []);
  return (
    <TileContainer
      children={
        <>
          <H2 text="Communications" />
          <section className="w-full flex gap-1 flex-wrap items-center flex-col-reverse">
            {adminComList != undefined &&
              adminComList.getItems().length > 0 &&
              adminComList.getItems().map((com, i) => {
                if (i < displayedComs) {
                  return (
                    <Suspense key={i} fallback={<TileSkeleton />}>
                      <div className="min-w-[300px] w-full relative transition-all duration-300 animate-fadeIn">
                        <AdminComTile com={com} />
                        <IndexTag text={i} />
                      </div>
                    </Suspense>
                  );
                }
              })}
            {displayedComs < adminComList.getItems().length && (
              <Button
                click={() => setDisplayedComs(displayedComs + 5)}
                text={t("components.buttons.showMore")}
              />
            )}
          </section>
        </>
      }
    />
  );
}
