// ============================================
// PORTFOLIO DE ETHAN - SCRIPT PRINCIPAL AMÉLIORÉ
// ============================================

// Configuration globale
const CONFIG = {
    githubUsername: 'ethan-dev',
    theme: localStorage.getItem('theme') || 'light',
    commands: {
        '/help': 'Afficher toutes les commandes',
        '/projects': 'Voir mes projets',
        '/skills': 'Voir mes compétences',
        '/contact': 'Me contacter',
        '/theme dark': 'Passer en mode sombre',
        '/theme light': 'Passer en mode clair',
        '/clear': 'Effacer la console',
        '/secret': 'Easter egg secret',
        '/stats': 'Voir les statistiques',
        '/resources': 'Voir les ressources'
    },
    stats: {
        visits: parseInt(localStorage.getItem('visits')) || 0,
        commands: parseInt(localStorage.getItem('commands')) || 0,
        lastVisit: localStorage.getItem('lastVisit') || null,
        resourcesClicked: parseInt(localStorage.getItem('resourcesClicked')) || 0
    }
};

// ============================================
// 1. INITIALISATION DES STATISTIQUES
// ============================================

function initStats() {
    // Incrémenter le compteur de visites
    CONFIG.stats.visits++;
    CONFIG.stats.lastVisit = new Date().toISOString();
    
    // Sauvegarder dans localStorage
    localStorage.setItem('visits', CONFIG.stats.visits);
    localStorage.setItem('lastVisit', CONFIG.stats.lastVisit);
    localStorage.setItem('commands', CONFIG.stats.commands);
    localStorage.setItem('resourcesClicked', CONFIG.stats.resourcesClicked);
    
    // Mettre à jour l'affichage dans le footer
    updateFooterStats();
    
    // Log discret dans la console
    console.log(`👋 Bienvenue ! Visite n°${CONFIG.stats.visits}`);
    console.log(`📊 Statistiques complètes : ${JSON.stringify(CONFIG.stats, null, 2)}`);
}

function updateFooterStats() {
    const footerStats = document.getElementById('visit-counter');
    if (footerStats) {
        footerStats.textContent = `Visites : ${CONFIG.stats.visits} | Commandes : ${CONFIG.stats.commands}`;
    }
}

// ============================================
// 2. SYSTÈME DE THÈME AMÉLIORÉ
// ============================================

function initTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');
    
    // Détection automatique de la préférence système
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Appliquer le thème sauvegardé ou système
    if (!localStorage.getItem('theme')) {
        CONFIG.theme = prefersDarkScheme.matches ? 'dark' : 'light';
        localStorage.setItem('theme', CONFIG.theme);
    }
    
    applyTheme(CONFIG.theme);
    
    // Mettre à jour l'icône
    if (themeIcon) {
        themeIcon.textContent = CONFIG.theme === 'dark' ? '☀️' : '🌙';
    }
    
    // Gérer le clic sur le toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const newTheme = CONFIG.theme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
            CONFIG.theme = newTheme;
            localStorage.setItem('theme', newTheme);
            
            if (themeIcon) {
                themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
            }
            
            showNotification(`Thème ${newTheme === 'dark' ? 'sombre' : 'clair'} activé`, 'success');
            logEvent(`Thème changé en ${newTheme}`);
        });
    }
    
    // Écouter les changements de préférence système
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            applyTheme(newTheme);
            CONFIG.theme = newTheme;
            if (themeIcon) themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        }
    });
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.classList.add('theme-transition');
    
    // Supprimer la classe de transition après l'animation
    setTimeout(() => {
        document.body.classList.remove('theme-transition');
    }, 300);
}

// ============================================
// 3. LAZY LOADING AVEC INTERSECTION OBSERVER
// ============================================

function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    
                    // Ajouter une classe pour l'animation
                    img.onload = () => {
                        img.classList.add('lazy-loaded');
                    };
                    
                    // Enlever l'attribut data-src
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback pour les anciens navigateurs
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
}

// ============================================
// 4. MENU MOBILE AMÉLIORÉ
// ============================================

function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            
            // Animation des lignes du bouton hamburger
            const spans = mobileMenuBtn.querySelectorAll('span');
            if (!isExpanded) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Fermer le menu en cliquant sur un lien
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
        
        // Fermer le menu en cliquant à l'extérieur
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
}

// ============================================
// 5. TRACKING DES CLICS SUR LES RESSOURCES
// ============================================

