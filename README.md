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