import DashTile from "../dashTile";
import TileContainer from "../tileContainer";
import FreeTile from "../tiles/freeTile";

export default function FreeTiles() {
  return (
    <TileContainer
      children={
        <DashTile
          title="Tuiles libres"
          children={
            <div className="flex flex-wrap items-stretch justify-center gap-4">
              <FreeTile title="Superficie" description="" value="12 km²" />
              <FreeTile
                title="Population maximum"
                description="Nombre d'habitants pouvant être accueillis en fonction du nombre de logement"
                value="429 habitants"
              />
              <FreeTile
                title="Dernière assemblée de l'Agora"
                description=""
                value="01/10/2024"
              />
              <FreeTile
                title="Total lignes maritimes"
                description=""
                value="8"
              />
            </div>
          }
        />
      }
    />
  );
}