function initResourceTracking() {
    const resourceLinks = document.querySelectorAll('.resource-links a');
    
    resourceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const resourceName = this.querySelector('strong')?.textContent || this.textContent;
            const resourceCategory = this.parentElement.querySelector('.resource-category')?.textContent || 'Non catégorisé';
            
            // Incrémenter le compteur
            CONFIG.stats.resourcesClicked++;
            localStorage.setItem('resourcesClicked', CONFIG.stats.resourcesClicked);
            
            // Mettre à jour les stats dans le footer
            updateFooterStats();
            
            // Log l'événement
            logEvent(`Ressource cliquée: ${resourceName} (${resourceCategory})`);
            
            // Pour les liens externes, afficher une notification
            if (this.getAttribute('target') === '_blank') {
                showNotification(`Ouverture de ${resourceName} dans un nouvel onglet`, 'info');
            }
        });
    });
}

// ============================================
// 6. FAQ ACCESSIBLE
// ============================================

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const answerId = answer.id;
        
        // Définir les attributs ARIA
        question.setAttribute('aria-controls', answerId);
        answer.setAttribute('aria-labelledby', question.id || `faq-question-${Array.from(faqItems).indexOf(item)}`);
        
        question.addEventListener('click', () => {
            const isExpanded = question.getAttribute('aria-expanded') === 'true';
            
            // Fermer tous les autres items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    const otherQuestion = otherItem.querySelector('.faq-question');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    
                    otherQuestion.setAttribute('aria-expanded', 'false');
                    otherAnswer.classList.remove('active');
                    otherItem.classList.remove('active');
                }
            });
            
            // Basculer l'item actuel
            question.setAttribute('aria-expanded', !isExpanded);
            answer.classList.toggle('active');
            item.classList.toggle('active');
            
            // Animation smooth scroll vers la réponse
            if (!isExpanded) {
                setTimeout(() => {
                    answer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 300);
            }
        });
        
        // Support pour la navigation au clavier
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
    });
}

// ============================================
// 7. FILTRAGE DES PROJETS PAR TECHNOLOGIE
// ============================================

function initProjectFilter() {
    const filterTags = document.querySelectorAll('.filter-tag');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterTags.length === 0 || projectCards.length === 0) return;
    
    filterTags.forEach(tag => {
        tag.addEventListener('click', () => {
            filterTags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            
            const filter = tag.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const tags = card.getAttribute('data-tags').split(' ');
                
                if (filter === 'tous' || tags.includes(filter)) {
                    card.style.display = 'block';
                    card.style.animation = 'none';
                    setTimeout(() => {
                        card.style.animation = 'fadeInUp 0.6s ease-out';
                    }, 10);
                } else {
                    card.style.display = 'none';
                }
            });
            
            tag.style.transform = 'scale(1.05)';
            setTimeout(() => {
                tag.style.transform = 'scale(1)';
            }, 150);
            
            logEvent(`Filtre projets appliqué: ${filter}`);
        });
    });
}

