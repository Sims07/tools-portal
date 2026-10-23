# Boîte à outils — Architecture Solutions

Portail statique qui rassemble les outils destinés aux architectes solutions : fiches descriptives, liens vers les dépôts et démonstrations intégrées dans la page. Le site est conçu pour être publié sur GitHub Pages et peut être installé comme une **Progressive Web App (PWA)** sur les navigateurs compatibles.

## Accès

- **Portail en ligne** : https://sims07.github.io/tools-portal/
- **Code source** : https://github.com/Sims07/tools-portal

## Fonctionnalités

- **Catalogue d’outils** organisé par catégories, avec descriptions, fonctionnalités clés, versions et liens vers les démos ou dépôts.
- **Filtres par catégorie** pour naviguer rapidement dans le catalogue.
- **Démos intégrées** dans la page, avec retour à la galerie et prise en charge de la touche Échap. Les démos sont hébergées sur des sites distincts et nécessitent généralement une connexion Internet.
- **Favoris et outils récents** pour retrouver facilement les fiches consultées.
- **Partage** d’un lien vers un outil, via le mécanisme de partage du navigateur ou une copie dans le presse-papiers.
- **PWA et mode hors ligne** : un service worker met en cache la coquille de l’application et permet de retrouver la page lorsque le réseau est indisponible. Les démos externes ne sont pas garanties hors ligne.
- **Responsive et accessibilité** : interface adaptée aux écrans mobiles et prise en compte de la préférence système de réduction des animations.

## Installation et utilisation

### Utiliser le portail en ligne

Ouvrez [le portail](https://sims07.github.io/tools-portal/) dans un navigateur récent. Sur les navigateurs compatibles, utilisez la commande d’installation ou d’ajout à l’écran d’accueil pour l’utiliser comme une application.

### Ouvrir le projet localement

Vous pouvez ouvrir `index.html` directement pour consulter l’interface, mais **le fonctionnement PWA complet nécessite un contexte sécurisé** (par exemple HTTPS, comme GitHub Pages, ou un serveur local). Certaines fonctionnalités du navigateur, notamment le service worker et l’installation, peuvent ne pas fonctionner en ouverture directe via `file://`.

### Publier une modification

Le site est prévu pour une publication statique sur **GitHub Pages**, à partir de la branche configurée dans les paramètres du dépôt. Avec la configuration actuelle, les changements fusionnés dans `main` déclenchent normalement une nouvelle publication automatique. Le délai de mise à jour peut varier.

Le dépôt ne nécessite ni serveur applicatif ni étape de compilation Node.js pour servir les fichiers statiques.

## Données locales et confidentialité

- Les **favoris** et la liste des **outils récents** sont enregistrés dans le `localStorage` du navigateur. Ils restent propres à ce navigateur et à cette origine : ils ne sont pas synchronisés entre appareils et peuvent être effacés par le nettoyage des données du site.
- Le portail utilise **GoatCounter** pour mesurer des événements d’usage (ouverture d’un outil, ajout/retrait d’un favori et clic sur le lien GitHub associé). Ces événements sont envoyés à un service externe ; le portail ne gère pas lui-même de base de données.
- Les polices de caractères sont chargées depuis **Google Fonts**. Ces services externes nécessitent une connexion et peuvent recevoir les requêtes correspondantes du navigateur.
- Les démos et dépôts liés sont des projets distincts, soumis à leurs propres conditions et pratiques de confidentialité.

## Structure du dépôt

```text
.
├── index.html        # Interface, styles et logique principale du portail
├── analytics.js      # Intégration du suivi d’usage GoatCounter
├── manifest.json     # Métadonnées et raccourcis de la PWA
├── sw.js             # Service worker : cache, mode hors ligne et mises à jour
├── offline.html      # Page de secours hors ligne
├── icons/            # Icônes de l’application
└── .githooks/
    └── pre-commit    # Incrémente CACHE_VERSION dans sw.js
```

## Maintenance

- Quand les ressources mises en cache changent, le hook `.githooks/pre-commit` incrémente la constante `CACHE_VERSION` de `sw.js`, afin que les clients puissent renouveler leur cache.
- Si le hook n’est pas activé localement, configurez les hooks Git du dépôt avec `git config core.hooksPath .githooks`.
- L’intégration analytique est centralisée dans `analytics.js`, ce qui facilite son remplacement ou son retrait.

## Licence

Le pied de page du portail indique une licence MIT. Vérifiez la licence de chaque outil lié dans son propre dépôt avant de redistribuer son code.
