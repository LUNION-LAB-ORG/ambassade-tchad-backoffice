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
- Garantir un environnement homogène pour tous les développeurs.
- Faciliter l'onboarding et la reproductibilité.

**Règles à suivre :**
- Utiliser Node.js LTS (v18+ recommandé).
- Gérer les dépendances avec `pnpm` ou `yarn` (éviter `npm` pour la cohérence).
- Versionner les fichiers `.env.example`.
- Utiliser `nvm` ou `asdf` pour la gestion des versions Node.

**Exemple :**
```bash
nvm use 18
pnpm install
cp .env.example .env.local
```

**Erreurs fréquentes à éviter :**
- Oublier de synchroniser les variables d'environnement.
- Installer des dépendances avec un autre gestionnaire que celui du projet.

**Outils recommandés :**
- [nvm](https://github.com/nvm-sh/nvm), [asdf](https://asdf-vm.com/)
- [Volta](https://volta.sh/) pour le pinning des versions

---

## Architecture du Projet

**Objectifs :**
- Structurer le code pour la lisibilité, la scalabilité et la maintenabilité.

**Règles à suivre :**
- Respecter la structure Next.js `/app` (App Router) ou `/pages` selon le projet.
- Organiser les composants réutilisables dans `/components`.
- Centraliser les hooks dans `/hooks`.
- Placer la logique métier dans `/lib` ou `/services`.
- Isoler les appels API externes dans `/api` ou `/services`.

**Exemple :**
```
/app
  /dashboard
/components
/hooks
/lib
/services
/public
/styles
```

**Erreurs fréquentes à éviter :**
- Mélanger logique métier et composants UI.
- Fichiers trop volumineux (>200 lignes).

**Outils recommandés :**
- [Hygen](https://www.hygen.io/) pour générer des templates

---

## Standards de Code

**Objectifs :**
- Assurer la qualité, la lisibilité et la cohérence du code.

**Règles à suivre :**
- Suivre les conventions [Airbnb](https://github.com/airbnb/javascript) adaptées à React.
- Utiliser TypeScript strict (`strict: true` dans `tsconfig.json`).
- Linter avec [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/).
- Nommer les fichiers et dossiers en kebab-case.
- Pas de code mort ou de console.log en production.

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

**Exemple :**
```tsx
type ButtonProps = { label: string; onClick: () => void };
export function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}
```

**Erreurs fréquentes à éviter :**
- Passer trop de props (favoriser la composition).
- Gérer l'état global dans un composant local.

**Outils recommandés :**
- [Storybook](https://storybook.js.org/) pour la documentation UI

---

## Gestion d'État et Data Fetching

**Objectifs :**
- Gérer l'état local et global de façon prévisible et performante.
- Optimiser le data fetching côté serveur et client.

**Règles à suivre :**
- Utiliser les hooks natifs (`useState`, `useReducer`, `useContext`).
- Pour l'état global ou le cache, préférer [Zustand](https://zustand-demo.pmnd.rs/), [Redux Toolkit](https://redux-toolkit.js.org/) ou [React Query](https://tanstack.com/query/v4).
- Privilégier le data fetching côté serveur (`getServerSideProps`, `getStaticProps`, ou Server Components).
- Utiliser SWR ou React Query pour le fetching côté client.

**Exemple :**
```tsx
import useSWR from 'swr';
const { data, error } = useSWR('/api/user', fetcher);
```

**Erreurs fréquentes à éviter :**
- Dupliquer la logique de fetching.
- Stocker des données serveur dans l'état local sans synchronisation.

**Outils recommandés :**
- [React Query](https://tanstack.com/query/v4), [SWR](https://swr.vercel.app/)

---

## Authentification avec Backend Externe

**Objectifs :**
- Sécuriser l'accès à l'application et protéger les routes sensibles.

**Règles à suivre :**
- Utiliser [NextAuth.js](https://next-auth.js.org/) ou une solution OAuth2 standard.
- Ne jamais stocker de token sensible côté client (localStorage interdit pour les tokens).
- Protéger les routes côté serveur (middleware, server actions).
- Rafraîchir les tokens de façon sécurisée.

**Exemple :**
```ts
// Exemple NextAuth.js dans /api/auth/[...nextauth].ts
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
export default NextAuth({
  providers: [Providers.GitHub({ clientId: '', clientSecret: '' })],
});
```

**Erreurs fréquentes à éviter :**
- Laisser des endpoints non protégés.
- Exposer des secrets dans le code source.

**Outils recommandés :**
- [NextAuth.js](https://next-auth.js.org/), [JWT.io](https://jwt.io/)

---

## API Routes & Server Actions

**Objectifs :**
- Structurer les API internes et les server actions pour la sécurité et la maintenabilité.

**Règles à suivre :**
- Utiliser `/api` pour les routes REST classiques.
- Privilégier les Server Actions (App Router) pour la logique côté serveur.
- Valider systématiquement les entrées utilisateur (ex: [zod](https://zod.dev/)).
- Gérer les erreurs avec des statuts HTTP explicites.

**Exemple :**
```ts
// /app/api/user/route.ts
import { NextResponse } from 'next/server';
export async function GET() {
  return NextResponse.json({ user: 'John' });
}
```

**Erreurs fréquentes à éviter :**
- Ne pas gérer les erreurs ou les statuts HTTP.
- Mélanger logique métier et gestion de la requête.

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
- Préférer les composants UI atomiques.

**Exemple :**
```tsx
<button className="bg-primary text-white rounded px-4 py-2">Valider</button>
```

**Erreurs fréquentes à éviter :**
- Surcharger les fichiers CSS globaux.
- Utiliser des classes non définies dans le design system.

**Outils recommandés :**
- [Tailwind CSS](https://tailwindcss.com/), [Headless UI](https://headlessui.com/)

---

## Performance

**Objectifs :**
- Optimiser le temps de chargement et la fluidité de l'application.

**Règles à suivre :**
- Utiliser l'Image Optimization de Next.js (`next/image`).
- Charger les composants lourds en lazy loading (`dynamic import`).
- Privilégier le SSR/SSG pour les pages critiques.
- Analyser les bundles avec [next-bundle-analyzer](https://github.com/vercel/next.js/tree/canary/packages/next-bundle-analyzer).

**Exemple :**
```tsx
import dynamic from 'next/dynamic';
const HeavyComponent = dynamic(() => import('./HeavyComponent'));
```

**Erreurs fréquentes à éviter :**
- Importer des librairies inutilisées.
- Ne pas optimiser les images.

**Outils recommandés :**
- [next/image](https://nextjs.org/docs/app/api-reference/components/image), [next-bundle-analyzer](https://github.com/vercel/next.js/tree/canary/packages/next-bundle-analyzer)

---

## Tests

**Objectifs :**
- Garantir la fiabilité et la non-régression du code.

**Règles à suivre :**
- Écrire des tests unitaires et d'intégration pour chaque feature.
- Utiliser [Jest](https://jestjs.io/) et [React Testing Library](https://testing-library.com/).
- Couvrir les cas critiques et les erreurs.
- Automatiser les tests dans le pipeline CI.

**Exemple :**
```tsx
import { render, screen } from '@testing-library/react';
import { Button } from './Button';
test('affiche le label', () => {
  render(<Button label="OK" onClick={() => {}} />);
  expect(screen.getByText('OK')).toBeInTheDocument();
});
```

**Erreurs fréquentes à éviter :**
- Tester l'implémentation au lieu du comportement.
- Oublier de mocker les appels externes.

**Outils recommandés :**
- [Jest](https://jestjs.io/), [React Testing Library](https://testing-library.com/)

---

## Outils de Développement

**Objectifs :**
- Améliorer la productivité et la qualité du code.

**Règles à suivre :**
- Utiliser un IDE configuré (VSCode + extensions recommandées).
- Activer le formatage et le linting à la sauvegarde.
- Utiliser les devtools Next.js et React.

**Exemple :**
- Extensions : ESLint, Prettier, Tailwind CSS IntelliSense, GitLens

**Erreurs fréquentes à éviter :**
- Désactiver les outils de qualité.
- Ne pas synchroniser la configuration de l'équipe.

**Outils recommandés :**
- [VSCode](https://code.visualstudio.com/), [GitLens](https://gitlens.amod.io/)

---

## Git Workflow

**Objectifs :**
- Assurer un historique propre et des livraisons fiables.

**Règles à suivre :**
- Travailler en feature branch (`feature/`, `fix/`, `chore/`).
- Rebase avant merge (`git pull --rebase`).
- Rédiger des messages de commit clairs et concis.
- Pull Request obligatoire, review par un pair.

**Exemple :**
```bash
git checkout -b feature/ajout-auth
# ... travail ...
git add .
git commit -m "feat(auth): ajout de l'authentification OAuth2"
git push origin feature/ajout-auth
```

**Erreurs fréquentes à éviter :**
- Committer sur `main` directement.
- Messages de commit vagues.

**Outils recommandés :**
- [Conventional Commits](https://www.conventionalcommits.org/), [GitHub CLI](https://cli.github.com/)

---

## Checklist Avant Pull Request

- [ ] Code relu et testé localement
- [ ] Pas de console.log ni de code mort
- [ ] Lint et tests passés
- [ ] Documentation mise à jour
- [ ] Rebase sur la branche principale
- [ ] Description claire de la PR

---

## Violations = Code Review Refusé

- Non-respect des conventions de code
- Absence de tests pour une nouvelle feature
- Manque de typage ou typage incorrect
- Endpoints non sécurisés
- Styling hors Tailwind CSS
- Documentation manquante ou obsolète

---

## Ressources Supplémentaires

- [Documentation Next.js](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Docs](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Jest Docs](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/)
