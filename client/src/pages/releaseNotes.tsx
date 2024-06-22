import { useTranslation } from "react-i18next";
import DashTile from "../components/dashTile";
import H1 from "../components/titles/h1";
import H2 from "../components/titles/h2";
import { ImLab } from "react-icons/im";
import { IoBulb } from "react-icons/io5";

export default function ReleaseNotes() {
  const { t } = useTranslation();
  return (
    <>
      <H1 text={t("pages.releaseNotes.title")} />
      <ul className="flex flex-col-reverse gap-2">
        <li>
          <DashTile
            className="bg-complementary"
            title=""
            children={
              <>
                <H2 text="1.0.0" />
                <ul>
                  <li>
                    Parcourir la liste des nations, des citoyens et des lieux
                    virtuels
                  </li>
                  <li>Créer un compte de citoyen virtuel</li>
                  <li>Créer une nation virtuelles</li>
                  <li>Créer des lieux pour sa nation virtuelle</li>
                </ul>
              </>
            }
          />
        </li>
        <li>
          <DashTile
            title=""
            children={
              <>
                <div className="flex gap-2 items-center">
                  <ImLab />
                  <H2 text="Développements en cours" />
                </div>

                <ul>
                  <li>Créer une organisation</li>
                  <li>Rejoindre une organisation</li>
                  <li>Rejoindre une nation virtuelles</li>
                </ul>
              </>
            }
          />
        </li>
        <li>
          <DashTile
            title=""
            children={
              <>
                <div className="flex gap-2 items-center">
                  <IoBulb />
                  <H2 text="Développements à venir" />
                </div>

                <ul>
                  <li>
                    <em>Pas de nouveaux développements programmés</em>
                  </li>
                </ul>
              </>
            }
          />
        </li>
      </ul>
    </>
  );
}
