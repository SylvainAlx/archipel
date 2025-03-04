import Button from "../../components/buttons/button";
import H1 from "../../components/titles/h1";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { sessionAtom } from "../../settings/store";
import { useAtom } from "jotai";
import Illustration from "../../components/illustration";
import { IoMdAddCircleOutline, IoMdGlobe, IoMdLogIn } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import { GiBlackFlag } from "react-icons/gi";
import CryptoDonationButton from "../../components/buttons/cryptoDonationButton";
import { createPageTitle } from "../../utils/procedures";
import MDEditor from "@uiw/react-md-editor";

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [session] = useAtom(sessionAtom);
  createPageTitle(t("components.buttons.home"));

  return (
    <>
      <H1 text={t("pages.home.title")} />
      <section className="flex flex-col items-center gap-10">
        <article className="flex flex-col lg:flex-row justify-center items-center lg:items-stretch flex-wrap px-4 gap-4">
          <div className="lg:animate-fade-right w-full lg:w-[45%] flex flex-col justify-between">
            <MDEditor.Markdown
              className="presentation"
              source={t("pages.home.presentation1")}
            />
            <div className="animate-fade w-full py-4 flex justify-center gap-2 flex-wrap">
              {session.user.officialId === undefined ||
              session.user.officialId === "" ? (
                <>
                  <Button
                    text={t("components.buttons.register")}
                    type="button"
                    click={() => navigate("/register")}
                    children={<IoMdAddCircleOutline />}
                  />
                  <Button
                    text={t("components.buttons.login")}
                    type="button"
                    click={() => navigate("/login")}
                    children={<IoMdLogIn />}
                  />
                </>
              ) : (
                <>
                  <Button
                    text={t("components.buttons.user")}
                    type="button"
                    click={() =>
                      navigate(`/citizen/${session.user.officialId}`)
                    }
                    children={<RxAvatar />}
                  />
                  {session.user.citizenship.nationId != "" && (
                    <Button
                      text={t("components.buttons.nation")}
                      type="button"
                      click={() =>
                        navigate(`/nation/${session.user.citizenship.nationId}`)
                      }
                      children={<GiBlackFlag />}
                    />
                  )}
                </>
              )}
            </div>
          </div>
          <Illustration src="/citizen.webp" />
        </article>
        <article className="flex flex-col-reverse lg:flex-row justify-center items-center lg:items-stretch flex-wrap px-4 gap-4">
          <Illustration src="/worldbuilding.webp" />
          <div className="lg:animate-fade-left w-full lg:w-[45%]">
            <MDEditor.Markdown
              className="presentation"
              source={t("pages.home.presentation2")}
            />
            <div className="animate-fade w-full py-4 flex justify-center gap-2 flex-wrap">
              <Button
                text={t("components.buttons.explore")}
                type="button"
                click={() => navigate("/explore")}
                children={<IoMdGlobe />}
              />
              <CryptoDonationButton />
            </div>
          </div>
        </article>
        <article className="flex flex-col lg:flex-row justify-center items-center lg:items-stretch flex-wrap px-4 gap-4">
          <div className="lg:animate-fade-right w-full lg:w-[45%]">
            <MDEditor.Markdown
              className="presentation"
              source={t("pages.home.presentation3")}
            />
          </div>
          <Illustration src="/archipelago.webp" />
        </article>
      </section>
    </>
  );
}
