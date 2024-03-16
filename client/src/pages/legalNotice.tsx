import H1 from "../components/titles/h1";
import H2 from "../components/titles/h2";

export default function LegalNotice() {
  return (
    <>
      <H1 text="Mentions légales" />

      <section className="w-[80%] flex flex-col items-center gap-2 text-justify">
        <p>
          L'accès et l'utilisation de notre site Internet sont soumis aux
          conditions ci-dessous et aux dispositions légales en vigueur.
        </p>
        <H2 text="Propriété du site" />
        <p>
          Le présent site est la propriété de{" "}
          <a href="https://sylvainalx.github.io/portfolio/" target="_blank">
            Sylvain Alexandre
          </a>
          . Ce dernier développe et maintient seul le site et le rend disponible
          aux internautes à titre gratuit.
        </p>
        <H2 text="Hébergement" />
        <p>
          L’hébergement du présent site est assuré par Vercel Inc.
          <br />
          440 N Barranca Ave #4133 Covina
          <br />
          CA 91723 USA
        </p>
        <H2 text="Propriété intellectuelle" />
        <p>
          L’ensemble de ce site relève de la législation française et
          internationale sur le droit d’auteur et la propriété intellectuelle.
          Tous les droits de reproduction sont réservés, y compris pour les
          documents téléchargeables et les représentations iconographiques et
          photographiques. Le contenu du site est, sauf mention contraire, la
          propriété de Sylvain Alexandre. En conséquence et sauf mention
          contraire, toute utilisation des contenus du site ne peut être faite
          que moyennant l’autorisation écrite du propriétaire dont celui-ci
          reste seul juge. Toute reproduction ou représentation même partielle
          par quelque procédé que ce soit, réalisée sans le consentement écrit
          du propriétaire est interdite et illicite. Le non-respect de cette
          interdiction constitue une contrefaçon pouvant engager la
          responsabilité civile et pénale du contrefacteur.
        </p>
        <H2 text="Politique de confidentialité" />
        <p>
          Le présent site tient à coeur la préservation de l'anonymat de ses
          utilisateurs et ne collecte et ne conserve aucune donnée personnelle,
          à savoir aucun cookie, aucune adresse IP, aucun nom et aucune adresse
          postale ou mail.
        </p>
      </section>
    </>
  );
}
