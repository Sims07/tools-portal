# 🗺️ Boîte à outils — Architecture Solutions

Page vitrine statique, en un seul fichier HTML, présentant les outils internes destinés aux **architectes solutions** : Sniper Map, Visionneuse Carto SI, FDL Extractor, ExcelSheet Time Filler et le simulateur TOGAF EA Foundation.

---

## 📌 À propos

Cette page ne contient aucune logique métier : c'est une **vitrine de présentation**, pensée pour être partagée en équipe ou déposée sur un portail interne, qui répertorie les outils existants, leur mode d'installation (bookmarklet, macro VBA, application web) et leurs fonctionnalités clés, sans avoir à relire chaque README individuellement.

- Un **hero** présentant la démarche générale (outils qui suppriment les tâches répétitives, sans rien modifier aux applications d'entreprise).
- Une **grille de 5 fiches outils**, avec catégorie, description, points clés et lien direct d'installation quand il existe.
- Une **légende de couleurs** reprenant le code couleur des filtres de Sniper Map, pour une cohérence visuelle entre les outils et leur vitrine.

---

## 🚀 Installation / Utilisation

Aucune installation n'est nécessaire : c'est une page HTML autonome (CSS et police embarqués, une seule dépendance externe à Google Fonts pour la typographie).

### Option 1 : Ouverture locale
1. Double-cliquez sur **`boite-a-outils-architecte.html`** pour l'ouvrir directement dans votre navigateur.

### Option 2 : Hébergement (recommandé pour un partage d'équipe)
1. Déposez le fichier `boite-a-outils-architecte.html` sur votre hébergement statique habituel (ex. GitHub Pages, comme pour les pages `install.html` des autres outils), en le renommant si besoin en `index.html`.
2. Partagez l'URL obtenue à votre équipe.

> ℹ️ La page ne stocke ni ne transmet aucune donnée : elle est entièrement statique, hormis le chargement de la police via Google Fonts.

---

## 🎨 Fonctionnalités

### 1. **Hero et schéma en réseau**
Un schéma vectoriel animé (nœuds colorés reliés par des lignes) illustre la thématique de cartographie SI commune aux outils, avec les couleurs de filtres de Sniper Map (EIP, Topic, BDD, Micro Service, Batch). L'animation respecte la préférence système `prefers-reduced-motion` (désactivée automatiquement si l'utilisateur a réduit les animations dans son système).

### 2. **Bandeau légende**
Une légende rapide en haut de page associe chaque couleur à un domaine (Cartographie SI, Visualisation, Documents, Saisie de temps, Certification), pour retrouver un outil au coup d'œil.

### 3. **Grille des 5 outils**
Chaque fiche affiche :
- La **catégorie** de l'outil (Bookmarklet, Macro VBA, Application web) et le **domaine visé** (Mega Hopex, Cartographie SI, Word, Saisie des temps, Certification).
- Une **description** orientée usage (ce que l'outil change concrètement au quotidien).
- **3 points clés**, repris des fonctionnalités principales de chaque outil.
- La **version actuelle** et, quand elle existe, un **lien direct** vers la page d'installation (`install.html`) de l'outil.

Les outils sans page d'installation hébergée (FDL Extractor, ExcelSheet Time Filler) affichent une mention du mode de distribution (fichier `.bas` fourni, `install.html` local) plutôt qu'un lien externe.

### 4. **Responsive**
La grille des outils s'adapte automatiquement de 1 à 3 colonnes selon la largeur d'écran ; le schéma animé du hero est masqué sur mobile pour ne pas surcharger l'affichage.

---

## 🎨 Charte graphique

Cette page reprend la charte graphique **Ameli**, déjà utilisée par Sniper Map et ExcelSheet Time Filler, afin que la vitrine et les outils qu'elle présente partagent une identité visuelle cohérente :
- **Fond principal** : `#FFFFFF`
- **Couleur primaire** (titres, bordures) : `#0C419A`
- **Couleur secondaire** (accents) : `#006386`
- **Texte** : `#222324`
- **Surfaces de cartes/grilles** : `#F9F9F9`, `#E7ECF5`
- **Couleurs de légende** (reprises des filtres Sniper Map) : Violet `#6a0dad` (Topic), Orange `#D97706` (BDD), Jaune `#F0B323` (Batch), Rouge `#B33F2E` (Micro Service)

---

## 🛠️ Développement

### Structure du projet
```
architecte-toolkit-vitrine/
├── README.md                        # Documentation
└── boite-a-outils-architecte.html   # Page vitrine autonome (HTML + CSS + SVG)
```

### Mettre à jour la vitrine
La page étant volontairement autonome (pas de build, pas de dépendances npm), toute modification se fait directement dans le fichier HTML :
- Les **fiches outils** sont des blocs `<article class="card">` indépendants dans la section `<div class="grid">` : dupliquer un bloc existant pour ajouter un nouvel outil.
- Les **couleurs de la légende** sont centralisées dans les variables CSS `:root` en tête de fichier (`--navy`, `--teal`, `--violet`, `--orange`, `--red`, `--amber`) : les modifier à un seul endroit suffit à mettre à jour l'ensemble de la page.

### Contribuer
1. Forkez le dépôt.
2. Créez une branche pour vos modifications (`git checkout -b feature/nouvel-outil`).
3. Validez vos changements (`git commit -m "Ajout d'une fiche outil"`).
4. Poussez vers votre fork (`git push origin feature/nouvel-outil`).
5. Ouvrez une **Pull Request** vers la branche `main`.

---

## 📜 Historique des versions

| Version | Date       | Description                                                                                     |
|---------|------------|---------------------------------------------------------------------------------------------------|
| V1.0    | 2026-07-24 | Version initiale : hero animé, légende de couleurs, grille des 5 outils avec liens d'installation. |

---

## 🤝 Remerciements

- **Sniper Map**, **Visionneuse Carto SI**, **FDL Extractor**, **ExcelSheet Time Filler** et **TOGAF EA Foundation** pour le contenu et le code couleur repris dans cette vitrine.
- **Ameli** pour la charte graphique.

---

## 📄 Licence

Ce projet est sous licence **MIT**. Consultez le fichier [LICENSE](LICENSE) pour plus de détails.
