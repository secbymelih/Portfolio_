// Preloader et gestion du chargement
window.addEventListener('load', () => {
    // Attendre que les polices soient chargées
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
            hidePreloader();
        });
    } else {
        // Fallback si l'API Font Loading n'est pas supportée
        setTimeout(hidePreloader, 800);
    }
});

function hidePreloader() {
    const preloader = document.getElementById('preloader');
    const body = document.body;
    
    if (preloader) {
        // Ajouter la classe fade-out au preloader
        preloader.classList.add('fade-out');
        
        // Marquer le body comme chargé
        body.classList.add('loaded');
        
        // Supprimer complètement le preloader après l'animation
        setTimeout(() => {
            preloader.remove();
        }, 800);
    }
}

// Détection de la page d'accueil - IMMÉDIATEMENT, avant même DOMContentLoaded
(function() {
    const homeH1 = document.querySelector('#accueil h1');
    const isHomePage = homeH1 !== null;
    if (isHomePage) {
        document.body.classList.add('home-page');
        
        // Détection immédiate si le logo doit être visible
        const hash = window.location.hash;
        const scrollY = window.scrollY;
        
        // Si on a une ancre qui n'est pas #accueil, ou si on est déjà scrollé
        // alors le logo doit être visible immédiatement
        if ((hash && hash !== '#accueil' && hash !== '#') || scrollY > 100) {
            document.body.classList.add('logo-visible');
        }
    }
})();

// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', () => {
    // Variables
    const menuIcon = document.querySelector('.menu-icon');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const aproposBlocks = document.querySelectorAll('.apropos-block');
    const cvSections = document.querySelectorAll('.cv-section');
    const competencesCols = document.querySelectorAll('.competences-col');
    const timeline = document.querySelector('.timeline');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineHorizontal = document.querySelector('.timeline-horizontal');
    const timelineItemsHorizontal = document.querySelectorAll('.timeline-item-horizontal');
    const anglaisBlocks = document.querySelectorAll('.anglais-block');
    const softSkillBubbles = document.querySelectorAll('.soft-skill-bubble');
    const projetPhareElements = document.querySelectorAll('.projet-phare h2, .projet-phare-description, .competences-acquises, .download-btn');
    const projetCards = document.querySelectorAll('.projet-card');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const contactItems = document.querySelectorAll('.contact-item');
    const contactForm = document.querySelector('.contact-form');
    const bgOverlay = document.querySelector('.bg-overlay');
    const accueilSection = document.querySelector('#accueil');

    // Gestion de l'affichage du logo dans la navbar
    const navbarLogo = document.querySelector('.navbar-logo');
    const homeH1 = document.querySelector('#accueil h1');
    const isHomePage = document.body.classList.contains('home-page');
    
    // Variable pour éviter l'initialisation multiple
    let logoVisibilityInitialized = false;
    
    // Fonction pour gérer l'affichage du logo
    function handleLogoVisibility() {
        // Éviter l'initialisation multiple
        if (logoVisibilityInitialized) {
            return;
        }
        logoVisibilityInitialized = true;
        
        // Si on n'est pas sur la page d'accueil, le logo doit toujours être visible
        if (!isHomePage || !homeH1 || !navbarLogo) {
            if (navbarLogo) {
                navbarLogo.style.opacity = '1';
                navbarLogo.style.visibility = 'visible';
                navbarLogo.style.pointerEvents = 'auto';
            }
            return;
        }
        
        // Observer pour détecter quand le h1 de la section home sort du viewport
        const h1Observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Le h1 est visible - cacher le logo
                    document.body.classList.remove('logo-visible');
                    navbarLogo.style.opacity = '0';
                    navbarLogo.style.visibility = 'hidden';
                    navbarLogo.style.pointerEvents = 'none';
                } else {
                    // Le h1 n'est plus visible - afficher le logo
                    document.body.classList.add('logo-visible');
                    navbarLogo.style.opacity = '1';
                    navbarLogo.style.visibility = 'visible';
                    navbarLogo.style.pointerEvents = 'auto';
                }
            });
        }, {
            threshold: 0,
            rootMargin: '-50px 0px 0px 0px' // Déclencher un peu avant que le h1 disparaisse complètement
        });
        
        // Observer le h1 de la section home
        h1Observer.observe(homeH1);
        
        // Gestion de l'état initial avec vérification des ancres
        function setInitialLogoState() {
            const hash = window.location.hash;
            const scrollY = window.scrollY;
            
            // Si on a une ancre qui n'est pas #accueil, afficher le logo immédiatement
            if (hash && hash !== '#accueil' && hash !== '#') {
                document.body.classList.add('logo-visible');
                navbarLogo.style.opacity = '1';
                navbarLogo.style.visibility = 'visible';
                navbarLogo.style.pointerEvents = 'auto';
                return;
            }
            
            // Si on est en haut de page ou sur l'ancre accueil, cacher le logo
            if (scrollY < 100 || hash === '#accueil' || hash === '#') {
                document.body.classList.remove('logo-visible');
                navbarLogo.style.opacity = '0';
                navbarLogo.style.visibility = 'hidden';
                navbarLogo.style.pointerEvents = 'none';
            } else {
                // Si on scroll déjà plus loin, afficher le logo
                document.body.classList.add('logo-visible');
                navbarLogo.style.opacity = '1';
                navbarLogo.style.visibility = 'visible';
                navbarLogo.style.pointerEvents = 'auto';
            }
        }
        
        // Appliquer l'état initial
        setInitialLogoState();
        
        // Écouter les changements d'ancre pour ajuster l'état du logo
        window.addEventListener('hashchange', () => {
            // Attendre un court délai pour que le scroll soit effectué
            setTimeout(setInitialLogoState, 100);
        });
    }
    
    // Initialiser la gestion du logo après le preloader
    if (isHomePage) {
        // Si on est sur la page d'accueil, le logo est déjà caché par CSS
        // On peut initialiser plus rapidement maintenant
        setTimeout(() => {
            handleLogoVisibility();
        }, 200);
        
        // Également écouter l'événement de fin du preloader pour plus de robustesse
        const preloader = document.getElementById('preloader');
        if (preloader) {
            // Observer la suppression du preloader
            const preloaderObserver = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList') {
                        mutation.removedNodes.forEach((node) => {
                            if (node.id === 'preloader') {
                                // Le preloader a été supprimé, initialiser immédiatement
                                setTimeout(handleLogoVisibility, 50);
                                preloaderObserver.disconnect();
                            }
                        });
                    }
                });
            });
            preloaderObserver.observe(document.body, { childList: true });
        }
    } else {
        // Si on n'est pas sur la page d'accueil, initialiser immédiatement
        handleLogoVisibility();
    }

    // Initialiser le globe 3D
    initGlobe3D();

    // Effet de dé-zoom sur l'image de fond
    if (bgOverlay && accueilSection) {
        const initialScale = 1.2;
        const targetScale = 1.0;
        const scrollRange = window.innerHeight * 1.2; // La hauteur de la fenêtre, ajustée pour un effet plus doux
        
        // Variables pour l'animation fluide
        let currentScaleValue = initialScale;
        let targetScaleValue = initialScale;
        let animationFrameId = null;
        
        // Fonction pour une transition fluide avec easing
        function easeOutQuad(t) {
            return t * (2 - t);
        }
        
        // Animation fluide avec requestAnimationFrame
        function animateScale() {
            // Interpolation fluide entre la valeur actuelle et la valeur cible
            const difference = targetScaleValue - currentScaleValue;
            
            // Si la différence est très petite, on atteint directement la valeur cible
            if (Math.abs(difference) < 0.0001) {
                currentScaleValue = targetScaleValue;
                bgOverlay.style.transform = `scale(${currentScaleValue})`;
                // Réinitialiser l'ID d'animation pour permettre de futures animations
                animationFrameId = null;
                return;
            } else {
                // Sinon on fait une transition douce (15% de la différence)
                currentScaleValue += difference * 0.15;
            }
            
            // Appliquer la transformation
            bgOverlay.style.transform = `scale(${currentScaleValue})`;
            
            // Continuer l'animation
            animationFrameId = requestAnimationFrame(animateScale);
        }
        
        // Écouter l'événement de scroll
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            // Calculer le facteur de dé-zoom en fonction du scroll
            if (scrollY <= scrollRange) {
                const scrollProgress = scrollY / scrollRange;
                // Utiliser une fonction d'easing pour un effet plus naturel
                const easedProgress = easeOutQuad(scrollProgress);
                targetScaleValue = initialScale - (easedProgress * (initialScale - targetScale));
            } else {
                targetScaleValue = targetScale;
            }
            
            // Démarrer ou continuer l'animation si elle n'est pas déjà en cours
            if (!animationFrameId) {
                animationFrameId = requestAnimationFrame(animateScale);
            }
        });
        
        // Réinitialiser l'animation lors du redimensionnement de la fenêtre
        window.addEventListener('resize', () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
            
            // Réinitialiser les valeurs
            const scrollY = window.scrollY;
            const scrollRange = window.innerHeight * 1.2;
            
            if (scrollY <= scrollRange) {
                const scrollProgress = scrollY / scrollRange;
                const easedProgress = easeOutQuad(scrollProgress);
                currentScaleValue = initialScale - (easedProgress * (initialScale - targetScale));
                targetScaleValue = currentScaleValue;
            } else {
                currentScaleValue = targetScale;
                targetScaleValue = targetScale;
            }
            
            bgOverlay.style.transform = `scale(${currentScaleValue})`;
        });
    }

    // Fonction pour gérer le menu mobile
    menuIcon.addEventListener('click', (e) => {
        e.stopPropagation(); // Empêche le clic de se propager
        menuIcon.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fermer le menu mobile lors du clic sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuIcon.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Fermer le menu lors du défilement
    window.addEventListener('scroll', () => {
        if (menuIcon.classList.contains('active')) {
            menuIcon.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Fermer le menu lors d'un clic en dehors
    document.addEventListener('click', (e) => {
        // Si le menu est ouvert et que le clic n'est ni sur le menu ni sur l'icône du menu
        if (menuIcon.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !menuIcon.contains(e.target)) {
            menuIcon.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Observer pour les animations au scroll
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.2 });

    // Observer les blocs "À propos"
    aproposBlocks.forEach(block => {
        observer.observe(block);
    });

    // Observer les sections CV
    cvSections.forEach(section => {
        observer.observe(section);
    });

    // Observer les colonnes de compétences
    competencesCols.forEach(col => {
        observer.observe(col);
    });

    // Observer la timeline
    if (timeline) {
        // Créer un nouvel observateur pour la timeline
        const timelineObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    
                    // Attendre que la ligne atteigne le premier point (25% de la hauteur)
                    setTimeout(() => {
                        const pointRight = document.querySelector('.timeline .point-right');
                        if (pointRight) pointRight.classList.add('active');
                    }, 1000); // Délai ajusté en fonction de la vitesse d'animation de la ligne
                    
                    // Attendre que la ligne atteigne le deuxième point (75% de la hauteur)
                    setTimeout(() => {
                        const pointLeft = document.querySelector('.timeline .point-left');
                        if (pointLeft) pointLeft.classList.add('active');
                    }, 2000); // Délai ajusté en fonction de la vitesse d'animation de la ligne
                }
            });
        }, { threshold: 0.2 });
        
        timelineObserver.observe(timeline);
        
        // Observer les éléments de la timeline avec délai progressif
        timelineItems.forEach((item, index) => {
            const itemObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Délai progressif pour l'animation du haut vers le bas
                        setTimeout(() => {
                            item.classList.add('active');
                            // Après l'activation des items, ajuster les points
                            adjustTimelinePoints();
                        }, 300 + (index * 300)); // Délai progressif: 300ms, 600ms, etc.
                    }
                });
            }, { threshold: 0.2 });
            
            itemObserver.observe(item);
        });
    }

    // Observer la timeline horizontale
    if (timelineHorizontal) {
        // Créer un nouvel observateur pour la timeline horizontale
        const timelineHorizontalObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    
                    // Attendre que la ligne atteigne le premier point (25% de la largeur)
                    setTimeout(() => {
                        const pointBottom = document.querySelector('.timeline-horizontal .point-bottom');
                        if (pointBottom) pointBottom.classList.add('active');
                    }, 500); // Délai ajusté en fonction de la vitesse d'animation de la ligne
                    
                    // Attendre que la ligne atteigne le deuxième point (75% de la largeur)
                    setTimeout(() => {
                        const pointTop = document.querySelector('.timeline-horizontal .point-top');
                        if (pointTop) pointTop.classList.add('active');
                    }, 1000); // Délai ajusté en fonction de la vitesse d'animation de la ligne
                }
            });
        }, { threshold: 0.2 });
        
        timelineHorizontalObserver.observe(timelineHorizontal);
        
        // Observer les éléments de la timeline horizontale avec délai progressif
        timelineItemsHorizontal.forEach((item, index) => {
            const itemObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Délai progressif pour l'animation de gauche à droite
                        setTimeout(() => {
                            item.classList.add('active');
                            // Après l'activation des items, ajuster les points
                            adjustTimelinePoints();
                        }, 300 + (index * 300)); // Délai progressif: 300ms, 600ms, etc.
                    }
                });
            }, { threshold: 0.2 });
            
            itemObserver.observe(item);
        });
    }

    // Observer les blocs anglais
    anglaisBlocks.forEach(block => {
        observer.observe(block);
    });

    // Observer les bulles de soft skills
    softSkillBubbles.forEach(bubble => {
        observer.observe(bubble);
    });

    // Observer les éléments du projet phare
    projetPhareElements.forEach(element => {
        observer.observe(element);
    });

    // Observer les cartes de projets
    projetCards.forEach(card => {
        observer.observe(card);
    });

    // Observer les éléments de contact
    contactItems.forEach(item => {
        observer.observe(item);
    });
    
    if (contactForm) {
        observer.observe(contactForm);
        
        // Gestion du formulaire de contact avec Formspree
        const form = document.getElementById('contactForm');
        const formMessage = document.getElementById('form-message');
        
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                // Afficher le message de chargement
                formMessage.textContent = 'Envoi en cours...';
                formMessage.classList.add('form-message-info');
                formMessage.classList.remove('form-message-success', 'form-message-error');
                
                try {
                    // Envoyer les données via Formspree
                    const response = await fetch(form.action, {
                        method: 'POST',
                        body: new FormData(form),
                        headers: {
                            'Accept': 'application/json'
                        }
                    });
                    
                    const data = await response.json();
                    
                    if (response.ok) {
                        // Afficher le message de succès
                        formMessage.textContent = "Votre message a été envoyé avec succès !";
                        formMessage.classList.add('form-message-success');
                        formMessage.classList.remove('form-message-error', 'form-message-info');
                        
                        // Réinitialiser le formulaire
                        form.reset();
                    } else {
                        // Afficher le message d'erreur
                        formMessage.textContent = data.error || "Une erreur est survenue lors de l'envoi du message.";
                        formMessage.classList.add('form-message-error');
                        formMessage.classList.remove('form-message-success', 'form-message-info');
                    }
                } catch (error) {
                    // Gérer les erreurs
                    console.error('Erreur lors de l\'envoi du formulaire:', error);
                    formMessage.textContent = 'Une erreur est survenue lors de l\'envoi du formulaire.';
                    formMessage.classList.add('form-message-error');
                    formMessage.classList.remove('form-message-success', 'form-message-info');
                }
            });
        }
    }

    // Animation spéciale pour le CV (style Apple)
    const cvContainer = document.querySelector('.cv-container');
    
    if (cvContainer) {
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('.cv-section');
            const scrollPosition = window.scrollY;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 300;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < (sectionTop + sectionHeight)) {
                    if (!section.classList.contains('active')) {
                        section.classList.add('active');
                    }
                }
            });
        });
    }

    // Gérer le carrousel du Projet Phare
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const carouselDots = document.querySelectorAll('.carousel-dot');
    const carouselPrev = document.querySelector('.carousel-prev');
    const carouselNext = document.querySelector('.carousel-next');
    const carouselContainer = document.querySelector('.carousel-container');
    
    let currentSlide = 0;
    let carouselInterval; // Variable pour stocker l'intervalle
    let isCarouselTouchMoving = false;
    let carouselTouchStartX = 0;
    let carouselTouchEndX = 0;
    
    if (carouselSlides.length > 0) {
        // Fonction pour afficher un slide spécifique
        const showSlide = (index) => {
            // Cacher tous les slides
            carouselSlides.forEach(slide => {
                slide.classList.remove('active');
            });
            
            // Désélectionner tous les points
            carouselDots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            // Afficher le slide actuel
            carouselSlides[index].classList.add('active');
            carouselDots[index].classList.add('active');
            
            // Mettre à jour l'index courant
            currentSlide = index;
        };
        
        // Fonction pour réinitialiser le défilement automatique
        const resetCarouselInterval = () => {
            // Effacer l'intervalle existant
            clearInterval(carouselInterval);
            
            // Créer un nouvel intervalle
            carouselInterval = setInterval(() => {
                const nextIndex = (currentSlide + 1) % carouselSlides.length;
                showSlide(nextIndex);
            }, 5000);
        };
        
        // Event listeners pour les flèches de navigation
        carouselNext.addEventListener('click', () => {
            const nextIndex = (currentSlide + 1) % carouselSlides.length;
            showSlide(nextIndex);
            resetCarouselInterval(); // Réinitialiser le timer
        });
        
        carouselPrev.addEventListener('click', () => {
            const prevIndex = (currentSlide - 1 + carouselSlides.length) % carouselSlides.length;
            showSlide(prevIndex);
            resetCarouselInterval(); // Réinitialiser le timer
        });
        
        // Event listeners pour les points de navigation
        carouselDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                resetCarouselInterval(); // Réinitialiser le timer
            });
        });
        
        // Ajouter la gestion tactile pour mobile
        if (carouselContainer) {
            // Événement au début du toucher
            carouselContainer.addEventListener('touchstart', (e) => {
                carouselTouchStartX = e.changedTouches[0].screenX;
                isCarouselTouchMoving = false;
            }, { passive: true });
            
            // Événement pendant le mouvement
            carouselContainer.addEventListener('touchmove', () => {
                isCarouselTouchMoving = true;
            }, { passive: true });
            
            // Événement à la fin du toucher
            carouselContainer.addEventListener('touchend', (e) => {
                if (!isCarouselTouchMoving) return;
                
                carouselTouchEndX = e.changedTouches[0].screenX;
                const difference = carouselTouchStartX - carouselTouchEndX;
                
                // Détecter si c'est un swipe significatif (plus de 50px)
                if (Math.abs(difference) > 50) {
                    if (difference > 0) {
                        // Swipe gauche - prochain slide
                        const nextIndex = (currentSlide + 1) % carouselSlides.length;
                        showSlide(nextIndex);
                    } else {
                        // Swipe droite - slide précédent
                        const prevIndex = (currentSlide - 1 + carouselSlides.length) % carouselSlides.length;
                        showSlide(prevIndex);
                    }
                    resetCarouselInterval();
                }
            }, { passive: true });
        }
        
        // Démarrer le défilement automatique
        resetCarouselInterval();
    }

    // Gérer le filtrage des projets
    const filterSelect = document.getElementById('filter-select');
    
    if (filterSelect) {
        filterSelect.addEventListener('change', function() {
            // Récupérer la valeur du filtre sélectionné
            const filter = this.value;
            
            // Filtrer les projets
            projetCards.forEach(card => {
                if (filter === 'all') {
                    card.classList.remove('hide');
                } else {
                    const categories = card.getAttribute('data-category').split(',');
                    if (categories.includes(filter)) {
                        card.classList.remove('hide');
                    } else {
                        card.classList.add('hide');
                    }
                }
            });
        });
    }

    // Gérer le carrousel des témoignages
    const temoignageSlides = document.querySelectorAll('.temoignage-slide');
    const temoignageDots = document.querySelectorAll('.temoignage-dot');
    const temoignagePrev = document.querySelector('.temoignage-prev');
    const temoignageNext = document.querySelector('.temoignage-next');
    const temoignageContainer = document.querySelector('.temoignages-slider');

    let currentTemoignage = 0;
    let temoignageInterval; // Variable pour stocker l'intervalle
    let isTouchMoving = false;
    let touchStartX = 0;
    let touchEndX = 0;

    if (temoignageSlides.length > 0) {
        // Fonction pour afficher un témoignage spécifique
        const showTemoignage = (index, direction = null) => {
            // Direction peut être 'prev' ou 'next' pour l'animation
            const currentSlide = temoignageSlides[currentTemoignage];
            const nextSlide = temoignageSlides[index];
            
            // Déterminer la direction si non spécifiée
            if (!direction) {
                direction = index > currentTemoignage ? 'next' : 'prev';
                // Cas spécial: si on passe du dernier slide au premier
                if (currentTemoignage === temoignageSlides.length - 1 && index === 0) {
                    direction = 'next';
                }
                // Cas spécial: si on passe du premier slide au dernier
                if (currentTemoignage === 0 && index === temoignageSlides.length - 1) {
                    direction = 'prev';
                }
            }
            
            // Enlever toutes les classes de transition précédentes
            temoignageSlides.forEach(slide => {
                slide.classList.remove('active', 'prev', 'next');
            });
            
            // Positionner le nouveau slide selon la direction
            if (direction === 'next') {
                nextSlide.style.transform = 'translateX(50px)';
                currentSlide.classList.add('prev');
            } else {
                nextSlide.style.transform = 'translateX(-50px)';
                currentSlide.classList.add('next');
            }
            
            // Forcer un reflow pour que la transition fonctionne
            void nextSlide.offsetWidth;
            
            // Réinitialiser la transformation et activer le slide
            nextSlide.style.transform = '';
            nextSlide.classList.add('active');
            
            // Désélectionner tous les points
            temoignageDots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            // Mettre à jour le point actif
            temoignageDots[index].classList.add('active');
            
            // Mettre à jour l'index courant
            currentTemoignage = index;
        };
        
        // Fonction pour réinitialiser le défilement automatique
        const resetTemoignageInterval = () => {
            // Effacer l'intervalle existant
            clearInterval(temoignageInterval);
            
            // Créer un nouvel intervalle
            temoignageInterval = setInterval(() => {
                const nextIndex = (currentTemoignage + 1) % temoignageSlides.length;
                showTemoignage(nextIndex, 'next');
            }, 8000);
        };
        
        // Event listeners pour les flèches de navigation
        temoignageNext.addEventListener('click', () => {
            const nextIndex = (currentTemoignage + 1) % temoignageSlides.length;
            showTemoignage(nextIndex, 'next');
            resetTemoignageInterval(); // Réinitialiser le timer
        });
        
        temoignagePrev.addEventListener('click', () => {
            const prevIndex = (currentTemoignage - 1 + temoignageSlides.length) % temoignageSlides.length;
            showTemoignage(prevIndex, 'prev');
            resetTemoignageInterval(); // Réinitialiser le timer
        });
        
        // Event listeners pour les points de navigation
        temoignageDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                if (index === currentTemoignage) return; // Ne rien faire si c'est déjà le slide actif
                
                const direction = index > currentTemoignage ? 'next' : 'prev';
                showTemoignage(index, direction);
                resetTemoignageInterval(); // Réinitialiser le timer
            });
        });
        
        // Ajouter la gestion tactile pour mobile
        if (temoignageContainer) {
            // Événement au début du toucher
            temoignageContainer.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                isTouchMoving = false;
            }, { passive: true });
            
            // Événement pendant le mouvement
            temoignageContainer.addEventListener('touchmove', () => {
                isTouchMoving = true;
            }, { passive: true });
            
            // Événement à la fin du toucher
            temoignageContainer.addEventListener('touchend', (e) => {
                if (!isTouchMoving) return;
                
                touchEndX = e.changedTouches[0].screenX;
                const difference = touchStartX - touchEndX;
                
                // Détecter si c'est un swipe significatif (plus de 50px)
                if (Math.abs(difference) > 50) {
                    if (difference > 0) {
                        // Swipe gauche - prochain témoignage
                        const nextIndex = (currentTemoignage + 1) % temoignageSlides.length;
                        showTemoignage(nextIndex, 'next');
                    } else {
                        // Swipe droite - témoignage précédent
                        const prevIndex = (currentTemoignage - 1 + temoignageSlides.length) % temoignageSlides.length;
                        showTemoignage(prevIndex, 'prev');
                    }
                    resetTemoignageInterval();
                }
            }, { passive: true });
        }
        
        // Initialiser avec le premier slide actif
        temoignageSlides[0].classList.add('active');
        temoignageDots[0].classList.add('active');
        
        // Démarrer le défilement automatique
        resetTemoignageInterval();
    }

    // Scroll fluide pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Offset pour la navbar fixe
                    behavior: 'smooth'
                });
            }
        });
    });

    // Copyright dynamique (année actuelle)
    const currentYear = new Date().getFullYear();
    const copyrightEl = document.querySelector('.copyright-year');
    
    if (copyrightEl) {
        copyrightEl.textContent = currentYear;
    }

    // Générer les formes de fond dans les sections
    function generateBackgroundShapes() {
        // Pour les sections principales
        const sectionBackgrounds = document.querySelectorAll('section > .section-background');
        
        // Types de formes disponibles
        const shapeTypes = ['shape-square', 'shape-circle', 'shape-triangle', 'shape-rectangle', 'shape-ring'];
        
        sectionBackgrounds.forEach(background => {
            const section = background.parentElement;
            const sectionHeight = section.offsetHeight;
            
            // Calculer le nombre de formes en fonction de la hauteur de la section
            // Base : 1 forme par 200px de hauteur, minimum 2, maximum 8
            let shapesCount = Math.max(2, Math.min(8, Math.floor(sectionHeight / 200)));
            
            // Zones privilégiées : principalement sur les bords
            const zones = [
                {xMin: 0, xMax: 15, weight: 3},    // Bord gauche (poids élevé)
                {xMin: 85, xMax: 100, weight: 3},  // Bord droit (poids élevé)
                {xMin: 15, xMax: 25, weight: 2},   // Proche gauche
                {xMin: 75, xMax: 85, weight: 2},   // Proche droite
                {xMin: 30, xMax: 70, weight: 1}    // Centre (poids faible)
            ];
            
            // Créer un tableau pondéré des zones
            const weightedZones = [];
            zones.forEach(zone => {
                for (let i = 0; i < zone.weight; i++) {
                    weightedZones.push(zone);
                }
            });
            
            for (let i = 0; i < shapesCount; i++) {
                // Créer un élément de forme
                const shape = document.createElement('div');
                
                // Sélectionner aléatoirement un type de forme
                const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
                shape.classList.add('shape', shapeType);
                
                // Sélectionner une zone selon la pondération
                const selectedZone = weightedZones[Math.floor(Math.random() * weightedZones.length)];
                
                // Positionner dans la zone sélectionnée
                const posX = selectedZone.xMin + Math.random() * (selectedZone.xMax - selectedZone.xMin);
                const posY = Math.random() * 100;
                shape.style.left = `${posX}%`;
                shape.style.top = `${posY}%`;
                
                // Rotation aléatoire
                const rotation = Math.random() * 360;
                shape.style.transform = `rotate(${rotation}deg)`;
                
                // Échelle variable selon la zone (plus petites au centre)
                let scaleRange;
                if (selectedZone.xMin >= 30 && selectedZone.xMax <= 70) {
                    // Zone centrale : formes plus petites et plus transparentes
                    scaleRange = 0.3 + Math.random() * 0.4; // 0.3 à 0.7
                    shape.style.opacity = '0.03'; // Très transparentes
                } else {
                    // Zones sur les bords : formes normales
                    scaleRange = 0.5 + Math.random() * 0.8; // 0.5 à 1.3
                }
                shape.style.transform += ` scale(${scaleRange})`;
                
                // Ajouter la forme à l'arrière-plan
                background.appendChild(shape);
            }
        });
        
        // Pour les sous-sections du CV
        const cvSectionBackgrounds = document.querySelectorAll('.cv-section > .section-background');
        
        cvSectionBackgrounds.forEach(background => {
            const section = background.parentElement;
            const sectionHeight = section.offsetHeight;
            
            // Pour les sous-sections : encore moins de formes
            // Base : 1 forme par 300px de hauteur, minimum 1, maximum 4
            let shapesCount = Math.max(1, Math.min(4, Math.floor(sectionHeight / 300)));
            
            // Zones privilégiées pour sous-sections : encore plus concentrées sur les bords
            const zones = [
                {xMin: 0, xMax: 12, weight: 4},    // Bord gauche (poids très élevé)
                {xMin: 88, xMax: 100, weight: 4},  // Bord droit (poids très élevé)
                {xMin: 12, xMax: 20, weight: 1},   // Proche gauche
                {xMin: 80, xMax: 88, weight: 1}    // Proche droite
                // Pas de zone centrale pour les sous-sections
            ];
            
            // Créer un tableau pondéré des zones
            const weightedZones = [];
            zones.forEach(zone => {
                for (let i = 0; i < zone.weight; i++) {
                    weightedZones.push(zone);
                }
            });
            
            for (let i = 0; i < shapesCount; i++) {
                // Créer un élément de forme
                const shape = document.createElement('div');
                
                // Sélectionner aléatoirement un type de forme
                const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
                shape.classList.add('shape', shapeType);
                
                // Sélectionner une zone selon la pondération
                const selectedZone = weightedZones[Math.floor(Math.random() * weightedZones.length)];
                
                // Positionner dans la zone sélectionnée
                const posX = selectedZone.xMin + Math.random() * (selectedZone.xMax - selectedZone.xMin);
                const posY = Math.random() * 100;
                shape.style.left = `${posX}%`;
                shape.style.top = `${posY}%`;
                
                // Rotation aléatoire
                const rotation = Math.random() * 360;
                shape.style.transform = `rotate(${rotation}deg)`;
                
                // Échelle plus petite pour les sous-sections
                const scale = 0.3 + Math.random() * 0.5; // 0.3 à 0.8
                shape.style.transform += ` scale(${scale})`;
                
                // Ajouter la forme à l'arrière-plan
                background.appendChild(shape);
            }
        });
    }
    
    // Générer les formes au chargement
    generateBackgroundShapes();

    // Animation des tags pour les Centres d'Intérêts
    const tagCloud = document.querySelector('.tag-cloud');
    
    if (!tagCloud) return;
    
    const tags = tagCloud.querySelectorAll('.tag');
    
    // Vérifie s'il y a collision entre deux tags
    function checkCollision(tag1, tag2) {
        const rect1 = tag1.getBoundingClientRect();
        const rect2 = tag2.getBoundingClientRect();
        
        // Distance minimale entre les centres des tags
        // Augmenter la marge en mode responsive
        const margin = window.innerWidth <= 768 ? 30 : 20;
        
        return !(
            rect1.right + margin < rect2.left || 
            rect1.left > rect2.right + margin || 
            rect1.bottom + margin < rect2.top || 
            rect1.top > rect2.bottom + margin
        );
    }
    
    // Positionne chaque tag aléatoirement sans chevauchement
    function positionTags() {
        // Réinitialiser les positions
        tags.forEach(tag => {
            tag.style.left = '';
            tag.style.top = '';
            tag.style.transform = '';
        });
        
        // En mode responsive (≤ 992px), utiliser un positionnement fixe et prévisible
        if (window.innerWidth <= 992) {
            positionTagsResponsive();
            return;
        }
        
        // Mode desktop : garder le comportement aléatoire existant
        const positionedTags = [];
        const tagCloudWidth = tagCloud.clientWidth;
        const tagCloudHeight = tagCloud.clientHeight;
        
        // Marge par rapport aux bords
        const edgeMargin = 30;
        const maxAttempts = 50;
        
        // Trier les tags par taille (plus grands en premier pour éviter qu'ils se retrouvent coincés)
        const sortedTags = Array.from(tags).sort((a, b) => {
            // Priorité aux tags XL et L
            const aSize = a.classList.contains('size-xl') ? 4 : 
                          a.classList.contains('size-l') ? 3 : 
                          a.classList.contains('size-m') ? 2 : 1;
            const bSize = b.classList.contains('size-xl') ? 4 : 
                          b.classList.contains('size-l') ? 3 : 
                          b.classList.contains('size-m') ? 2 : 1;
            return bSize - aSize;
        });
        
        sortedTags.forEach(tag => {
            let attempt = 0;
            let positioned = false;
            
            while (!positioned && attempt < maxAttempts) {
                // Dimensions du tag
                const tagWidth = tag.offsetWidth || 150;
                const tagHeight = tag.offsetHeight || 50;
                
                // Position aléatoire pour desktop
                const left = edgeMargin + Math.random() * (tagCloudWidth - tagWidth - 2 * edgeMargin);
                const top = edgeMargin + Math.random() * (tagCloudHeight - tagHeight - 2 * edgeMargin);
                
                // Appliquer la position
                tag.style.left = `${left}px`;
                tag.style.top = `${top}px`;
                
                // Premier tag = pas de collision à vérifier
                if (positionedTags.length === 0) {
                    positioned = true;
                    positionedTags.push(tag);
                    continue;
                }
                
                // Vérifier les collisions
                let hasCollision = false;
                for (const posTag of positionedTags) {
                    if (checkCollision(tag, posTag)) {
                        hasCollision = true;
                        break;
                    }
                }
                
                if (!hasCollision) {
                    positioned = true;
                    positionedTags.push(tag);
                }
                
                attempt++;
            }
            
            // Si après maxAttempts tentatives, aucune position trouvée, essayer des positions fixes
            if (!positioned) {
                const tagWidth = tag.offsetWidth || 150;
                const tagHeight = tag.offsetHeight || 50;
                
                    // Version desktop - essayer les quatre coins
                    const corners = [
                        {left: edgeMargin, top: edgeMargin},
                        {left: tagCloudWidth - tagWidth - edgeMargin, top: edgeMargin},
                        {left: edgeMargin, top: tagCloudHeight - tagHeight - edgeMargin},
                        {left: tagCloudWidth - tagWidth - edgeMargin, top: tagCloudHeight - tagHeight - edgeMargin}
                    ];
                    
                    for (const corner of corners) {
                        tag.style.left = `${corner.left}px`;
                        tag.style.top = `${corner.top}px`;
                        
                        let hasCollision = false;
                        for (const posTag of positionedTags) {
                            if (checkCollision(tag, posTag)) {
                                hasCollision = true;
                                break;
                            }
                        }
                        
                        if (!hasCollision) {
                            positioned = true;
                            positionedTags.push(tag);
                            break;
                    }
                }
                
                // Si toujours pas placé, assigner une position qui garantit la visibilité
                if (!positioned) {
                    // Prendre un emplacement forcé
                    const forcedPosition = positionedTags.length % 5;
                    const verticalPos = [0.2, 0.35, 0.5, 0.65, 0.8];
                    
                    tag.style.left = '50%';
                    tag.style.top = `${verticalPos[forcedPosition] * 100}%`;
                    tag.style.transform = 'translateX(-50%)';
                    
                    positionedTags.push(tag);
                }
            }
            
            // Animation pour tous les tags (desktop seulement)
            const baseDelay = Math.random() * 2;
            const baseDuration = 3 + Math.random() * 2;
            
            tag.style.animationDelay = `${baseDelay}s`;
            tag.style.animationDuration = `${baseDuration}s`;
        });
    }
    
    // Nouvelle fonction pour le positionnement fixe en mode responsive
    function positionTagsResponsive() {
        // Positions fixes pour écrans responsives étroits - JAMAIS de randomisation
        // Positions adaptées aux écrans mobiles/tablettes avec marges de sécurité
        const fixedPositions = [
            { left: '5%', top: '8%' },      // 1er tag - GUITARE ÉLECTRIQUE - haut gauche
            { left: '35%', top: '88%' },    // 2ème tag - CINÉMA - tout en bas au centre
            { left: '50%', top: '25%' },    // 3ème tag - CANOË - milieu droite (bien séparé de guitare)
            { left: '15%', top: '65%' },    // 4ème tag - RANDONNÉE - bas gauche (mieux réparti)
            { left: '25%', top: '45%' }     // 5ème tag - INNOVATION - centre (utilise l'espace vide)
        ];
        
        // Appliquer les positions fixes dans l'ordre exact des tags dans le DOM
        tags.forEach((tag, index) => {
            // Utiliser la position correspondante à l'index, ou une position de secours
            const position = fixedPositions[index] || { 
                left: `${5 + (index % 2) * 20}%`,  // Alternance gauche/centre seulement
                top: `${10 + Math.floor(index / 2) * 12}%` 
            };
            
            // Appliquer la position EXACTE - aucune variation
            tag.style.left = position.left;
            tag.style.top = position.top;
            tag.style.transform = 'none';
            
            // Aucune animation en responsive
            tag.style.animationDelay = '';
            tag.style.animationDuration = '';
        });
    }
    
    // Exécute le positionnement au chargement et au redimensionnement
    positionTags();
    
    window.addEventListener('resize', function() {
        // Attendre un peu après le redimensionnement pour que les éléments se stabilisent
        clearTimeout(window.resizeTimer);
        window.resizeTimer = setTimeout(function() {
            positionTags();
        }, 250);
    });

    // Positionnement dynamique des points sur les timelines
    function adjustTimelinePoints() {
        // Pour la timeline verticale (expériences)
        document.querySelectorAll('.timeline .point-right, .timeline .point-left').forEach(point => {
            const targetId = point.getAttribute('data-for');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Récupérer la position du titre h3 dans la carte
                const titleElement = targetElement.querySelector('h3');
                if (titleElement) {
                    // Utiliser les positions relatives aux éléments parents plutôt que les positions à l'écran
                    const timelineEl = document.querySelector('.timeline');
                    
                    // Calculer la position verticale relative du titre par rapport à la timeline
                    const titleOffset = titleElement.offsetTop + targetElement.offsetTop;
                    const relativeTop = titleOffset + 10; // +10px pour centrer avec le texte
                    
                    // Appliquer la position au point de manière absolue par rapport à la timeline
                    point.style.top = `${relativeTop}px`;
                    
                    // En mode responsive, ajuster la position horizontale des points
                    if (window.innerWidth <= 992) {
                        // Ne pas modifier left ici car géré par le CSS
                        // Mais on s'assure que la position top est correcte
                    } else {
                        // En mode desktop, centrer les points sur la ligne verticale
                        point.style.left = '50%';
                        point.style.transform = 'translateX(-50%)';
                    }
                }
            }
        });
        
        // Pour la timeline horizontale (formations)
        document.querySelectorAll('.timeline-horizontal .point-top, .timeline-horizontal .point-bottom').forEach(point => {
            const targetId = point.getAttribute('data-for');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Utiliser les positions relatives aux éléments parents plutôt que les positions à l'écran
                const timelineEl = document.querySelector('.timeline-horizontal');
                
                // Calculer la position horizontale relative
                if (point.classList.contains('point-top')) {
                    // Pour le point en haut (formation actuelle)
                    // Récupérer le contenu textuel pour un meilleur alignement
                    const contentElement = targetElement.querySelector('.timeline-content-horizontal');
                    const headerElement = contentElement.querySelector('h3');
                    
                    // Calcul précis basé sur la position du titre h3 dans le contenu
                    const leftPosition = targetElement.offsetLeft + contentElement.offsetLeft + headerElement.offsetLeft; 
                    point.style.left = `${leftPosition}px`;
                } else {
                    // Pour le point en bas (baccalauréat)
                    // Récupérer le contenu textuel pour un meilleur alignement
                    const contentElement = targetElement.querySelector('.timeline-content-horizontal');
                    const headerElement = contentElement.querySelector('h3');
                    
                    // Calcul précis basé sur la position du titre h3 dans le contenu
                    const leftPosition = targetElement.offsetLeft + contentElement.offsetLeft + headerElement.offsetLeft;
                    point.style.left = `${leftPosition}px`;
                }
            }
        });
    }
    
    // Ajuster les points au chargement de la page et au redimensionnement
    window.addEventListener('load', adjustTimelinePoints);
    window.addEventListener('resize', adjustTimelinePoints);
    
    // Ajuster les points quand les sections CV deviennent actives
    const cvObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Positionner les points immédiatement
                adjustTimelinePoints();
            }
        });
    }, { threshold: 0.3 });
    
    document.querySelectorAll('.cv-section.experiences, .cv-section.formations').forEach(section => {
        cvObserver.observe(section);
    });
    
    // Exécuter le positionnement des points immédiatement au chargement de la page
    // pour qu'ils soient bien placés avant le déclenchement des animations
    if (document.querySelector('.timeline') || document.querySelector('.timeline-horizontal')) {
        adjustTimelinePoints();
    }

    // Fonction pour initialiser le globe 3D
    function initGlobe3D() {
        const container = document.getElementById('globe-3d');
        
        if (!container) return;
        
        // Taille du conteneur
        const width = 180;
        const height = 180;
        
        // Création de la scène Three.js
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.z = 2.5;
        
        // Renderer avec fond transparent
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        container.appendChild(renderer.domElement);
        
        // Créer une texture pour le globe en utilisant un canvas
        const canvasSize = 512;  // Taille de la texture
        const canvas = document.createElement('canvas');
        canvas.width = canvasSize;
        canvas.height = canvasSize;
        const ctx = canvas.getContext('2d');
        
        // Remplir le fond en bleu (océans)
        ctx.fillStyle = '#4FB6D6';
        ctx.fillRect(0, 0, canvasSize, canvasSize);
        
        // Dessiner les continents en vert
        ctx.fillStyle = '#8CC751';
        
        // Fonction pour dessiner un continent
        function drawContinent(coords) {
            ctx.beginPath();
            let first = true;
            for (const point of coords) {
                const x = (point[0] + 180) * (canvasSize / 360);
                const y = (90 - point[1]) * (canvasSize / 180);
                if (first) {
                    ctx.moveTo(x, y);
                    first = false;
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.closePath();
            ctx.fill();
        }
        
        // Dessiner l'Amérique du Nord (forme simplifiée)
        drawContinent([
            [-170, 70], [-120, 70], [-80, 70], [-60, 50], 
            [-80, 30], [-100, 25], [-120, 30], [-130, 20],
            [-160, 20], [-170, 30], [-170, 70]
        ]);
        
        // Amérique du Sud
        drawContinent([
            [-80, 10], [-60, 10], [-40, 0], [-40, -20], 
            [-60, -40], [-80, -40], [-80, -20], [-80, 10]
        ]);
        
        // Europe
        drawContinent([
            [-10, 70], [20, 70], [40, 60], [30, 40],
            [10, 40], [0, 50], [-10, 50], [-10, 70]
        ]);
        
        // Afrique
        drawContinent([
            [-20, 35], [40, 35], [50, 10], [40, -30],
            [20, -35], [0, -35], [-20, 0], [-20, 35]
        ]);
        
        // Asie
        drawContinent([
            [40, 70], [140, 70], [140, 30], [110, 20],
            [100, 0], [60, 0], [50, 30], [40, 40], [40, 70]
        ]);
        
        // Australie
        drawContinent([
            [110, -10], [150, -10], [150, -40], [110, -40], [110, -10]
        ]);
        
        // Créer une texture à partir du canvas
        const texture = new THREE.CanvasTexture(canvas);
        
        // Créer le matériau et la géométrie pour le globe
        const globeGeometry = new THREE.SphereGeometry(1, 32, 32);
        const globeMaterial = new THREE.MeshBasicMaterial({
            map: texture
        });
        
        // Créer le globe
        const globe = new THREE.Mesh(globeGeometry, globeMaterial);
        globe.rotation.x = 0.2;  // Légère inclinaison
        scene.add(globe);
        
        // Animation
        function animate() {
            requestAnimationFrame(animate);
            globe.rotation.y += 0.01;
            renderer.render(scene, camera);
        }
        
        animate();
    }
}); 