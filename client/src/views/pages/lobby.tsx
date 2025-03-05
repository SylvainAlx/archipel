import Input from "../../components/form/input";
import { LOBBY_INFO, MDP_LOBBY } from "../../settings/consts";
import Button from "../../components/ui/buttons/button";
import Form from "../../components/form/form";
import LangButton from "../../components/ui/buttons/langButton";
import RequiredStar from "../../components/form/requiredStar";
import { createPageTitle } from "../../utils/procedures";
import { useLobby } from "../../hooks/pagesHooks/useLobby";

export default function Lobby() {
  const { handleChange, handleSubmit, password, t } = useLobby();

  createPageTitle("");

  return (
    <main className="flex flex-col items-center justify-start gap-4 h-[70vh]">
      {LOBBY_INFO != "" && (
        <strong className="animate-pulse">{LOBBY_INFO}</strong>
      )}
      {MDP_LOBBY != "" && (
        <Form submit={handleSubmit}>
          <>
            <p className="max-w-[80%] text-center">
              {t("pages.lobby.password")}
            </p>
            <Input
              type="password"
              placeholder={t("components.form.input.password")}
              name="password"
              required
              value={password}
              onChange={handleChange}
            />
            <RequiredStar />
            <Button
              type="submit"
              text={t("components.buttons.validate")}
              widthFull={true}
            />
            <LangButton />
          </>
        </Form>
      )}
    </main>
  );
}
