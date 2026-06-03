# PokedexTS

> Version 0.8

## React + TypeScript + Vite

Petit projet annexe pour m'entraîner au typage avec TypeScript (CDA Wild Code School)

[Déploiement "stable"](https://pokedex-ts-try.vercel.app/)


# Migration API — Pokédex TS

## Contexte

Le projet utilisait initialement l’API :

- PokebuildAPI (`https://pokebuildapi.fr/api/v1`)

Cependant, cette API n’était plus maintenue et plusieurs endpoints étaient devenus inaccessibles ou instables, empêchant le bon fonctionnement du Pokédex.

Une migration complète vers une nouvelle API était donc nécessaire.

---

# Nouvelle API utilisée

Le projet utilise désormais :

- Tyradex (`https://tyradex.app/api/v1`)

Cette API présente plusieurs avantages :

- API maintenue et stable
- Données Pokémon en français
- Images HD et shiny disponibles
- Gestion des générations
- Gestion des évolutions
- Gestion des types
- Structure moderne et complète

---

# Fonctionnalités migrées

Les fonctionnalités suivantes ont été adaptées pour fonctionner avec Tyradex :

## Homepage

- Affichage complet des Pokémon
- Cards Pokémon
- Images et sprites
- Types Pokémon
- Couleurs dynamiques selon les types

---

## Recherche

- Recherche par nom
- Recherche par ID
- Compatibilité avec les données Tyradex
- Correction des anciens modèles de données

---

## Types Pokémon

- Affichage des types disponibles
- Filtrage des Pokémon par type
- Adaptation du format des données (`name.fr`)

---

## Générations

- Navigation par génération
- Support des générations 1 à 9
- Affichage des Pokémon par génération

---

## Détails Pokémon

- Affichage détaillé
- Types
- Génération
- Statistiques
- Évolutions
- Pré-évolutions
- Navigation Pokémon précédent/suivant

---

## Shiny Toggle

Ajout d’un bouton permettant :

- d’afficher la version normale
- ou la version shiny du Pokémon

---

# Changements techniques

## Adaptation des modèles de données

PokebuildAPI et Tyradex n’utilisent pas la même structure JSON.

Un travail de mapping des données a été nécessaire afin de conserver les composants React existants sans refonte complète du frontend.

Exemple :

### Ancien modèle

```json
{
  "name": "Pikachu",
  "image": "...",
  "apiTypes": []
}



This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


TODO
ajouter au page type des onglet :
"resistant" https://pokebuildapi.fr/api/v1/pokemon/type/double-resistance/:type, 
"vulnerable" api/v1/pokemon/type/double-weakness/:type,
"imunisé" https://pokebuildapi.fr/api/v1/pokemon/type/immunity/:type





// TODO  je doit faire les interfaces dans un dossier interfaces 
