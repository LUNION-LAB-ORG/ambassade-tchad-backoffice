## Description Générale

Next-Starter est un template d'administration moderne et complet développé avec Next.js 14, React 18 et Tailwind CSS. Ce projet offre une solution complète pour créer des interfaces d'administration professionnelles avec une architecture modulaire et des fonctionnalités avancées.

**Objectif** : Fournir un template d'administration prêt à l'emploi avec des composants UI réutilisables, une authentification complète, une gestion d'état moderne et une interface utilisateur responsive.

**Audience cible** : Développeurs React/Next.js cherchant à créer rapidement des applications d'administration avec une base solide et des fonctionnalités avancées.

## Architecture / Structure du Projet

### Structure des Dossiers Principaux

```
start/
├── app/                          # App Router Next.js 14
│   ├── [locale]/                 # Internationalisation (en, ar)
│   │   ├── (protected)/          # Routes protégées (authentification requise)
│   │   │   ├── app/              # Applications principales
│   │   │   │   ├── calendar/     # Gestionnaire de calendrier
│   │   │   │   ├── chat/         # Système de chat
│   │   │   │   ├── email/        # Client email
│   │   │   │   ├── kanban/       # Tableau Kanban
│   │   │   │   ├── projects/     # Gestion de projets
│   │   │   │   └── todo/         # Gestionnaire de tâches
│   │   │   ├── dashboard/        # Tableaux de bord
│   │   │   ├── components/       # Composants UI
│   │   │   ├── forms/            # Formulaires
│   │   │   ├── table/            # Tableaux de données
│   │   │   └── charts/           # Graphiques et visualisations
│   │   └── auth/                 # Pages d'authentification
│   └── api/                      # API Routes
├── components/                    # Composants réutilisables
│   ├── ui/                       # Composants UI de base (shadcn/ui)
│   ├── partials/                 # Composants partiels (header, sidebar, footer)
│   └── blocks/                   # Blocs de contenu
├── features/                     # Architecture par fonctionnalités
│   ├── menu/                     # Gestion des menus/plats
│   └── notifications/            # Système de notifications
├── hooks/                        # Hooks React personnalisés
├── lib/                          # Utilitaires et configurations
├── providers/                    # Providers React (thème, auth, etc.)
├── types/                        # Définitions TypeScript
└── public/                       # Assets statiques
```

### Fichiers Clés

- **`next.config.mjs`** : Configuration Next.js avec internationalisation et Nextra
- **`middleware.ts`** : Middleware pour la gestion des locales et l'authentification
- **`tailwind.config.ts`** : Configuration Tailwind CSS avec thème personnalisé
- **`components.json`** : Configuration shadcn/ui
- **`config/site.ts`** : Configuration globale du site
- **`lib/auth.ts`** : Configuration NextAuth.js

## Technologies Utilisées

### Framework Principal
- **Next.js 14** - Framework React avec App Router
- **React 18** - Bibliothèque UI
- **TypeScript** - Typage statique

### Styling et UI
- **Tailwind CSS** - Framework CSS utilitaire
- **shadcn/ui** - Composants UI réutilisables
- **Radix UI** - Composants primitifs accessibles
- **Lucide React** - Icônes
- **Framer Motion** - Animations

### Gestion d'État et Données
- **TanStack Query** - Gestion des requêtes et cache
- **Jotai** - Gestion d'état atomique
- **React Hook Form** - Gestion des formulaires
- **Zod** - Validation de schémas

### Authentification et Sécurité
- **NextAuth.js** - Authentification complète
- **Providers** : Google, GitHub, Credentials

### Internationalisation
- **next-intl** - Support multilingue (EN/AR)
- **RTL Support** - Support des langues de droite à gauche

### Visualisation et Graphiques
- **ApexCharts** - Graphiques interactifs
- **Chart.js** - Graphiques simples
- **Recharts** - Graphiques React

### Autres Bibliothèques
- **FullCalendar** - Calendrier interactif
- **React Table** - Tableaux de données avancés
- **React Dropzone** - Upload de fichiers
- **React Quill** - Éditeur de texte riche
- **Leaflet** - Cartes interactives

## Installation et Configuration