function initBlogFilter() {
    const blogContext = document.querySelector('.blog-section');
    if (!blogContext) return;
    
    const filterTags = blogContext.querySelectorAll('.filter-tag');
    const blogCards = blogContext.querySelectorAll('.blog-card');
    const searchInput = blogContext.querySelector('.blog-search');
    const noArticlesMsg = blogContext.querySelector('.no-articles-message');
    const articleCount = blogContext.querySelector('.article-count');
    const blogGrid = blogContext.querySelector('.blog-grid');
    
    if (filterTags.length === 0 || blogCards.length === 0) return;
    
    const STORAGE_KEY = 'blogFilter';
    const savedFilter = localStorage.getItem(STORAGE_KEY) || 'tous';
    
    const applyFilter = () => {
        const activeFilter = document.querySelector('.filter-tag.active');
        const filter = activeFilter ? activeFilter.getAttribute('data-filter') : 'tous';
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        let visibleCount = 0;
        
        blogCards.forEach((card, index) => {
            const categories = card.getAttribute('data-category').split(' ');
            const searchContent = card.getAttribute('data-search') || '';
            const title = card.querySelector('h2').textContent.toLowerCase();
            
            const matchesCategory = filter === 'tous' || categories.includes(filter);
            const matchesSearch = searchTerm === '' || 
                searchContent.toLowerCase().includes(searchTerm) || 
                title.includes(searchTerm);
            
            const shouldShow = matchesCategory && matchesSearch;
            
            if (shouldShow) {
                card.style.opacity = '0';
                card.style.animation = 'none';
                card.style.display = 'block';
                visibleCount++;
                
                setTimeout(() => {
                    card.style.animation = 'fadeInUp 0.4s ease-out';
                    card.style.opacity = '1';
                }, index * 50);
            } else {
                card.style.display = 'none';
            }
        });
        
        articleCount.textContent = `(${visibleCount} article${visibleCount !== 1 ? 's' : ''})`;
        
        if (visibleCount === 0) {
            noArticlesMsg.classList.add('show');
        } else {
            noArticlesMsg.classList.remove('show');
        }
        
        localStorage.setItem(STORAGE_KEY, filter);
    };
    
    filterTags.forEach(tag => {
        if (tag.getAttribute('data-filter') === savedFilter) {
            tag.classList.add('active');
        }
        
        tag.addEventListener('click', () => {
            filterTags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            
            tag.style.transform = 'scale(1.05)';
            setTimeout(() => {
                tag.style.transform = 'scale(1)';
            }, 150);
            
            applyFilter();
            
            if (blogGrid) {
                blogGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            applyFilter();
        });
    }
    
    applyFilter();
}

// ============================================
// 8. CONSOLE DE DÉVELOPPEMENT AMÉLIORÉE
// ============================================

function initDevConsole() {
    const consoleBtn = document.querySelector('.dev-console');
    const consoleModal = document.querySelector('.console-modal');
    const consoleClose = document.querySelector('.console-close');
    const consoleInput = document.querySelector('.console-input input');
    const consoleSubmit = document.querySelector('.console-input button');
    const consoleOutput = document.querySelector('.console-output');
    
    if (!consoleBtn || !consoleModal) return;
    
    // Ouvrir/fermer la console
    consoleBtn.addEventListener('click', () => {
        const isActive = consoleModal.classList.contains('active');
        consoleModal.classList.toggle('active');
        consoleBtn.setAttribute('aria-expanded', !isActive);
        
        if (!isActive) {
            consoleInput.focus();
            logEvent('Console ouverte');
        } else {
            logEvent('Console fermée');
        }
    });
    
    if (consoleClose) {
        consoleClose.addEventListener('click', () => {
            consoleModal.classList.remove('active');
            consoleBtn.setAttribute('aria-expanded', 'false');
            logEvent('Console fermée via bouton');
        });
    }
    
    // Fermer la console avec Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && consoleModal.classList.contains('active')) {
            consoleModal.classList.remove('active');
            consoleBtn.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Gérer les commandes
    function handleCommand(command) {
        CONFIG.stats.commands++;
        localStorage.setItem('commands', CONFIG.stats.commands);
        updateFooterStats();
        
        const output = consoleOutput;
        const response = document.createElement('div');
        response.className = 'command-response';
        
        // Ajouter la commande à l'historique
        const commandElement = document.createElement('div');
        commandElement.innerHTML = `<span class="prompt">></span> ${command}`;
        commandElement.className = 'command-entry';
        output.appendChild(commandElement);
        
        switch(command.toLowerCase()) {
            case '/help':
                response.innerHTML = `<span class="prompt">></span> <strong>Commandes disponibles:</strong><br>` +
                    Object.entries(CONFIG.commands).map(([cmd, desc]) => 
                        `<span class="command">${cmd}</span> - ${desc}`
                    ).join('<br>');
                break;
                
            case '/projects':
                response.innerHTML = `<span class="prompt">></span> Redirection vers la page projets...`;
                setTimeout(() => window.location.href = 'projets/index.html', 1000);
                break;
                
            case '/skills':
                response.innerHTML = `<span class="prompt">></span> Redirection vers la page CV...`;
                setTimeout(() => window.location.href = 'cv.html', 1000);
                break;
                
            case '/contact':
                response.innerHTML = `<span class="prompt">></span> Redirection vers la page contact...`;
                setTimeout(() => window.location.href = 'contact.html', 1000);
                break;
                
            case '/resources':
                response.innerHTML = `<span class="prompt">></span> Redirection vers la page ressources...`;
                setTimeout(() => window.location.href = 'resources.html', 1000);
                break;
                
            case '/theme dark':
                applyTheme('dark');
                CONFIG.theme = 'dark';
                localStorage.setItem('theme', 'dark');
                document.querySelector('.theme-icon').textContent = '☀️';
                response.innerHTML = `<span class="prompt">></span> Thème sombre activé`;
                break;
                
            case '/theme light':
                applyTheme('light');
                CONFIG.theme = 'light';
                localStorage.setItem('theme', 'light');
                document.querySelector('.theme-icon').textContent = '🌙';
                response.innerHTML = `<span class="prompt">></span> Thème clair activé`;
                break;
                
            case '/clear':
                output.innerHTML = '';
                return;
                
            case '/secret':
                response.innerHTML = `<span class="prompt">></span> 🎮 <strong>Easter egg trouvé !</strong><br>` +
                    `Félicitations ! Vous avez découvert la console secrète.<br>` +
                    `Statistiques : ${CONFIG.stats.visits} visites, ${CONFIG.stats.commands} commandes.`;
                showNotification('Easter egg découvert ! 🎉', 'success');
                logEvent('Easter egg découvert');
                break;
                
            case '/stats':
                response.innerHTML = `<span class="prompt">></span> 📊 <strong>Statistiques:</strong><br>` +
                    `Visites: ${CONFIG.stats.visits}<br>` +
                    `Commandes exécutées: ${CONFIG.stats.commands}<br>` +
                    `Ressources cliquées: ${CONFIG.stats.resourcesClicked}<br>` +
                    `Dernière visite: ${new Date(CONFIG.stats.lastVisit).toLocaleString()}`;
                break;
                
            default:
                response.innerHTML = `<span class="prompt">></span> Commande non reconnue. Tapez /help pour la liste des commandes.`;
        }
        
        output.appendChild(response);
        output.scrollTop = output.scrollHeight;
    }
    
    // Gérer la soumission
    if (consoleSubmit) {
        consoleSubmit.addEventListener('click', () => {
            if (consoleInput.value.trim()) {
                handleCommand(consoleInput.value.trim());
                consoleInput.value = '';
            }
        });
    }
    
    if (consoleInput) {
        consoleInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                if (consoleInput.value.trim()) {
                    handleCommand(consoleInput.value.trim());
                    consoleInput.value = '';
                }
            }
        });
    }
    
    // Message de bienvenue dans la console
    const welcomeMsg = document.createElement('div');
    welcomeMsg.innerHTML = `<span class="prompt">></span> Bienvenue dans la console de développement !<br>` +
        `Tapez <span class="command">/help</span> pour voir les commandes disponibles.<br>` +
        `Vous avez exécuté ${CONFIG.stats.commands} commandes.`;
    consoleOutput.appendChild(welcomeMsg);
}

