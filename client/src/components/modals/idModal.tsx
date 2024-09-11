import { useAtom } from "jotai";
import Button from "../buttons/button";
import { idModalAtom } from "../../settings/store";
import { useTranslation } from "react-i18next";
import Avatar from "../avatar";
import { lazy, Suspense, useEffect, useState } from "react";
import { genderList } from "../../settings/consts";
import Spinner from "../loading/spinner";

export default function IdModal() {
  const [idModal, setIdModal] = useAtom(idModalAtom);
  const [gender, setGender] = useState("");
  const { t } = useTranslation();

  const LazyImage = lazy(() => import("../lazy/lazyImage"));

  useEffect(() => {
    genderList.forEach((element) => {
      if (element.id === idModal.citizen.gender) {
        setGender(element.label);
      }
    });
  }, [idModal.citizen.gender]);

  const handleClick = () => {
    setIdModal({ ...idModal, show: false });
  };

  const handlePress = (e: React.KeyboardEvent) => {
    const { key } = e;
    if (key === "Enter") {
      setIdModal({ ...idModal, show: false });
    }
  };

  return (
    <>
      <h2 className="text-2xl text-center p-4">ID</h2>
      <div
        className={`w-[500px] p-2 flex flex-wrap items-start justify-between border-2 border-red-700 border-solid rounded-md`}
      >
        <div className="w-1/4">
          <Suspense fallback={<Spinner />}>
            <LazyImage
              src={idModal.nation.data.url.flag}
              alt={`flag of ${idModal.nation.name}`}
              className="object-contain w-full h-full rounded cursor-zoom-in"
              hover={t("components.hoverInfos.flag")}
            />
          </Suspense>
        </div>
        <div className="w-3/4 flex justify-end">
          <Avatar url={idModal.citizen.avatar} />
        </div>
        <div className="text-lg">
          <span className="text-sm text-secondary">NUMÉRO D'IDENTITÉ : </span>
          {idModal.citizen.officialId}
        </div>

        <div className="text-2xl">
          <span className="text-sm text-secondary">NOM : </span>
          {idModal.citizen.name}
        </div>
        <div className="text-2xl">
          <span className="text-sm text-secondary">SURNOM : </span>
          {idModal.citizen.surname}
        </div>
        <div className="text-lg">
          <span className="text-sm text-secondary">GENRE : </span>
          {gender}
        </div>
      </div>
      <Button
        text={t("components.buttons.close")}
        click={handleClick}
        keyDown={handlePress}
      />
    </>
  );
}
