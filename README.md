# Archipel

## 📌 Version

Archipel est actuellement en version **v1.0.0**.
La phase bêta est terminée et l'application est désormais accessible librement au public.
Cette version précède la _v1.0.0_ qui viendra conclure cette période de développement en corrigeant les éventuels bugs et proposera un MVP de l'application.

### État actuel

- Version de production temporaire avec vigilance de la stabilité
- Les avis des utilisateurs sont toujours les bienvenus

## ✨ Le projet

### Présentation

#### Origine

C'est en construisant un archipel représentant une nation dans le jeu vidéo Minecraft, et échangeant avec d'autres joueurs partageant les mêmes envies, que m'est venue l'idée de rassembler dans une même application toutes les nations fictives d'origines diverses.
J'était développeur junior au début du projet et ce nouveau challenge était parfait pour que je puisse me lancer dans l'élaboration complète d'une application jusqu'à son déploiement.

#### Objectif

L'application Archipel a pour projet de rassembler en un même endroit les nations virtuelles et les micronations existantes à travers le monde. Le but est de permettre l'interaction entre des nations sérieuses et d'autres complètement ludiques et animées par un jeu de rôles.

### Les fonctionnalités principales

#### Choix de la langue

L'application Archipel propose le choix de la langue afin d'améliorer l'expérience utilisateur. Le choix est conservé par le navigateur de l'internaute, ce dernier pouvant le modifier à tout moment en sélectionnant le bouton prévu à cet effet.

#### Autres accès

L'application Archipel donne également l'accès à un internaute non inscrit aux Conditions Générales d'Utilisation, aux notes de versions de l'application et à un lien email pour entrer en contact avec l'éditeur.

#### Page "mon compte"

L'inscription d'un utilisateur sur l'application Archipel permet à celui-ci d'expérimenter une citoyenneté virtuelle en rejoignant ou en créant une nation virtuelle une fois inscrit.

Tout utilisateur inscrit sur Archipel peut accéder au détail de son compte en cliquant sur le bouton "MON COMPTE" dans la barre de navigation. Cette page est identique aux pages "citoyen" énoncées plus haut, avec cependant la possibilité d'éditer le nom, l'avatar, les liens et la biographie. La page propose également au citoyen de changer son mot de passe, de modifier ses préférences concernant les cookies, se déconnecter et supprimer son compte.

#### Rejoindre une nation

Un utilisateur sans aucune nation peut demander la citoyenneté de n'importe quelle nation depuis la page de cette dernière. Une fois la demande effectuée, celle-ci devra être validée par le gérant de la nation en question. Il est possible d'annuler sa demande directement depuis la page "MON COMPTE" en cliquant sur la petite croix présente sur le bouton avec le nom de la nation.
Il n'est pas possible de faire plusieurs demandes en même temps et il n'est également pas possible d'être dans deux nations.

#### Fonctionnalités complémentaires pour le citoyen inscrit

L'utilisateur peut signaler via le bouton du même nom tout contenu qu'il juge inapproprié. L'administrateur de l'application sera informé et agira en conséquence.

#### La création d'une nation virtuelle

Pour créer une nation, il est indispensable au préalable de s'inscrire sur Archipel.
Dans la version actuelle de l'application, seul l'utilisateur à l'origine de la création d'une nation a la possibilité d'y apporter des modifications à moins que celui-ci ait cédé les droits à un autre citoyen de cette même nation.

Un utilisateur n'appartenant pas à une nation a la possibilité d'en créer une nouvelle dont il sera responsable. Lors de la création d'une nation il est demandé de renseigner :

- Le nom de la nation (obligatoire et ne doit pas être celui d'une nation déjà existante sur l'application ou dans la réalité).
- La devise
- Un ou plusieurs mots clés pour apporter un meilleur référencement de la nation
- Le nom de la monnaie (fictive ou non)
- Le jour de la fête nationale (même si le choix de l'année est possible, ne sera affiché que le jour et le mois)
- S'il s'agit d'un État-Nation ou non (par défaut "oui")
- Le type de régime (obligatoire)

Si tous les éléments obligatoires sont correctement renseignés, la nation sera créée avec succès.

#### La modification d'une nation

L'utilisateur en charge d'une nation va pouvoir la mettre à jour et renseigner toutes les informations qu'il juge bon de faire connaître au public.
Sur la page "NATION" (accessible depuis la page de citoyen ou directement sur la barre de navigation) il est possible de :

- Modifier les informations liées à l'identité de la nation
- Ajouter une carte de la nation
- Ajouter des tuiles d'informations libres
- Créer des relations diplomatiques
- Voir la liste des citoyens de la nation et les déchoir de leur nationalité si nécessaire ou en accepter de nouveaux
- Créer des lieux dans la nation (État, Région, Environnement ou Ville)
- Créer des communiqués officiels

Un badge "officiel" peut être acquis si le gérant réel de la nation confirme à l'Éditeur par mail quel utilisateur peut modifier la nation sur Archipel. Si approbation, les informations de la nation deviennent, de fait, officielles.

L'éditeur d'une nation peut décider seul de supprimer sa nation à condition qu'il en soit le seul citoyen. Cela a pour conséquence la suppression de tous les lieux, tuiles et communiqués associés.
Dans le cas où la nation comporte plusieurs citoyens, l'éditeur de la nation peut décider de transmettre les droits d'édition à un autre citoyen.

#### Les crédits

Les crédits ajoutent une mécanique à l'application qui participe à son côté ludique. Les nations ayant le plus grand nombre de crédits (appellée trésorerie) sont vues en premier dans l'onglet "nations" de la page explorer.

**Obtention des crédits**  
Des crédits sont donnés lorsque :

- Un utilisateur rejoint Archipel
- Une nation est créée
- Un utilisateur rejoint une nation

**Dépense des crédits**  
Des crédits sont prélevés lorsque :

- le seuil maximal "gratuit" pour créer des lieux et des tuiles d'informations est dépassé

**Transfert de crédits**  
Le transfert de crédits est possible entre utilisateurs et nations.

**Informations complémentaires**  
Si l'éditeur de la nation supprime un lieu ou une tuile qui lui a coûté des crédits, la nation regagne cette somme.
Le montant des crédits peut varier dans le temps.

## 💻 Le code source

### Les choix techniques

#### Front-End

Le code source côté client utilise les technologies principales suivantes:

- Vite
- React
- TypeScript
- TailwindCSS
- i18next
- Jotai

La factorisation et la découpe du code est en cours en vue d'obtenir à terme une architecture MVVM qui n'était pas prévue à l'origine.

#### Back-End

Le code source côté serveur utilise les technologies principales suivantes:

- Node.js
- Express
- Mongoose
- Bcrypt
- Bip39

#### La base de données

Les données sont stockées sur une base cloud MongoDB pour la production et une base locale pour le développement.

---

Merci pour votre intérêt et votre soutien au projet Archipel et bonne visite sur l'application !