// ============================================
// 8. BOUTON RETOUR EN HAUT
// ============================================

function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            logEvent('Retour en haut cliqué');
        });
    }
}

// ============================================
// 9. NOTIFICATIONS AMÉLIORÉES
// ============================================

function showNotification(message, type = 'info', duration = 4000) {
    // Supprimer les anciennes notifications
    const oldNotifications = document.querySelectorAll('.notification');
    oldNotifications.forEach(notification => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
    
    // Créer la notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'polite');
    
    // Icône selon le type
    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'error') icon = '❌';
    if (type === 'warning') icon = '⚠️';
    
    notification.innerHTML = `
        <span class="notification-icon">${icon}</span>
        <span class="notification-message">${message}</span>
        <button class="notification-close" aria-label="Fermer la notification">×</button>
    `;
    
    document.body.appendChild(notification);
    
    // Afficher la notification avec animation
    requestAnimationFrame(() => {
        notification.classList.add('show');
    });
    
    // Bouton de fermeture
    const closeBtn = notification.querySelector('.notification-close');
    let timeoutId;
    
    const hideNotification = () => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    };
    
    closeBtn.addEventListener('click', hideNotification);
    
    // Masquer automatiquement
    timeoutId = setTimeout(hideNotification, duration);
    
    // Arrêter le timeout si la souris est sur la notification
    notification.addEventListener('mouseenter', () => {
        clearTimeout(timeoutId);
    });
    
    notification.addEventListener('mouseleave', () => {
        timeoutId = setTimeout(hideNotification, duration);
    });
}

// ============================================
// 10. LOGGING D'ÉVÉNEMENTS
// ============================================

function logEvent(event) {
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    events.push({
        timestamp: new Date().toISOString(),
        event: event,
        page: window.location.pathname
    });
    
    // Garder seulement les 100 derniers événements
    if (events.length > 100) {
        events.shift();
    }
    
    localStorage.setItem('events', JSON.stringify(events));
    
    // Log dans la console en développement
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log(`📝 ${new Date().toLocaleTimeString()} - ${event}`);
    }
}

