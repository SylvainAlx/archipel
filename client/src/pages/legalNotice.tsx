import H1 from "../components/titles/h1";
import H2 from "../components/titles/h2";

export default function LegalNotice() {
  return (
    <>
      <H1 text="Mentions légales" />
      <H2 text="Propriété du site" />
      <p>Le présent site est la propriété de Sylvain Alexandre</p>
      <H2 text="Hébergement" />
      <p>
        L’hébergement du présent site est assuré par Vercel Inc., 440 N Barranca
        Ave #4133 Covina, CA 91723 USA
      </p>
      <H2 text="Propriété intellectuelle" />
      <p>
        L’ensemble de ce site relève de la législation française et
        internationale sur le droit d’auteur et la propriété intellectuelle.
        Tous les droits de reproduction sont réservés, y compris pour les
        documents téléchargeables et les représentations iconographiques et
        photographiques. Le contenu du site est, sauf mention contraire, la
        propriété de Sylvain Alexandre. En conséquence et sauf mention
        contraire, toute utilisation des contenus du site ne peut être faite que
        moyennant l’autorisation écrite du propriétaire dont celui-ci reste seul
        juge. Toute reproduction ou représentation même partielle par quelque
        procédé que ce soit, réalisée sans le consentement écrit du propriétaire
        est interdite et illicite. Le non-respect de cette interdiction
        constitue une contrefaçon pouvant engager la responsabilité civile et
        pénale du contrefacteur.
      </p>
    </>
  );
}
