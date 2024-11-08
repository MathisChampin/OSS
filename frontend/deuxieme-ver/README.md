# OneScientificStudy OSS V2 2024 | Documentation Frontend

Le README propose une **configuration minimale** pour démarrer avec **React et TypeScript dans Vite**, un build tool moderne pour les applications front-end. Il inclut la **mise à jour à chaud (Hot Module Replacement ou HMR)** et quelques règles de base ESLint pour l’analyse du code.

## Plugins officiels disponibles

Deux plugins sont mentionnés pour intégrer React dans un projet Vite, chacun utilisant un outil différent pour gérer le Fast Refresh (mise à jour instantanée sans rechargement complet de la page) :

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
  
Les deux plugins sont officiels et garantissent une expérience de développement rapide et efficace avec React.

## Extension de la configuration ESLint

Pour les applications en production, il est recommandé d’adapter la configuration ESLint afin d’activer des règles de lint plus poussées, tenant compte des types TypeScript. Cette configuration améliorée est appelée "type-aware lint rules" et permet de détecter plus d’erreurs potentielles dans le code en utilisant les informations de typage de TypeScript.

Les étapes pour étendre cette configuration sont les suivantes :

1. Configuration de parserOptions

Le fichier ESLint doit être configuré avec des options de parsing spécifiques pour intégrer les types TypeScript. Cela inclut notamment :
- `project` : indique les fichiers de configuration TypeScript (`tsconfig.node.json`, `tsconfig.app.json`) que ESLint doit utiliser.
- `tsconfigRootDir` : spécifie le répertoire racine où se trouvent ces fichiers `tsconfig`, ici `import.meta.dirname`, ce qui pointe vers le répertoire courant du projet.


Exemple de configuration :
```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```
#

2. Mise à jour des règles recommandées

Les configurations de base de tseslint peuvent être ajustées pour utiliser des règles plus strictes et détaillées :

- `tseslint.configs.recommendedTypeChecked` : ajoute des règles ESLint qui prennent en compte les types TypeScript de base.
- `tseslint.configs.strictTypeChecked` : ajoute des règles encore plus strictes pour vérifier le typage dans tout le code.
- `tseslint.configs.stylisticTypeChecked` (facultatif) : ajoute des règles de style de code liées aux types TypeScript, pour uniformiser la façon d’écrire le code.

#
3. Installation de eslint-plugin-react

Pour une meilleure prise en charge de React dans ESLint, l’ajout du plugin eslint-plugin-react est conseillé. Ce plugin contient des règles spécifiques à React, permettant de vérifier les bonnes pratiques et d’éviter certaines erreurs fréquentes.

installation du plugin :
```shell
  npm install eslint-plugin-react
```
**Exemple de configuration complète avec** `eslint-plugin-react`

Une fois le plugin ajouté, le fichier de configuration ESLint (eslint.config.js) pourrait ressembler à ceci :

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
- `settings` : permet de spécifier la version de React utilisée dans le projet (ici, la version `18.3`).
- `plugins` : ajoute le plugin `react` pour activer les règles spécifiques à React.
- `rules` : active les règles recommandées pour React, ce qui inclut des vérifications pour les fonctionnalités et pratiques liées à JSX.
  
#

En résumé

Ce README guide pour :

  - Démarrer un projet React avec TypeScript en utilisant Vite.
  - Configurer ESLint pour détecter les erreurs TypeScript.
  - Ajouter des règles spécifiques pour React, améliorant la qualité et la lisibilité du code.

Cela en fait un bon point de départ pour les développeurs souhaitant un environnement de développement rapide et efficace pour des applications React TypeScript avec Vite.