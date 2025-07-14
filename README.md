# Standards, Architecture et Bonnes Pratiques — Guide Technique Next.js

## Table des Matières
- [Configuration de l'Environnement](#configuration-de-lenvironnement)
- [Architecture du Projet](#architecture-du-projet)
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

## Configuration de l'Environnement

**Objectifs :**
- Garantir un environnement homogène et reproductible pour tous les développeurs.
- Faciliter l'onboarding et la maintenance.

**Règles à suivre :**
- Utiliser Node.js LTS (v18+ recommandé).
- Gérer les dépendances avec `pnpm` (recommandé) ou `yarn`.
- Versionner un fichier `.env.example` exhaustif.
- Utiliser `nvm`, `asdf` ou `Volta` pour la gestion des versions Node.
- Documenter les scripts utiles dans le `package.json`.

**Exemple de setup :**
```bash
nvm use 18
pnpm install
cp .env.example .env.local
pnpm dev
```

**Erreurs fréquentes à éviter :**
- Installer des dépendances avec un gestionnaire différent de celui du projet.
- Oublier de mettre à jour `.env.example` lors de l'ajout de variables.
- Ne pas documenter les scripts personnalisés.

**Outils recommandés :**
- [nvm](https://github.com/nvm-sh/nvm), [asdf](https://asdf-vm.com/), [Volta](https://volta.sh/)

---

## Architecture du Projet

**Objectifs :**
- Structurer le code pour la lisibilité, la scalabilité et la maintenabilité.
- Favoriser l’architecture modulaire et la séparation des responsabilités.

**Règles à suivre :**
- Utiliser l’App Router (`/app`) de Next.js 13+.
- Organiser le code par fonctionnalité (feature-first) et non par type de fichier.
- Centraliser les composants réutilisables dans `/components`.
- Placer la logique métier dans `/lib` ou `/services`.
- Isoler les hooks dans `/hooks`.
- Utiliser `/types` pour les types globaux.
- `/public` pour les assets statiques.
- `/styles` pour les fichiers Tailwind et CSS globaux.

**Schéma de structure recommandée :**
```
/app
  /(public)
    /home
    /about
  /(protected)
    /dashboard
    /settings
  /api
    /auth
    /user
/components
  /ui
  /layout
  /shared
/features
  /user
    user.api.ts
    user.slice.ts
    user.types.ts
  /product
/hooks
/lib
/services
/types
/public
/styles
```

**Conventions de nommage :**
- Dossiers : kebab-case (`user-profile`)
- Fichiers : camelCase pour les hooks (`useUser.ts`), PascalCase pour les composants (`UserCard.tsx`)
- Types : PascalCase (`User`, `ProductList`)

**Patterns recommandés :**
- **Feature-first** : chaque fonctionnalité regroupe ses composants, hooks, slices, types, tests.
- **Domain-driven** : pour les projets complexes, séparer par domaine métier.
- **Provider Pattern** : pour la gestion d’état globale/contextuelle.

**Erreurs fréquentes à éviter :**
- Mélanger logique métier et UI dans les composants.
- Fichiers trop volumineux (>200 lignes).
- Dossiers fourre-tout (`utils`, `helpers` non spécifiques).

**Outils recommandés :**
- [Hygen](https://www.hygen.io/) pour générer des templates de fichiers.
- [Plop.js](https://plopjs.com/) pour automatiser la création de features.

---

## Standards de Code

**Objectifs :**
- Assurer la qualité, la lisibilité et la cohérence du code.

**Règles à suivre :**
- Suivre les conventions [Airbnb](https://github.com/airbnb/javascript) adaptées à React.
- Utiliser TypeScript strict (`strict: true` dans `tsconfig.json`).
- Linter avec [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/).
- Nommer les fichiers et dossiers en kebab-case.
- Pas de code mort, pas de `console.log` en production.
- Toujours typer explicitement les props, les retours de fonctions et les hooks personnalisés.

**Exemple :**
```tsx
// Mauvais
function mycomponent() {}

// Bon
export function MyComponent() {}
```

**Erreurs fréquentes à éviter :**
- Typage `any` non justifié.
- Fonctions anonymes dans les props.
- Utilisation de variables globales non typées.

**Outils recommandés :**
- [ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [TypeScript](https://www.typescriptlang.org/)

---

## Composants React

**Objectifs :**
- Créer des composants réutilisables, testables et performants.

**Règles à suivre :**
- Préférer les composants fonctionnels.
- Utiliser les hooks pour la logique d'état et d'effet.
- Props typées avec TypeScript.
- Découper les composants complexes.
- Documenter les props importantes avec JSDoc.
- Utiliser la composition plutôt que l’héritage.
- Préférer les composants "dumb" (UI) et "smart" (container) pour séparer la logique et la présentation.

**Exemple avancé :**
```tsx
// components/ui/Button.tsx
import { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
};

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

**Erreurs fréquentes à éviter :**
- Passer trop de props (favoriser la composition).
- Gérer l'état global dans un composant local.
- Ne pas documenter les composants complexes.

**Outils recommandés :**
- [Storybook](https://storybook.js.org/) pour la documentation UI

---

## Gestion d'État et Data Fetching

**Objectifs :**
- Gérer l'état local et global de façon prévisible et performante.
- Optimiser le data fetching côté serveur et client.

**Règles à suivre :**
- Utiliser les hooks natifs (`useState`, `useReducer`, `useContext`) pour l’état local.
- Pour l'état global ou le cache, préférer [Zustand](https://zustand-demo.pmnd.rs/), [Redux Toolkit](https://redux-toolkit.js.org/) ou [React Query](https://tanstack.com/query/v4).
- Privilégier le data fetching côté serveur (Server Components, `getServerSideProps`, `getStaticProps`).
- Utiliser SWR ou React Query pour le fetching côté client.
- Centraliser les requêtes API dans `/features/featureName/feature.api.ts` ou `/services`.
- Toujours typer les réponses API et valider les données (ex: [zod](https://zod.dev/)).

**Exemple avancé :**
```tsx
// features/user/user.api.ts
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

const userSchema = z.object({ id: z.string(), name: z.string() });

export function useUser(userId: string) {
  return useQuery(['user', userId], async () => {
    const res = await fetch(`/api/user/${userId}`);
    const data = await res.json();
    return userSchema.parse(data);
  });
}
```

**Erreurs fréquentes à éviter :**
- Dupliquer la logique de fetching.
- Stocker des données serveur dans l'état local sans synchronisation.
- Ne pas gérer les erreurs réseau.

**Outils recommandés :**
- [React Query](https://tanstack.com/query/v4), [SWR](https://swr.vercel.app/), [Zod](https://zod.dev/)

---

## Authentification avec Backend Externe

**Objectifs :**
- Sécuriser l'accès à l'application et protéger les routes sensibles.

**Règles à suivre :**
- Utiliser [NextAuth.js](https://next-auth.js.org/) ou une solution OAuth2 standard.
- Ne jamais stocker de token sensible côté client (localStorage interdit pour les tokens).
- Protéger les routes côté serveur (middleware, server actions).
- Rafraîchir les tokens de façon sécurisée.
- Centraliser la logique d’authentification dans `/features/auth` ou `/lib/auth.ts`.

**Exemple avancé :**
```ts
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: 'jwt' },
};

export default NextAuth(authOptions);
```

**Erreurs fréquentes à éviter :**
- Laisser des endpoints non protégés.
- Exposer des secrets dans le code source.
- Ne pas gérer l’expiration des tokens.

**Outils recommandés :**
- [NextAuth.js](https://next-auth.js.org/), [JWT.io](https://jwt.io/)

---

## API Routes & Server Actions

**Objectifs :**
- Structurer les API internes et les server actions pour la sécurité et la maintenabilité.

**Règles à suivre :**
- Utiliser `/app/api` pour les routes REST classiques.
- Privilégier les Server Actions (App Router) pour la logique côté serveur.
- Valider systématiquement les entrées utilisateur (ex: [zod](https://zod.dev/)).
- Gérer les erreurs avec des statuts HTTP explicites.
- Séparer la logique métier de la gestion de la requête.

**Exemple avancé :**
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

**Erreurs fréquentes à éviter :**
- Ne pas gérer les erreurs ou les statuts HTTP.
- Mélanger logique métier et gestion de la requête.
- Ne pas valider les entrées utilisateur.

**Outils recommandés :**
- [zod](https://zod.dev/), [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)

---

## Styling avec Tailwind CSS 4

**Objectifs :**
- Garantir un design cohérent, responsive et maintenable.

**Règles à suivre :**
- Utiliser exclusivement Tailwind CSS pour le styling.
- Centraliser les couleurs et thèmes dans `tailwind.config.js`.
- Utiliser les classes utilitaires, éviter le CSS custom sauf cas exceptionnel.
- Préférer les composants UI atomiques et les design tokens.
- Documenter les patterns de design dans un fichier `/styles/README.md`.

**Exemple avancé :**
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

**Erreurs fréquentes à éviter :**
- Surcharger les fichiers CSS globaux.
- Utiliser des classes non définies dans le design system.
- Ne pas respecter la cohérence des espacements et couleurs.

**Outils recommandés :**
- [Tailwind CSS](https://tailwindcss.com/), [Headless UI](https://headlessui.com/), [daisyUI](https://daisyui.com/)

---

## Performance

**Objectifs :**
- Optimiser le temps de chargement et la fluidité de l'application.

**Règles à suivre :**
- Utiliser l'Image Optimization de Next.js (`next/image`).
- Charger les composants lourds en lazy loading (`dynamic import`).
- Privilégier le SSR/SSG pour les pages critiques.
- Analyser les bundles avec [next-bundle-analyzer](https://github.com/vercel/next.js/tree/canary/packages/next-bundle-analyzer).
- Utiliser le cache HTTP et les headers appropriés.
- Éviter les dépendances inutiles et le surpoids des bundles.

**Exemple avancé :**
```tsx
import dynamic from 'next/dynamic';
const HeavyComponent = dynamic(() => import('../components/HeavyComponent'), { ssr: false });
```

**Erreurs fréquentes à éviter :**
- Importer des librairies inutilisées.
- Ne pas optimiser les images.
- Ne pas profiler les performances en production.

**Outils recommandés :**
- [next/image](https://nextjs.org/docs/app/api-reference/components/image), [next-bundle-analyzer](https://github.com/vercel/next.js/tree/canary/packages/next-bundle-analyzer), [Lighthouse](https://developers.google.com/web/tools/lighthouse)

---

## Tests

**Objectifs :**
- Garantir la fiabilité et la non-régression du code.

**Règles à suivre :**
- Écrire des tests unitaires et d'intégration pour chaque feature.
- Utiliser [Jest](https://jestjs.io/) et [React Testing Library](https://testing-library.com/).
- Couvrir les cas critiques et les erreurs.
- Automatiser les tests dans le pipeline CI.
- Placer les tests à côté du code testé (`Button.test.tsx` dans le même dossier que `Button.tsx`).

**Exemple avancé :**
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

**Erreurs fréquentes à éviter :**
- Tester l'implémentation au lieu du comportement.
- Oublier de mocker les appels externes.
- Ne pas couvrir les cas d’erreur.

**Outils recommandés :**
- [Jest](https://jestjs.io/), [React Testing Library](https://testing-library.com/), [Cypress](https://www.cypress.io/) pour les tests end-to-end

---

## Outils de Développement

**Objectifs :**
- Améliorer la productivité et la qualité du code.

**Règles à suivre :**
- Utiliser un IDE configuré (VSCode + extensions recommandées).
- Activer le formatage et le linting à la sauvegarde.
- Utiliser les devtools Next.js et React.
- Documenter les extensions et outils dans le README.

**Exemple :**
- Extensions : ESLint, Prettier, Tailwind CSS IntelliSense, GitLens, VSCode Icons

**Erreurs fréquentes à éviter :**
- Désactiver les outils de qualité.
- Ne pas synchroniser la configuration de l'équipe.

**Outils recommandés :**
- [VSCode](https://code.visualstudio.com/), [GitLens](https://gitlens.amod.io/), [EditorConfig](https://editorconfig.org/)

---

## Git Workflow

**Objectifs :**
- Assurer un historique propre et des livraisons fiables.

**Règles à suivre :**
- Travailler en feature branch (`feature/`, `fix/`, `chore/`).
- Rebase avant merge (`git pull --rebase`).
- Rédiger des messages de commit clairs et concis (Conventional Commits).
- Pull Request obligatoire, review par un pair.
- Un commit = une intention claire.

**Exemple :**
```bash
git checkout -b feature/auth-oauth
# ... travail ...
git add .
git commit -m "feat(auth): ajout de l'authentification OAuth2"
git push origin feature/auth-oauth
```

**Erreurs fréquentes à éviter :**
- Committer sur `main` directement.
- Messages de commit vagues ou non conventionnels.
- Squash non justifié de l’historique.

**Outils recommandés :**
- [Conventional Commits](https://www.conventionalcommits.org/), [GitHub CLI](https://cli.github.com/), [Husky](https://typicode.github.io/husky/)

---

## Checklist Avant Pull Request

- [ ] Code relu et testé localement
- [ ] Pas de console.log ni de code mort
- [ ] Lint et tests passés
- [ ] Documentation mise à jour
- [ ] Rebase sur la branche principale
- [ ] Description claire de la PR
- [ ] Screenshots ou vidéos pour les changements UI

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
