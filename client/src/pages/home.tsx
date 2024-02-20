import { useAtom } from "jotai";
import Button from "../components/button";
import H1 from "../components/titles/h1";
import { nationAtom } from "../settings/store";
import { TITLE } from "../settings/consts";

export default function Home() {
  const [nation] = useAtom(nationAtom);

  return (
    <>
      <H1 text="Bienvenue" />
      <p className="text-xl px-4">
        Découvrez le monde fascinant des Nations Virtuelles avec {TITLE},
        l'appli qui donne vie à votre propre nation numérique. Suivez son
        évolution, interagissez avec d'autres nations et forgez des alliances
        dans un univers virtuel où l'imagination rencontre la réalité. Bienvenue
        sur Nations Virtuelles, où le pouvoir de la communauté façonne l'avenir
        numérique de votre nation !
      </p>
      {nation._id === undefined || nation._id === "" ? (
        <div className="w-full py-4 flex justify-center gap-4 flex-wrap">
          <Button text="SE CONNECTER" type="button" path="/login" />
          <Button text="S'ENREGISTRER" type="button" path="/register" />
        </div>
      ) : (
        <div className="w-full py-4 flex justify-center gap-4 flex-wrap">
          <Button text="TABLEAU DE BORD" type="button" path="/dashboard" />
        </div>
      )}
    </>
  );
}
