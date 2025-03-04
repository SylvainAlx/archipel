## Code source

Le code source est public et est visible [ici](https://github.com/SylvainAlx/archipel)

## Version actuelle

### RC-1.0.0

#### Ajouts

- Ajout d'une fenètre d'aide à l'utilisation
- Autorisation des crawlers des moteurs de recherche pour l'indexation
- L'éditeur d'une nation peut céder la gestion à un autre citoyen
- Tri possible des utilisateurs par date de dernière visite
- Une nation peut obtenir le status officiel sur validation de son dirigeant réel
- Consultation possible des paramètres des crédits pour les utilisateurs connectés
- Ajout d'une page "erreur 404"
- L'utilisateur connecté peut créer une nouvelle clé de récupération de son compte

#### Suppressions

- Suppression impossible de la nation tant qu'au moins deux citoyens en font partie

#### Modifications & Corrections

- Conforme pour les navigateurs : Chrome, Brave, Edge
- Mise à jour des CGU
- Optimisation du code source et mise à jour des dépendances
- Propriété "Etat-Nation" modifiable
- Le tri des nation est à présent défini par défaut sur "Richesse décroissante"
- Les quotas et les coûts des lieux et tuiles peuvent être ajustés directement en base de donnée
- Durcissement des règles pour le choix du mot de passe d'un nouvel utilisateur ou lors d'un changement
- Refonte de l'onglet "statistiques" de la page "explorer"

## Développements à venir

- Créer une organisation ou en rejoindre une
- Créer des items et les proposer à l'acquisition aux citoyens
- Ajouter les hymnes des nations
- Créer une gazette des nations en se basant sur les communiqués
- Montrer la répartitions des langues parlées dans chaque nation
- Exporter une carte d'identité virtuelle sous forme d'image
- Étendre les fonctionnalités pour les utilisateurs mobile
- Lier les lieux de la nation à un emplacement sur la carte
- Améliorer des traductions
- Carte virtuelle d'Archipel avec l'ensemble des nations représentées

## Versions précédentes

### BETA-0.7

#### Ajouts

- Ajout d'une description lors de la création d'une nouvelle relation diplomatique
- Pouvoir modifier une relation diplomatique
- Virements de crédits possibles entre citoyens et entre nations
- Ajout du statu en ligne et date de dernière visite des utilisateurs

#### Suppressions

Aucune

#### Modifications & Corrections

- Optimisation du code source
- Amélioration du modal de donation
- Amélioration de la page d'attente
- Mise à jour importante des dépendances du code source
- Refonte du système de notifications
- Amélioration de la gestion des erreurs
- Modification des liens de nouveau possible
- Amélioration du comportement des fenêtres modales
- Amélioration de l'accessibilité
- Modification du générateur de clés de récupération de compte

### BETA-0.6

#### Ajouts

- Ajout d'un lien vers les comptes Instagram et Threads
- Ajout d'un bouton de don en cryptomonnaie
- Ajout d'une notification d'alerte si l'application est hors ligne
- Ajout de "skeletons" pour les éléments en cours de chargement
- Le citoyen d'une nation peut choisir un lieu de résidence parmi les villes existantes de sa nation
- Ajout du tag de richesse sur les tuiles "nation"
- Tri possible des nations par richesse

#### Suppressions

- Mise en retrait de l'IA d'analyse d'image suite à des complications
- Mise en retrait de la limitation de durée entre chaque communication postée

#### Modifications & Corrections

- Importante refonte du code source côté client
- Amélioration de l'interception d'erreur côté serveur
- Chargement plus progressif des composants d'une page pour améliorer la rapidité générale
- Correction de la recherche des nations par mot-clé
- Modification du nom de l'onglet "Communiqués" par "Actualités" sur la page "Explorer"
- Correction du bouton de consentement des cookies
- Amélioration des notifications de communications

### BETA-0.5

#### Ajouts

- Ajout du concept d'"État-Nation" avec un champ dans le formulaire d'inscription et l'indication sur la nation
- Ajout d'un tag "État-Nation" pour les nations concernées
- Ajout d'un compteur dynamique pour l'onglet "statistiques" de la page "explorer"
- Ajout d'un ping régulier sur le backend pour maintenir le serveur actif

#### Suppressions

Aucune

#### Modifications & Corrections

- Optimisation du code source
- Modification du tag "distinction"
- Autorisation de la distinction "pionnier" pour les utilisateurs inscrits avant le 07/03/2025 (date de sortie prévue de la version 1.0.0)
- Modification du tag "rôle du citoyen": le "leader de la nation" devient "éditeur de la nation"
- Sécurisation des formulaires
- Correction du bug d'affichage dans le champ d'édition des valeurs
- Correction du bug d'affichage de crédits pour l'édition d'une tuile libre
- Correction du bug pour poster une communication + blocage 24h étendu aux communications privée de la nation
- Augmentation du nombre d'éléments visibles initialement dans les onglets de la page "explorer" (10 -> 30)
- Correction du calcul des statistiques
- Modification de la liste des communiqué en intégrant les annonce générales
- Mise en forme des CGU

### BETA-0.4

#### Ajouts

- Ajout du fichier robots.txt pour les crawlers des moteurs de recherche
- Ajout de l'information et du tag "religion" pour les citoyens
- Ajout du tag "genre" pour les citoyens
- Ajouts de nouvelles langues pour le tag "langue"
- Ajout d'un bouton de partage sur les pages des citoyens, nations et lieux
- Ajout du nom du document sur l'onglet du navigateur

#### Suppressions

- Suppression du stockage des images dans le localStorage du navigateur

#### Modifications & Corrections

- Optimisation du code source
- Modification de l'UX des tuiles sur la page "explorer"
- Correction des bugs de la PWA
- Correction du bug de création de communiqué
- Modification du tri par défaut des lieux sur la page "explorer"
- Amélioration des traductions anglaises
- Amélioration des modals de modification
- Amélioration du tag "langue"

### BETA-0.3

#### Ajouts

- Réaffichage des crédits dans la vue "Nation"

#### Suppressions

- mise en retrait du bouton de souscription de la page citoyen (fonctionnalité non disponible pour l'heure)

#### Modifications & Corrections

- Optimisation du code source
- Modification de la présentation des notes de version
- Modification du style des éléments MarkDown
- Correction de la gestion des mots-clés lors de la création d'une nation
- Correction de l'édition de la liste de mots-clés
- Correction des algorithmes liés aux crédits de la nation
- Correction de taille de la barre de navigation en version mobile
- Correction du problème de cache pour les image
- Correction du blocage de recherche sur la page explorer
- Amélioration des traductions

### BETA-0.2

#### Ajouts

- Ajout du régime "démocratie illibérale"
- Ajout du nombre d'occurrence par mot-clé dans les statistiques
- Ajout du nombre de lieux enfants sur les tuiles de lieu sur la page "nation"
- Filtre par tag directement possible en cliquant sur celui-ci
- Extension du tag "Date" pour les citoyens, nations et lieux
- Ajout du tri par ordre de création/inscription
- Ajout du tag "Pionnier" pour les utilisateurs inscrits avant 2025

#### Suppressions

- mise en retrait du tri par "Richesse" pour les nations (fonctionnalité non disponible pour l'heure)
- mise en retrait du tag de crédit et du trésor public (fonctionnalité non disponible pour l'heure)

#### Modifications & Corrections

- Correction du dysfonctionnement du tri sur la page "explorer"
- Correction de l'erreur de nom du lieu parent
- Optimisation du code source
- Amélioration des traductions
- Amélioration des performances
- Ajout d'un timer pour l'indication de chargement long (démarrage serveur)

### BETA-0.1

#### Ajouts

- Parcourir la liste des nations, des citoyens, des lieux virtuels et des communiqués publics
- Créer un compte de citoyen virtuel
- Créer une nation virtuelles
- Créer des lieux pour sa nation virtuelle
- Rejoindre une nation virtuelle
- Créer des relations diplomatiques entre nations
- Signaler des contenus offensants
- Poster des communiqués officiels et des communications privée pour la nation

#### Suppressions

Aucune

#### Modifications & Corrections

Aucune
