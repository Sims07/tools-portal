========================================================================
🗺️ BOÎTE À OUTILS — ARCHITECTURE SOLUTIONS
========================================================================

Page vitrine statique, en un seul fichier HTML, présentant les outils
internes destinés aux architectes solutions : Sniper Map, Visionneuse
Carto SI, FDL Extractor, ExcelSheet Time Filler, le simulateur TOGAF EA
Foundation, EIP Architecture Catalog, DDD Architecture Catalog et le
Portail API Swagger/OpenAPI.

------------------------------------------------------------------------
📌 À PROPOS
------------------------------------------------------------------------

Cette page ne contient aucune logique métier : c'est une vitrine de
présentation, pensée pour être partagée en équipe ou déposée sur un
portail interne, qui répertorie les outils existants, leur mode d'installation
(bookmarklet, macro VBA, application web) et leurs fonctionnalités clés,
sans avoir à relire chaque README individuellement.

- Un hero présentant la démarche générale (outils qui suppriment les
  tâches répétitives, sans rien modifier aux applications d'entreprise).
- Une grille de 8 fiches outils, avec catégorie, description, points
  clés et lien direct d'installation quand il existe.
- Une légende de couleurs reprenant le code couleur des filtres de
  Sniper Map et des outils associés, pour une cohérence visuelle.

------------------------------------------------------------------------
🚀 INSTALLATION / UTILISATION
------------------------------------------------------------------------

Aucune installation n'est nécessaire : c'est une page HTML autonome
(CSS et police embarqués, une seule dépendance externe à Google Fonts
pour la typographie).

Option 1 : Ouverture locale
1. Double-cliquez sur "index.html" pour l'ouvrir directement dans votre
   navigateur.

Option 2 : Hébergement (recommandé pour un partage d'équipe)
1. Déposez le fichier "index.html" sur votre hébergement statique
   habituel (ex. GitHub Pages).
2. Partagez l'URL obtenue à votre équipe.

Note : La page ne stocke ni ne transmet aucune donnée (entièrement
statique).

------------------------------------------------------------------------
🎨 FONCTIONNALITÉS
------------------------------------------------------------------------

1. Hero et schéma en réseau
   Un schéma vectoriel animé illustre la thématique de cartographie SI
   commune aux outils, avec les couleurs de filtres de Sniper Map (EIP,
   Topic, BDD, Micro Service, Batch). Respecte "prefers-reduced-motion".

2. Bandeau légende
   Une légende rapide en haut de page associe chaque couleur à un domaine
   (Cartographie SI, Visualisation, Documents, Saisie de temps,
   Certification, Intégration / EIP, Domain-Driven Design, Portail API).

3. Grille des 8 outils
   Chaque fiche affiche :
   - La catégorie (Bookmarklet, Macro VBA, Application web) et le domaine.
   - Une description orientée usage.
   - 3 points clés.
   - La version actuelle et les liens directs (installation/démo + GitHub).

4. Responsive
   La grille s'adapte automatiquement de 1 à 3 colonnes selon l'écran.

------------------------------------------------------------------------
🎨 CHARTE GRAPHIQUE
------------------------------------------------------------------------

Cette page reprend la charte graphique Ameli :
- Fond principal : #FFFFFF
- Couleur primaire (titres, bordures) : #0C419A
- Couleur secondaire (accents) : #006386
- Texte : #222324
- Surfaces de cartes/grilles : #F9F9F9, #E7ECF5
- Couleurs de légende :
  * Violet #6a0dad (Topic / Visualisation)
  * Orange #D97706 (BDD / Documents)
  * Jaune #F0B323 (Batch / Saisie de temps)
  * Rouge #B33F2E (Micro Service / Intégration EIP)
  * Bleu #2563EB (Domain-Driven Design)
  * Vert #89bf04 (Portail API)

------------------------------------------------------------------------
🛠️ STRUCTURE DU PROJET
------------------------------------------------------------------------

architecte-toolkit-vitrine/
├── README.txt       # Ce fichier de documentation
├── README.md        # Documentation au format Markdown
├── index.html       # Page vitrine autonome (HTML + CSS + SVG)
├── manifest.json    # Manifeste PWA
└── sw.js            # Service Worker de cache

------------------------------------------------------------------------
📜 HISTORIQUE DES VERSIONS
------------------------------------------------------------------------

V1.4 (2026-09-28) : Ajout de la fiche DDD Architecture Catalog
                    (application web, lien hébergé) et de la couleur
                    de légende dédiée (bleu).
V1.3 (2026-08-12) : Icône GitHub cliquable sur chaque fiche et ajout
                    du lien de dépôt pour FDL Extractor.
V1.2 (2026-08-05) : Ajout de la fiche Portail API — Swagger / OpenAPI.
V1.1 (2026-07-29) : Ajout de la fiche EIP Architecture Catalog.
V1.0 (2026-07-24) : Version initiale (hero animé, légende, 5 outils).

------------------------------------------------------------------------
📄 LICENCE
------------------------------------------------------------------------

Ce projet est sous licence MIT.
========================================================================