# 📚 Suivi des devoirs

Ce projet est une application fonctionnant avec le *framework* [Angular](https://angular.io/) afin de suivre et gérer les devoirs donnés par une équipe pédagogique fictive, ce projet fait office d'une [évaluation](http://miageprojet2.unice.fr/Intranet_de_Michel_Buffa/M1_MIAGE_2021-2022_-_Technologies_Web_-_Angular/Mini-projet_Angular_M1_Miage_2022-2023) donnée pour la première année du Master *Méthodes informatiques appliquées à la gestion des entreprises (MIAGE)* par Monsieur Michel Buffa enseignant les technologies Internet.

Afin de faire fonctionner ce projet, <ins>vous devez posséder</ins> :
- *NodeJS* : v19+ (la version 18 LTS peut aussi fonctionner).
- *Gestionnaire npm* : v9.2+

**Une connexion Internet est évidemment obligatoire et celle-ci ne doit pas être restreinte au travers d'un serveur mandataire (proxy) ou d'une connexion chiffrée anonyme (VPN).**

## Compilation du projet

Pour exécuter ce projet sur votre machine locale, voici ce que vous devez faire :
- Installer les dépendances npm des dossiers `client` et `server` au travers de la commande `npm install`.
- Une fois terminé, ouvrez deux terminaux de commande dont l'un sera utilisé dans le dossier `client` pour la partie Angular et l'autre dans le dossier `server` pour le point de terminaison de l'application.
- Dans le dossier `client`, exécutez la commande `npm start` et patientez l'exécution automatique des scripts d'Angular.
- Dans le dossier `server`, exécutez la commande `npm start` et patientez que le micro-programme appelé « *nodemon* » génère une instance du serveur NodeJS.
- Vous pouvez vous lancer, la base de données sera automatiquement connectée !

## Fonctionnalités

<ins>Authentification</ins>

- L'utilisateur peut s'authentifier grâce à son adresse électronique et son mot de passe attribué. Si l'utilisateur n'est pas authentifié, alors il peut seulement accéder au tableau de bord avec la liste des devoirs.

- Il est possible que le site garde en mémoire la connexion de l'utilisateur afin de l'authentifier automatiquement lors de la prochaine visite.

- Une fois connecté, un bouton présent dans l'en-tête permet de se déconnecter définitivement du site et bloquer le mécanisme de reconnexion automatique.

<ins>Visualisation</ins>

- En tant qu'utilisateur authentifié, l'utilisateur peut visualiser l'ensemble des devoirs et les informations associées en affichant les détails de chaque devoir (créateur, date de rendu, note, matière, remarque, etc...).

- Si l'utilisateur est un administrateur, alors il peut marquer comme "rendu" le devoir ou effectuer des éditions sur un devoir spécifique (attention, un devoir rendu doit forcément avoir une note / 20).

<ins>Gestion des utilisateurs</ins>

- Il y a donc deux types d'utilisateurs : les utilisateurs "standard" et les utilisateurs "administrateurs" : les utilisateurs classiques ne peuvent pas modifier ou supprimer des devoirs (mais en ajouter ou visualiser des devoirs), alors qu'un administrateur peut effectuer toutes les actions possibles (ajout, modification, édition, suppression, visualisation).

<ins>Gestion des devoirs</ins>

- Une fois connecté, un bouton "Ajouter un devoir" apparaîtra dans l'en-tête de la page pour ajouter un nouveau devoir en offrant la possibilité de renseigner toutes les informations comme le nom, le créateur, la date de rendu, les remarques et la note.
[22:48]
- Une fois créé, le devoir sera accessible dans le tableau et pourra être recherché au travers deux filtres : affichage de tous les devoirs rendus ou recherche par nom du devoir. En cliquant sur un devoir, ses détails apparaîtront et il sera possible de modifier les informations ou tout simplement supprimer le devoir.

- Il est important de noter une nouvelle fois qu'il est impossible de marquer comme "rendu" un devoir qui n'est pas noté.

## Authentification

Si vous voulez tester ce projet ou si vous êtes l'enseignant en charge de la notation de ce devoir, voici les identifiants pour accéder au compte administrateur :

- <ins>Nom d'utilisateur</ins> : `brahim@gmail.com`
- <ins>Mot de passe</ins> : `1234`

Il y a aussi un compte utilisateur qui ne sert que pour ajouter un devoir, voici les identifiants pour accéder au compte utilisateur :

- <ins>Nom d'utilisateur</ins> : `yannis@gmail.com`
- <ins>Mot de passe</ins> : `1234`

## Vidéo démonstrative de l'application:
- https://www.youtube.com/watch?v=ZGnC5KNqQDI