### Prérequis
- Node.js 18+ 
- pnpm (recommandé) ou npm

### Installation

1. **Cloner le projet**
```bash
git clone <repository-url>
cd start
```

2. **Installer les dépendances**
```bash
pnpm install
# ou
npm install
```

3. **Configuration des variables d'environnement**
```bash
cp .env.example .env.local
```

Variables d'environnement requises :
```env
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. **Lancer le serveur de développement**
```bash
pnpm dev
# ou
npm run dev
```

5. **Ouvrir dans le navigateur**
```
http://localhost:3000
```

### Scripts Disponibles

```bash
pnpm dev          # Serveur de développement
pnpm build        # Build de production
pnpm start        # Serveur de production
pnpm lint         # Vérification du code
```

## Approche de Développement / Patterns

### Architecture par Fonctionnalités
Le projet suit une architecture modulaire organisée par fonctionnalités dans le dossier `features/` :
- Chaque fonctionnalité contient ses types, validations, requêtes et actions
- Séparation claire des responsabilités
- Réutilisabilité et maintenabilité

### Patterns Utilisés
- **Feature-First Architecture** : Organisation par fonctionnalités
- **Provider Pattern** : Gestion d'état globale avec React Context
- **Custom Hooks** : Logique métier réutilisable
- **Component Composition** : Composants modulaires et réutilisables
- **Type-Safe Development** : TypeScript strict avec Zod pour la validation

### Structure des Composants
- **UI Components** : Composants de base réutilisables (shadcn/ui)
- **Partial Components** : Composants spécifiques à l'interface (header, sidebar)
- **Feature Components** : Composants liés aux fonctionnalités métier

## Guide de Contribution

### Workflow de Développement

1. **Fork du projet**
2. **Créer une branche feature**
```bash
git checkout -b feature/nouvelle-fonctionnalite
```

3. **Développement**
- Suivre les conventions TypeScript
- Utiliser les composants UI existants
- Ajouter des tests si nécessaire
- Documenter les nouvelles fonctionnalités

4. **Tests et Linting**
```bash
pnpm lint
pnpm type-check
```

5. **Commit et Push**
```bash
git add .
git commit -m "feat: ajouter nouvelle fonctionnalité"
git push origin feature/nouvelle-fonctionnalite
```

6. **Pull Request**
- Description claire des changements
- Tests passants
- Code review

### Conventions de Code
- **TypeScript strict** : Utilisation stricte des types
- **ESLint** : Règles de qualité du code
- **Prettier** : Formatage automatique
- **Conventional Commits** : Messages de commit standardisés

### Ajout de Nouveaux Composants
1. Utiliser shadcn/ui pour les composants de base
2. Placer dans `components/ui/` pour les composants génériques
3. Placer dans `components/partials/` pour les composants spécifiques
4. Documenter les props et l'utilisation

## Tests

### Tests Unitaires
```bash
pnpm test
```

### Tests d'Intégration
```bash
pnpm test:integration
```

### Vérification des Types
```bash
pnpm type-check
```

### Linting
```bash
pnpm lint
```

## Fonctionnalités Principales

### 🎨 Interface Utilisateur
- Design moderne et responsive
- Support des thèmes clair/sombre
- Support RTL (arabe)
- Composants UI accessibles

### 🔐 Authentification
- Connexion par email/mot de passe
- Authentification sociale (Google, GitHub)
- Protection des routes
- Gestion des sessions

### 📊 Tableaux de Bord
- Analytics avancés
- Graphiques interactifs
- Métriques en temps réel
- Personnalisation des widgets

### 📅 Applications Intégrées
- Calendrier interactif
- Système de chat
- Client email
- Gestionnaire de tâches
- Tableau Kanban
- Gestion de projets

### 🌐 Internationalisation
- Support multilingue (EN/AR)
- RTL automatique
- Traductions complètes

## Licence

Ce projet est sous licence propriétaire. Voir le fichier LICENSE pour plus de détails.

## Support

Pour toute question ou support :
- Documentation : `/docs`
- Issues : GitHub Issues
- Email : support@dashcode.com

---

**Next-Starter** - Template d'administration moderne et professionnel pour Next.js
