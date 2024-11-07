# OneScientificStudy OSS V2 2024 | Documentation
## Description

Le projet OneScientificStudy (OSS V2 2024) est une application visant à gérer une étude scientifique multicentrique, en particulier sur une période de six mois en situation de pandémie hospitalière. L'application est construite sur des technologies modernes, optimisées pour offrir des performances fiables et évolutives.

- **ASP.NET Core 7.0** : Cette version de .NET Core permet de créer une API RESTful performante, flexible, et sécurisée. Elle sert de backend de l'application, gérant les requêtes, la logique métier et les échanges de données avec la base de données.
- **PostgreSQL** : Base de données relationnelle robuste, PostgreSQL est utilisée pour stocker toutes les entités du projet, incluant potentiellement les données des patients, les informations de l’étude, les résultats des observations, et autres données structurées pertinentes.
- **React** : Framework JavaScript utilisé pour créer l’interface utilisateur (UI) de manière réactive et dynamique. React permet une bonne modularité, ce qui facilite la gestion des composants et rend l’application plus intuitive pour les utilisateurs finaux.

##  Guide d'Exécution du Projet
Pour démarrer l’application, vous devrez exécuter indépendamment le backend et le frontend de l'application.

# Étapes d'Exécution du Backend
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


# Étapes d'Exécution du Frontend
Le frontend est développé avec React. Pour lancer l'interface utilisateur:

1. Accédez au dossier du projet frontend depuis votre terminal ou votre invite de commandes.

2. Installez les dépendances du projet en exécutant la commande:
``` shell
    npm install
```
Cela installera toutes les bibliothèques et packages nécessaires pour React, définis dans le fichier package.json.

3. Exécutez la commande suivante pour démarrer le serveur de développement React:
``` shell
    npm run dev
```
Cela lance le serveur local de développement pour React, généralement accessible via http://localhost:{port}. Vous pouvez y accéder depuis un navigateur pour interagir avec l’interface utilisateur.

4. Configuration des Appels API:
Assurez-vous que les appels API effectués depuis le frontend pointent bien vers l’URL où le backend ASP.NET Core est hébergé, surtout si l’API est sur un port différent (comme http://localhost:{port} pour le backend et http://localhost:{port} pour le frontend).

### Confidential Entreprise MAUNN | Novembre 2024
