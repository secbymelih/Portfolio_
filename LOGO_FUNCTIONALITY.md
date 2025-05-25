# 🎯 Fonctionnalité du Logo Navbar - Documentation

## 📋 Objectif

Gérer l'affichage du logo "LÉO LOSS-JAYET" dans la navbar en fonction du contexte :
- **Page d'accueil** : Logo caché quand le H1 est visible, affiché quand on scroll
- **Autres pages** : Logo toujours visible
- **Navigation avec ancres** : Comportement adaptatif

## ⚙️ Implémentation

### Fichiers modifiés :
1. **`js/script.js`** - Logique principale
2. **`css/style.css`** - Transition fluide

### Fonctionnement détaillé :

#### 🏠 Page d'accueil (`index.html`)
```javascript
// Détection automatique si on est sur la page d'accueil
const isHomePage = homeH1 !== null;

// Observer d'intersection pour le H1
const h1Observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // H1 visible → Logo caché
            navbarLogo.style.opacity = '0';
            navbarLogo.style.visibility = 'hidden';
        } else {
            // H1 pas visible → Logo affiché
            navbarLogo.style.opacity = '1';
            navbarLogo.style.visibility = 'visible';
        }
    });
}, {
    threshold: 0,
    rootMargin: '-50px 0px 0px 0px' // Déclenche avant disparition complète
});
```

#### 🔗 Gestion des ancres
```javascript
function setInitialLogoState() {
    const hash = window.location.hash;
    const scrollY = window.scrollY;
    
    // Si ancre != #accueil → Logo visible
    if (hash && hash !== '#accueil' && hash !== '#') {
        // Afficher logo
        return;
    }
    
    // Si en haut ou #accueil → Logo caché
    if (scrollY < 100 || hash === '#accueil' || hash === '#') {
        // Cacher logo
    }
}

// Écouter les changements d'ancre
window.addEventListener('hashchange', () => {
    setTimeout(setInitialLogoState, 100);
});
```

#### 🌐 Autres pages
```javascript
// Si pas sur page d'accueil → Logo toujours visible
if (!isHomePage || !homeH1 || !navbarLogo) {
    navbarLogo.style.opacity = '1';
    navbarLogo.style.visibility = 'visible';
    navbarLogo.style.pointerEvents = 'auto';
    return;
}
```

#### ⏱️ Synchronisation avec preloader
```javascript
if (isHomePage) {
    // Attendre fin du preloader (900ms)
    setTimeout(() => {
        handleLogoVisibility();
    }, 900);
    
    // Observer suppression du preloader (sécurité)
    const preloaderObserver = new MutationObserver(/* ... */);
} else {
    // Autres pages : initialisation immédiate
    handleLogoVisibility();
}
```

## 🎨 Transitions CSS

```css
.navbar-logo {
    font-weight: 700;
    font-size: 1.5rem;
    color: var(--dark-color);
    opacity: 1;
    transform: none;
    transition: opacity 0.3s ease, visibility 0.3s ease; /* ← Ajouté */
}
```

## 🧪 Scénarios de test

### ✅ Cas couverts :

1. **Chargement direct `index.html`**
   - Logo caché (H1 visible)

2. **Navigation avec ancre `index.html#projets`**
   - Logo visible (pas sur H1)

3. **Retour `index.html#accueil`**
   - Logo caché (retour sur H1)

4. **Pages projets `projets/sae101/index.html`**
   - Logo toujours visible

5. **Bouton "Retour aux projets"**
   - Logo visible (arrive sur #projets)

6. **Scroll manuel sur page d'accueil**
   - Logo apparaît/disparaît selon position H1

## 🛡️ Protections implémentées

1. **Initialisation unique** - `logoVisibilityInitialized` flag
2. **Vérification des éléments** - Tests d'existence avant manipulation
3. **Synchronisation preloader** - Double mécanisme (timer + observer)
4. **Gestion des ancres** - Écoute des changements d'URL
5. **Fallback robuste** - Comportement par défaut sûr

## 🎯 Résultat attendu

- ✅ **Zero bug** d'apparition/disparition
- ✅ **Cohérence** sur toutes les pages
- ✅ **Transitions fluides** (300ms)
- ✅ **Compatible** avec preloader
- ✅ **Responsive** (mobile/desktop)

## 🔧 Test

Utiliser `test-logo.html` pour valider tous les scénarios. 