// ============================================
// 11. GESTION DES FORMULAIRES
// ============================================

function initForms() {
    // Formulaire de newsletter
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email && validateEmail(email)) {
                // Simulation d'envoi
                showNotification('Merci de vous être abonné à la newsletter !', 'success');
                logEvent(`Newsletter subscription: ${email}`);
                
                // Réinitialiser le formulaire
                emailInput.value = '';
                
                // Désactiver temporairement pour éviter les doubles soumissions
                this.querySelector('button').disabled = true;
                setTimeout(() => {
                    this.querySelector('button').disabled = false;
                }, 3000);
            } else {
                showNotification('Veuillez saisir une adresse email valide.', 'error');
            }
        });
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ============================================
// 12. DÉTECTION DE PERFORMANCE
// ============================================

function initPerformanceMonitoring() {
    // Mesurer le temps de chargement
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const loadTime = perfData.loadEventEnd - perfData.navigationStart;
        
        logEvent(`Page loaded in ${loadTime}ms`);
        
        // Avertir si le chargement est trop long
        if (loadTime > 3000) {
            console.warn(`⚠️ Temps de chargement élevé: ${loadTime}ms`);
        }
    });
    
    // Surveillance de la mémoire (si disponible)
    if ('memory' in performance) {
        setInterval(() => {
            const usedJSHeapSize = performance.memory.usedJSHeapSize;
            const totalJSHeapSize = performance.memory.totalJSHeapSize;
            const memoryUsage = (usedJSHeapSize / totalJSHeapSize * 100).toFixed(1);
            
            if (memoryUsage > 80) {
                console.warn(`⚠️ Utilisation mémoire élevée: ${memoryUsage}%`);
            }
        }, 30000);
    }
}

// ============================================
// 13. GESTION DES OFFLINES
// ============================================

function initOfflineSupport() {
    // Détection de la connexion
    window.addEventListener('online', () => {
        showNotification('Vous êtes de nouveau en ligne', 'success', 3000);
        logEvent('Connection restored');
    });
    
    window.addEventListener('offline', () => {
        showNotification('Vous êtes hors ligne. Certaines fonctionnalités peuvent être limitées.', 'warning', 5000);
        logEvent('Connection lost');
    });
    
    // Service Worker pour le cache (basique)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(error => {
            console.log('Service Worker registration failed:', error);
        });
    }
}

// ============================================
// 13.5. CARROUSEL AUTOMATIQUE
// ============================================

function initCarousel() {
    const carousel = document.querySelector('.hero-carousel');
    if (!carousel) return;
    
    const slides = carousel.querySelectorAll('.carousel-slide');
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[n].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    setInterval(nextSlide, 3000);
}

// ============================================
// 14. INITIALISATION COMPLÈTE
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Message de démarrage
    console.log('🚀 Portfolio de Ethan - Initialisation...');
    
    // Initialiser les statistiques
    initStats();
    
    // Initialiser toutes les fonctionnalités
    initTheme();
    initCarousel();
    initLazyLoading();
    initMobileMenu();
    initResourceTracking();
    initFAQ();
    initProjectFilter();
    initBlogFilter();
    initDevConsole();
    initBackToTop();
    initForms();
    initPerformanceMonitoring();
    initOfflineSupport();
    
    // Détection des fonctionnalités
    detectFeatures();
    
    // Message de fin d'initialisation
    setTimeout(() => {
        console.log('✅ Portfolio chargé avec succès !');
        console.log('💡 Astuce: Cliquez sur la console (💻) pour les fonctionnalités avancées');
        
        // Easter egg aléatoire
        if (Math.random() < 0.2) {
            console.log('🎮 Cherchez les easter eggs dans la console !');
        }
    }, 100);
});

// Détection des fonctionnalités du navigateur
function detectFeatures() {
    const features = {
        localStorage: 'localStorage' in window,
        sessionStorage: 'sessionStorage' in window,
        serviceWorker: 'serviceWorker' in navigator,
        intersectionObserver: 'IntersectionObserver' in window,
        fetch: 'fetch' in window,
        webP: (() => {
            const canvas = document.createElement('canvas');
            return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
        })(),
        prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    };
    
    logEvent(`Features detected: ${JSON.stringify(features)}`);
    
    // Ajuster les animations si l'utilisateur préfère les réduire
    if (features.prefersReducedMotion) {
        document.documentElement.classList.add('reduced-motion');
    }
}