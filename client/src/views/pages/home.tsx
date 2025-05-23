import Button from "../../components/ui/buttons/button";
import H1 from "../../components/ui/titles/h1";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { sessionAtom } from "../../settings/store";
import { useAtom } from "jotai";
import { IoMdAddCircleOutline, IoMdGlobe, IoMdLogIn } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import { GiBlackFlag } from "react-icons/gi";
import CryptoDonationButton from "../../components/ui/buttons/cryptoDonationButton";
import { createPageTitle } from "../../utils/procedures";
import MDEditor from "@uiw/react-md-editor";
import { lazy, Suspense } from "react";
import ImageSkeleton from "../../components/ui/loading/skeletons/imageSkeleton";
import { BsFillEnvelopeAtFill } from "react-icons/bs";
import { ADMIN_EMAIL } from "../../settings/consts";
import HelpButton from "../../components/ui/buttons/helpButton";

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [session] = useAtom(sessionAtom);
  createPageTitle(t("components.buttons.home"));
  const Illustration = lazy(() => import("../../components/ui/illustration"));

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
                  >
                    <IoMdAddCircleOutline />
                  </Button>
                  <Button
                    text={t("components.buttons.login")}
                    type="button"
                    click={() => navigate("/login")}
                  >
                    <IoMdLogIn />
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    text={t("components.buttons.user")}
                    type="button"
                    click={() =>
                      navigate(`/citizen/${session.user.officialId}`)
                    }
                  >
                    <RxAvatar />
                  </Button>
                  {session.user.citizenship.nationId != "" && (
                    <Button
                      text={t("components.buttons.nation")}
                      type="button"
                      click={() =>
                        navigate(`/nation/${session.user.citizenship.nationId}`)
                      }
                    >
                      <GiBlackFlag />
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
          <Suspense fallback={<ImageSkeleton />}>
            <Illustration
              src="/illustrations/citizen.webp"
              alt="illustration"
            />
          </Suspense>
        </article>
        <article className="flex flex-col-reverse lg:flex-row justify-center items-center lg:items-stretch flex-wrap px-4 gap-4">
          <Suspense fallback={<ImageSkeleton />}>
            <Illustration
              src="/illustrations/worldbuilding.webp"
              alt="illustration"
            />
          </Suspense>
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
              >
                <IoMdGlobe />
              </Button>
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
          <Suspense fallback={<ImageSkeleton />}>
            <Illustration
              src="/illustrations/assembly.webp"
              alt="illustration"
            />
          </Suspense>
        </article>
        <article className="flex flex-col-reverse lg:flex-row justify-center items-center lg:items-stretch flex-wrap px-4 gap-4">
          <Suspense fallback={<ImageSkeleton />}>
            <Illustration
              src="/illustrations/archipelago.webp"
              alt="illustration"
            />
          </Suspense>
          <div className="lg:animate-fade-left w-full lg:w-[45%]">
            <MDEditor.Markdown
              className="presentation"
              source={t("pages.home.presentation4")}
            />
            <div className="animate-fade w-full py-4 flex justify-center gap-2 flex-wrap">
              <HelpButton showText={true} bgColor="" />
              <Link
                className="w-full md:w-min flex items-center justify-center gap-1"
                to={`mailto:${ADMIN_EMAIL}`}
              >
                <Button text={t("components.buttons.contact")} type="button">
                  <BsFillEnvelopeAtFill />
                </Button>
              </Link>
            </div>
          </div>
        </article>
      </section>
    </>
  );
}
