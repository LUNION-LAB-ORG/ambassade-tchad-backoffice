# Standards, Architecture et Bonnes Pratiques — Guide Technique Next.js

## Table des Matières
- [Introduction](#introduction)
- [Schéma Global du Projet](#schéma-global-du-projet)
- [Configuration de l'Environnement](#configuration-de-lenvironnement)
- [Architecture du Projet](#architecture-du-projet)
  - [Détail des Dossiers Clés](#détail-des-dossiers-clés)
- [Standards de Code](#standards-de-code)
- [Composants React](#composants-react)
- [Gestion d'État et Data Fetching](#gestion-détat-et-data-fetching)
- [Authentification avec Backend Externe](#authentification-avec-backend-externe)
- [API Routes & Server Actions](#api-routes--server-actions)
- [Styling avec Tailwind CSS 4](#styling-avec-tailwind-css-4)
- [Performance](#performance)
- [Tests](#tests)
- [Outils de Développement](#outils-de-développement)
- [Git Workflow](#git-workflow)
- [Checklist Avant Pull Request](#checklist-avant-pull-request)
- [Violations = Code Review Refusé](#violations--code-review-refusé)
- [Ressources Supplémentaires](#ressources-supplémentaires)

---

## Introduction

Ce document est la référence centrale pour tous les développeurs du projet. Il vise à garantir la qualité, la performance et la maintenabilité du code, en s'appuyant sur la structure réelle du projet.

---

## Schéma Global du Projet

```
/workspace
├── app
│   └── [locale]
│       ├── (protected)
│       │   ├── dashboard/
│       │   ├── users/
│       │   ├── menu/
│       │   ├── ...
│       ├── auth/
│       ├── error.tsx
│       ├── layout.tsx
│       ├── not-found.tsx
│       ├── page.tsx
│       └── [...not-found]/
├── components
│   ├── ui/
│   ├── form/
│   ├── partials/
│   ├── blocks/
│   ├── users/
│   ├── ...
├── features
│   └── menu/
│       ├── filters/
│       ├── queries/
│       ├── types/
│       ├── validations/
├── hooks/
├── lib/
├── providers/
├── types/
├── config/
├── public/
├── styles/
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── ...
```

---

## Configuration de l'Environnement

**Objectifs :**
- Environnement homogène et reproductible.
- Onboarding rapide.

**Règles :**
- Node.js LTS (v18+ recommandé).
- pnpm (recommandé) pour la gestion des dépendances.
- `.env.example` exhaustif et synchronisé.
- Utilisation de `nvm`, `asdf` ou `Volta`.
- Scripts documentés dans `package.json`.

**Exemple :**
```bash
nvm use 18
pnpm install
cp .env.example .env.local
pnpm dev
```

**Outils recommandés :**
- [nvm](https://github.com/nvm-sh/nvm), [asdf](https://asdf-vm.com/), [Volta](https://volta.sh/)

**Erreurs à éviter :**
- Installer des dépendances avec un autre gestionnaire.
- Oublier de mettre à jour `.env.example`.

---

## Architecture du Projet

**Objectifs :**
- Scalabilité, modularité, séparation claire des responsabilités.

### Détail des Dossiers Clés

#### `/app` (App Router, pages, layouts, i18n)
- **Gestion des locales** : `[locale]` (ex : `fr`, `en`, etc.)
- **Routes protégées** : `(protected)` (ex : `/dashboard`, `/users`, `/menu`)
- **Pages d’authentification** : `/auth`
- **Gestion des erreurs** : `error.tsx`, `not-found.tsx`
- **Layouts** : `layout.tsx` (par locale ou global)
- **API routes** : `/app/api/`

#### `/components` (UI, Partials, Blocks, Domaines)
- **/ui** : Composants atomiques et réutilisables (ex : `button.tsx`, `card.tsx`, `input.tsx`)
- **/form** : Composants de formulaire avancés
- **/partials** : Header, sidebar, footer, navigation, etc.
- **/blocks** : Sections de page ou composants de structure
- **/users, /ecommarce, ...** : Composants spécifiques à un domaine métier

#### `/features` (Feature-First, logique métier)
- **Organisation par feature** : chaque dossier = une fonctionnalité métier
- **Sous-dossiers** :
  - `filters/` : gestion des filtres
  - `queries/` : requêtes et hooks de data fetching
  - `types/` : types TypeScript spécifiques à la feature
  - `validations/` : schémas de validation (Zod)
- **Exemple** :
  - `features/menu/queries/useMenuList.ts`
  - `features/menu/types/menu.ts`
  - `features/menu/validations/menuSchema.ts`

#### `/hooks` (Hooks personnalisés)
- Centralisation des hooks custom (ex : `use-menu-hover.ts`, `use-media-query.ts`)
- Convention : camelCase, un hook = un fichier

#### `/lib` (Logique métier, utilitaires, API)
- Fonctions utilitaires, helpers, logique d’API (`api-http.ts`, `auth.ts`, `menus.ts`)
- Centralisation des appels API, options de charting, helpers globaux

#### `/providers` (Contextes React globaux)
- Tous les contextes React (auth, thème, query, layout, etc.)
- Un provider = un fichier, importé dans le layout principal
- Ex : `theme-provider.tsx`, `auth.provider.tsx`, `query-provider.tsx`

#### `/types` (Types globaux)
- Types TypeScript partagés dans tout le projet (`index.ts`)

#### `/config` (Configuration centralisée)
- Fichiers de configuration du site, thèmes, etc. (`site.ts`, `index.ts`)

#### `/public` (Assets statiques)
- Images, icônes, fichiers statiques

#### `/styles` (CSS/Tailwind)
- Fichiers Tailwind, CSS globaux, design tokens

---

## Standards de Code

**Objectifs :**
- Qualité, lisibilité, cohérence.

**Règles :**
- Conventions Airbnb adaptées à React.
- TypeScript strict (`strict: true` dans `tsconfig.json`).
- ESLint + Prettier obligatoires.
- Fichiers/dossiers en kebab-case, composants en PascalCase.
- Pas de code mort, pas de `console.log` en prod.
- Typage explicite partout.

**Exemple :**
```tsx
// Mauvais
function mycomponent() {}
// Bon
export function MyComponent() {}
```

**Outils recommandés :**
- [ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [TypeScript](https://www.typescriptlang.org/)

**Erreurs à éviter :**
- Typage `any` non justifié.
- Fonctions anonymes dans les props.
- Variables globales non typées.

---

## Composants React

**Objectifs :**
- Réutilisabilité, testabilité, performance.

**Règles :**
- Composants fonctionnels uniquement.
- Hooks pour la logique d’état/effet.
- Props typées.
- Découpage des composants complexes.
- JSDoc pour les props importantes.
- Composition > héritage.
- Séparation UI (dumb) / container (smart).

**Exemple :**
```tsx
// components/ui/Button.tsx
import { ReactNode } from 'react';
type ButtonProps = { children: ReactNode; onClick?: () => void; variant?: 'primary' | 'secondary' };
/**
 * Bouton réutilisable avec gestion des variantes
 */
export function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button
      className={`px-4 py-2 rounded ${variant === 'primary' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

**Outils recommandés :**
- [Storybook](https://storybook.js.org/)

**Erreurs à éviter :**
- Trop de props (favoriser la composition).
- État global dans un composant local.
- Composants non documentés.

---

## Gestion d'État et Data Fetching

**Objectifs :**
- État prévisible, data fetching optimisé.

**Règles :**
- Hooks natifs pour l’état local.
- Zustand, React Query ou Redux Toolkit pour l’état global/cache.
- Data fetching côté serveur (Server Components, getServerSideProps, etc.)
- SWR ou React Query côté client.
- Centraliser les requêtes dans `/features/feature/queries` ou `/lib`.
- Typage et validation systématique (Zod).

**Exemple :**
```tsx
// features/menu/queries/useMenuList.ts
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
const menuSchema = z.object({ id: z.string(), name: z.string() });
export function useMenuList() {
  return useQuery(['menu'], async () => {
    const res = await fetch('/api/menu');
    const data = await res.json();
    return menuSchema.array().parse(data);
  });
}
```

**Outils recommandés :**
- [React Query](https://tanstack.com/query/v4), [Zustand](https://zustand-demo.pmnd.rs/), [Zod](https://zod.dev/)

**Erreurs à éviter :**
- Dupliquer la logique de fetching.
- Ne pas gérer les erreurs réseau.
- Stocker des données serveur dans l’état local sans synchronisation.

---

## Authentification avec Backend Externe

**Objectifs :**
- Sécurité, protection des routes sensibles.

**Règles :**
- NextAuth.js ou OAuth2 standard.
- Jamais de token sensible côté client.
- Protection des routes côté serveur (middleware, server actions).
- Rafraîchissement sécurisé des tokens.
- Logique centralisée dans `/lib/auth.ts` ou `/features/auth`.

**Exemple :**
```ts
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
export const authOptions = {
  providers: [GitHubProvider({ clientId: process.env.GITHUB_CLIENT_ID!, clientSecret: process.env.GITHUB_CLIENT_SECRET! })],
  session: { strategy: 'jwt' },
};
export default NextAuth(authOptions);
```

**Outils recommandés :**
- [NextAuth.js](https://next-auth.js.org/), [JWT.io](https://jwt.io/)

**Erreurs à éviter :**
- Endpoints non protégés.
- Secrets exposés dans le code source.
- Expiration des tokens non gérée.

---

## API Routes & Server Actions

**Objectifs :**
- Sécurité, maintenabilité, validation systématique.

**Règles :**
- `/app/api` pour les routes REST.
- Server Actions pour la logique serveur.
- Validation Zod systématique.
- Statuts HTTP explicites.
- Séparation logique métier / gestion requête.

**Exemple :**
```ts
// app/api/user/route.ts
import { NextResponse } from 'next/server';
import { z } from 'zod';
const userSchema = z.object({ id: z.string() });
export async function POST(req: Request) {
  const body = await req.json();
  const parsed = userSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }
  // ... logique métier ...
  return NextResponse.json({ user: { id: parsed.data.id, name: 'John' } });
}
```

**Outils recommandés :**
- [zod](https://zod.dev/), [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)

**Erreurs à éviter :**
- Pas de validation d’entrée.
- Mélange logique métier / gestion requête.
- Statuts HTTP absents.

---

## Styling avec Tailwind CSS 4

**Objectifs :**
- Design cohérent, responsive, maintenable.

**Règles :**
- Tailwind CSS exclusif.
- Thèmes/couleurs centralisés dans `tailwind.config.ts`.
- Classes utilitaires, pas de CSS custom sauf exception.
- Composants UI atomiques.
- Patterns de design documentés dans `/styles/README.md`.

**Exemple :**
```tsx
// components/ui/Card.tsx
export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
      {children}
    </div>
  );
}
```

**Outils recommandés :**
- [Tailwind CSS](https://tailwindcss.com/), [Headless UI](https://headlessui.com/), [daisyUI](https://daisyui.com/)

**Erreurs à éviter :**
- Surcharge de CSS global.
- Classes non définies dans le design system.
- Incohérence d’espacement/couleurs.

---

## Performance

**Objectifs :**
- Rapidité, fluidité, optimisation bundle.

**Règles :**
- `next/image` pour les images.
- Lazy loading (`dynamic import`) pour les composants lourds.
- SSR/SSG pour les pages critiques.
- Analyse bundle avec `next-bundle-analyzer`.
- Cache HTTP et headers adaptés.
- Pas de dépendances inutiles.

**Exemple :**
```tsx
import dynamic from 'next/dynamic';
const HeavyComponent = dynamic(() => import('../components/HeavyComponent'), { ssr: false });
```

**Outils recommandés :**
- [next/image](https://nextjs.org/docs/app/api-reference/components/image), [next-bundle-analyzer](https://github.com/vercel/next.js/tree/canary/packages/next-bundle-analyzer), [Lighthouse](https://developers.google.com/web/tools/lighthouse)

**Erreurs à éviter :**
- Librairies inutilisées.
- Images non optimisées.
- Pas de profiling en prod.

---

## Tests

**Objectifs :**
- Fiabilité, non-régression.

**Règles :**
- Tests unitaires/intégration pour chaque feature.
- Jest + React Testing Library.
- Couvrir cas critiques/erreurs.
- Tests automatisés en CI.
- Tests à côté du code testé.

**Exemple :**
```tsx
// components/ui/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';
test('affiche le label et gère le clic', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>OK</Button>);
  expect(screen.getByText('OK')).toBeInTheDocument();
  fireEvent.click(screen.getByText('OK'));
  expect(handleClick).toHaveBeenCalled();
});
```

**Outils recommandés :**
- [Jest](https://jestjs.io/), [React Testing Library](https://testing-library.com/), [Cypress](https://www.cypress.io/)

**Erreurs à éviter :**
- Tester l’implémentation au lieu du comportement.
- Oublier de mocker les appels externes.
- Cas d’erreur non couverts.

---

## Outils de Développement

**Objectifs :**
- Productivité, qualité, cohérence équipe.

**Règles :**
- VSCode + extensions recommandées.
- Formatage/linting à la sauvegarde.
- Devtools Next.js/React.
- Extensions documentées dans le README.

**Exemple :**
- ESLint, Prettier, Tailwind CSS IntelliSense, GitLens, VSCode Icons

**Outils recommandés :**
- [VSCode](https://code.visualstudio.com/), [GitLens](https://gitlens.amod.io/), [EditorConfig](https://editorconfig.org/)

**Erreurs à éviter :**
- Outils de qualité désactivés.
- Config non synchronisée.

---

## Git Workflow

**Objectifs :**
- Historique propre, livraison fiable.

**Règles :**
- Feature branch (`feature/`, `fix/`, `chore/`).
- Rebase avant merge.
- Conventional Commits.
- PR obligatoire, review par un pair.
- Un commit = une intention.

**Exemple :**
```bash
git checkout -b feature/menu-filter
# ... travail ...
git add .
git commit -m "feat(menu): ajout du filtre de menu"
git push origin feature/menu-filter
```

**Outils recommandés :**
- [Conventional Commits](https://www.conventionalcommits.org/), [GitHub CLI](https://cli.github.com/), [Husky](https://typicode.github.io/husky/)

**Erreurs à éviter :**
- Commit sur `main`.
- Messages vagues/non conventionnels.
- Squash non justifié.

---

## Checklist Avant Pull Request

- [ ] Feature isolée dans `/features`
- [ ] Composant UI documenté dans `/components/ui`
- [ ] Provider ajouté dans `/providers` si besoin
- [ ] Typage strict et validation Zod
- [ ] Tests présents et passants
- [ ] Lint/format OK
- [ ] Documentation à jour
- [ ] Description claire de la PR
- [ ] Screenshots/vidéos pour changements UI

---

## Violations = Code Review Refusé

- Non-respect des conventions de code
- Absence de tests pour une nouvelle feature
- Manque de typage ou typage incorrect
- Endpoints non sécurisés
- Styling hors Tailwind CSS
- Documentation manquante ou obsolète
- Structure de projet non respectée

---

## Ressources Supplémentaires

- [Documentation Next.js](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Docs](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Jest Docs](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/)
- [Zod Docs](https://zod.dev/)
- [Conventional Commits](https://www.conventionalcommits.org/)
