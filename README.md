# OneScientificStudy OSS V2 2024 | Documentation
## Description
Le projet OneScientificStudy (OSS V2 2024) est une application visant à gérer une étude scientifique multicentrique, en particulier sur une période de six mois en situation de pandémie hospitalière. L'application est construite sur des technologies modernes, optimisées pour offrir des performances fiables et évolutives.

## Ce que le projet fait
OneScientificStudy OSS V2 2024 permet aux équipes médicales et scientifiques de collecter, stocker et analyser les données des patients et des observations cliniques. Il simplifie la gestion des données critiques, améliore la qualité de l'analyse et facilite la prise de décisions basées sur des données fiables. Les fonctionnalités principales incluent la collecte de données en temps réel, la gestion des rapports et des analyses, et une interface utilisateur intuitive pour les professionnels de la santé.

## Pourquoi le projet est utile
Dans un contexte de pandémie, la rapidité et l'efficacité dans la gestion des données sont essentielles. Cette application permet aux équipes hospitalières de suivre l'évolution des patients, de centraliser les données des différents centres participants, et de disposer d’une base de données complète et sécurisée. Les utilisateurs peuvent ainsi accéder aux informations en temps réel et obtenir des rapports sur mesure, ce qui est crucial pour la prise de décision rapide et précise dans des environnements de soins intensifs.

## Technologies utilisées
- **ASP.NET Core 7.0** : Cette version de .NET Core permet de créer une API RESTful performante, flexible, et sécurisée. Elle sert de backend de l'application, gérant les requêtes, la logique métier et les échanges de données avec la base de données.
- **PostgreSQL** : Base de données relationnelle robuste, PostgreSQL est utilisée pour stocker toutes les entités du projet, incluant potentiellement les données des patients, les informations de l’étude, les résultats des observations, et autres données structurées pertinentes.
- **React** : Framework JavaScript utilisé pour créer l’interface utilisateur (UI) de manière réactive et dynamique. React permet une bonne modularité, ce qui facilite la gestion des composants et rend l’application plus intuitive pour les utilisateurs finaux.

##  Prise en Main du Projet par les Utilisateurs
Pour démarrer l’application, il est nécessaire d’exécuter le backend et le frontend indépendamment.

### <u>Étapes d'Exécution du Backend</u>

Le backend est configuré dans un projet .NET Core avec ASP.NET Core 7.0. Voici comment le lancer :

1. Accédez au dossier du projet backend depuis votre terminal ou votre invite de commandes.

2. Exécutez la commande suivante:

``` shell
    dotnet run
```
Cela démarre le serveur backend, qui écoute par défaut les requêtes HTTP. Assurez-vous que tous les dépendances et packages nécessaires sont installés, comme les bibliothèques NuGet pour .NET Core.

3. Configuration de la connexion à PostgreSQL:
Assurez-vous que les paramètres de connexion PostgreSQL (comme l’hôte, le port, le nom de la base de données, l’utilisateur, et le mot de passe) sont correctement
définis dans le fichier de configuration (appsettings.json ou une autre configuration dédiée) du projet.

4. Migrations de la Base de Données:
Si vous n'avez pas encore initialisé la base de données, vous devrez peut-être appliquer des migrations avec dotnet ef database update pour que les tables soient correctement créées dans PostgreSQL.


### <u>Étapes d'Exécution du Frontend</u>
Le frontend est développé avec React. Pour lancer l'interface utilisateur:

1. Accédez au dossier du projet frontend depuis votre terminal ou votre invite de commandes.

2. Installez les dépendances du projet en exécutant la commande:
``` shell
    npm install
```
Cela installera toutes les bibliothèques et packages nécessaires pour React, définis dans le fichier package.json.

1. Exécutez la commande suivante pour démarrer le serveur de développement React:
``` shell
    npm run dev
```
Cela lance le serveur local de développement pour React, généralement accessible via http://localhost:{port}. Vous pouvez y accéder depuis un navigateur pour interagir avec l’interface utilisateur.

1. Configuration des Appels API:
Assurez-vous que les appels API effectués depuis le frontend pointent bien vers l’URL où le backend ASP.NET Core est hébergé, surtout si l’API est sur un port différent (comme http://localhost:{port} pour le backend et http://localhost:{port} pour le frontend).


## Où les Utilisateurs peuvent Obtenir de l’Aide

Si vous avez des questions ou rencontrez des problèmes avec le projet, plusieurs options sont disponibles :

- Documentation du Projet : Des informations détaillées sur les fonctionnalités et les configurations sont fournies dans les fichiers du projet et le readme dans le dossier Backend.
- Swagger du projet : Les routes et les models sont expliqué dans un swagger: (http://localhost:5058/index.html)

## Qui Maintient et Contribue au Projet

Le projet OneScientificStudy OSS V2 2024 est maintenu par l’équipe de développement de MAUNN:
- Mathis Champin
- Raphael Sapalo-esteves
- Damian Gil 

Les mises à jour régulières et les correctifs sont assurés par les mainteneurs principaux.

### Confidential Entreprise MAUNN | Novembre 2024
