# Singularity — Site vitrine

Site statique présentant les services informatiques de Singularity.
Aucun backend, aucune base de données, aucune clé API.

## Stack

- React 19 · TypeScript · Vite 7 · Tailwind CSS 4
- Routage par hash (`HashRouter`), compatible GitHub Pages
- Polices auto-hébergées : IBM Plex Mono et Inter (Fontsource)

## Démarrage

Prérequis : Node.js 24 ou plus récent.

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck
npm run build      # → dist/
npm run preview
```

## Structure

```
public/                        images, vidéos, favicon, robots.txt
src/
  components/                  composants partagés
  pages/                       pages du site
  data/                        services, ressources, dimensions d'images
  config.ts                    coordonnées et informations de contact
  index.css                    thème (@theme), styles et animations
.github/workflows/deploy.yml   publication GitHub Pages
```

## Déploiement

1. **Settings → Pages → Source : GitHub Actions**
2. Pousser sur `main`

Le workflow vérifie les types, construit le site et calcule seul le chemin de
base (`/nom-du-depot/`, ou `/` pour un dépôt `utilisateur.github.io`).

## Crédits

Icônes [Lucide](https://lucide.dev) (ISC). Polices IBM Plex Mono et Inter (OFL),
auto-hébergées via [Fontsource](https://fontsource.org).
