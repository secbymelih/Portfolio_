# Portfolio - Guide de personnalisation

## Fichiers a modifier

### index.html

Rechercher et remplacer les placeholders suivants :

| Placeholder | Remplacer par | Localisation |
|-------------|---------------|--------------|
| `[VOTRE NOM]` | Votre nom complet | Navbar, section accueil, footer |
| `[VOTRE_EMAIL]` | Votre adresse email | Section contact, footer |
| `[VOTRE_TELEPHONE]` | Votre numero de telephone | Section contact, footer |
| `[VOTRE VILLE]` | Votre ville | Section contact, footer |
| `[LIEN_LINKEDIN]` | URL de votre profil LinkedIn | Section contact, footer |
| `[LIEN_GITHUB]` | URL de votre profil GitHub | Section contact, footer |
| `[VOTRE_URL]` | URL de votre site | Formulaire de contact |

### CV (PDF)

1. Placer votre CV dans : `assets/downloads/`
2. Renommer le fichier en : `mettrelepdfici.pdf`
   OU modifier le lien dans index.html (ligne ~380)

### Titre de la page

Dans `<head>`, modifier la balise `<title>` :
```html
<title>[VOTRE NOM] | Portfolio</title>
```

### Nom de domaine (CNAME)

Le fichier `CNAME` contient le nom de domaine pour GitHub Pages.
Remplacer `votredomaine.fr` par votre nom de domaine.

### Formulaire de contact

Le formulaire utilise Formspree. Pour le configurer :
1. Creer un compte sur formspree.io
2. Remplacer l'action du formulaire (ligne ~683) par votre endpoint Formspree

### Image de fond

L'image de fond de la section accueil se trouve dans :
`assets/img/background.jpg`

Pour la changer, remplacer ce fichier par votre image (garder le meme nom).

### Favicon

L'icone du site (favicon) se trouve dans :
`assets/img/icons/favicon.png`

Pour la changer, remplacer ce fichier par votre icone (garder le meme nom).

### Icones des outils (section CV)

Les icones des outils utilisent des liens CDN (cdn.jsdelivr.net).
Exception : l'icone Wireshark est en local car le CDN ne fonctionnait pas.
Elle se trouve dans : `assets/img/icons/wireshark.svg`


## Structure detaillee du projet

```
/
├── assets/
│   ├── downloads/
│   │   └── mettrelepdfici.pdf    <- CV a telecharger
│   └── img/
│       ├── background.jpg        <- Image de fond section accueil
│       ├── icons/
│       │   ├── favicon.png       <- Icone du site
│       │   └── wireshark.svg     <- Icone Wireshark (local)
│       └── profile/              <- Dossier pour photo de profil (non utilise)
│
├── css/
│   ├── style.css                 <- Styles principaux du site
│   └── projet-detail.css         <- Styles pour les pages de detail des projets
│
├── js/
│   └── script.js                 <- JavaScript du site (animations, menu, etc.)
│
├── projets/
│   ├── assets/
│   │   ├── css/                  <- Styles communs aux pages projets
│   │   └── img/                  <- Images des cartes projets (miniatures)
│   │       ├── sae101.png
│   │       ├── sae102.png
│   │       ├── sae103.png
│   │       ├── sae104.png
│   │       ├── sae105.png
│   │       ├── sae201.png
│   │       ├── sae202.png
│   │       ├── sae203.png
│   │       ├── sae204.png
│   │       └── lanscanner.png
│   │
│   ├── en-construction.html      <- Page affichee pour les projets non termines
│   │
│   ├── sae101/
│   │   └── index.html            <- Page detail du projet SAE101
│   ├── sae102/
│   │   └── index.html            <- Page detail du projet SAE102
│   ├── sae103/
│   │   └── index.html            <- Page detail du projet SAE103
│   ├── sae104/
│   │   └── index.html            <- Page detail du projet SAE104
│   ├── sae105/
│   │   └── index.html            <- Page detail du projet SAE105
│   ├── sae201/
│   │   └── index.html            <- Page detail du projet SAE201
│   └── sae202/
│       └── index.html            <- Page detail du projet SAE202
│
├── CNAME                         <- Nom de domaine pour GitHub Pages
├── index.html                    <- Page principale du portfolio
└── README.md                     <- Ce fichier
```

## Notes

- Les projets SAE203 et SAE204 pointent vers `en-construction.html` car leurs pages ne sont pas encore creees
