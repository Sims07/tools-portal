# 🗺️ BOÎTE À OUTILS — ARCHITECTURE SOLUTIONS

Page vitrine statique, en un seul fichier HTML (PWA installable), présentant les outils internes destinés aux **architectes solutions** : Sniper Map, Visionneuse Carto SI, FDL Extractor, ExcelSheet Time Filler, le simulateur TOGAF EA Foundation, EIP Architecture Catalog, DDD Architecture Catalog, Team Topologies Catalog, Cognitive Load Evaluator, Platform Pattern Catalog, AI Pattern Catalog, Enterprise Capacity Mapper et le Portail API Swagger/OpenAPI.

---

## 📌 À PROPOS

Cette page ne contient aucune logique métier : c'est une **vitrine de présentation**, pensée pour être partagée en équipe ou déposée sur un portail interne, qui répertorie les outils existants, leur mode d'installation (bookmarklet, macro VBA, application web) et leurs fonctionnalités clés, sans avoir à relire chaque README individuellement.

- Un **hero** présentant la démarche générale (outils qui suppriment les tâches répétitives, sans rien modifier aux applications d'entreprise).
- Une **grille de fiches** réparties en 4 sections, avec catégorie, description, points clés et lien direct d'installation ou de démo.
- Une **légende cliquable** reprenant le code couleur des outils, qui sert aussi de navigation rapide vers chaque fiche.

---

## 🚀 INSTALLATION / UTILISATION

Aucune installation serveur n'est nécessaire : c'est une page HTML autonome (CSS embarqué, une seule dépendance externe à Google Fonts pour la typographie).

### Option 1 : Ouverture locale
1. Double-cliquez sur `index.html` pour l'ouvrir directement dans votre navigateur.

### Option 2 : Hébergement (recommandé pour un partage d'équipe)
1. Déposez les fichiers sur votre hébergement statique habituel (ex. GitHub Pages).
2. Partagez l'URL obtenue à votre équipe ; la page peut être installée comme application (PWA).

> ℹ️ La page ne stocke ni ne transmet aucune donnée : elle est entièrement statique.

---

## 🎨 FONCTIONNALITÉS

### 1. Hero et schéma en réseau
Un schéma vectoriel animé illustre la thématique de cartographie SI commune aux outils. Respecte la préférence système `prefers-reduced-motion`.

### 2. Bandeau légende / navigation rapide
Une légende fixe en haut de page associe chaque couleur à un outil et permet d'accéder directement à sa fiche :
- Cartographie SI
- Visualisation
- Documents
- Saisie de temps
- Certification
- EIP
- DDD
- Teams
- Charge cognitive
- Plateforme
- IA
- Capacités métier
- Portail API

### 3. Grille des 13 outils
Chaque fiche affiche :
- La **catégorie** (Bookmarklet, Macro VBA, Application web) et le **domaine visé**.
- Une **description** orientée usage.
- **3 points clés**, repris des fonctionnalités principales de chaque outil.
- La **version actuelle** et les **liens directs** (page d'installation/démo + dépôt GitHub).

### 4. Démos intégrées
Les applications web s'ouvrent dans la page (changement de vue, sans popup), avec retour à la galerie ou touche `Échap`.

### 5. Responsive et hors-ligne
La grille s'adapte automatiquement à la largeur d'écran ; un service worker met en cache la coquille de l'application.

---

## 🎨 CHARTE GRAPHIQUE

Cette page reprend la charte graphique **Ameli** :
- **Fond principal** : `#FFFFFF`
- **Couleur primaire** (titres, bordures) : `#0C419A`
- **Couleur secondaire** (accents) : `#006386`
- **Texte** : `#222324`
- **Surfaces de cartes/grilles** : `#F9F9F9`, `#E7ECF5`
- **Couleurs de légende** :
  - Violet `#6a0dad` (Visualisation)
  - Orange `#D97706` (Documents)
  - Jaune `#F0B323` (Saisie de temps)
  - Rouge `#B33F2E` (Intégration EIP)
  - Bleu `#2563EB` (Domain-Driven Design)
  - Turquoise `#0D9488` (Team Topologies)
  - Rose `#DB2777` (Charge cognitive)
  - Indigo `#4F46E5` (Platform Pattern Catalog)
  - Vert `#89bf04` (Portail API)

---

## 🛠️ STRUCTURE DU PROJET

```
.
├── index.html        # Page vitrine (HTML + CSS + JS embarqués)
├── manifest.json     # Manifest PWA
├── sw.js             # Service worker (CACHE_VERSION incrémentée par le hook pre-commit)
├── icons/            # Icônes PWA (standard et maskable)
└── .githooks/
    └── pre-commit    # Incrémente CACHE_VERSION dans sw.js
```
