/* ═══════════════════════════════════
   ETHAN PORTFOLIO — script.js
═══════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    // ── Theme toggle ──────────────────
    const themeBtn = document.getElementById('themeBtn');
    const root = document.documentElement;

    const applyTheme = (theme) => {
        root.setAttribute('data-theme', theme);
        try { localStorage.setItem('theme', theme); } catch(e) {}
    };

    themeBtn?.addEventListener('click', () => {
        const current = root.getAttribute('data-theme') || 'dark';
        applyTheme(current === 'dark' ? 'light' : 'dark');
    });

    // ── Navbar scroll effect ──────────
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar?.classList.toggle('scrolled', window.scrollY > 20);
        updateActiveNav();
    }, { passive: true });

    // ── Active nav on scroll ──────────
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[data-scroll]');

    const updateActiveNav = () => {
        if (!sections.length) return;
        let current = '';
        sections.forEach(sec => {
            if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    };

    // ── Smooth scroll — ONLY on [data-scroll] that have hash hrefs ──
    document.querySelectorAll('[data-scroll]').forEach(el => {
        el.addEventListener('click', (e) => {
            const href = el.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    mobileMenu?.classList.remove('open');
                    burger?.classList.remove('open');
                }
            }
        });
    });

    // ── Mobile menu ───────────────────
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobileMenu');

    burger?.addEventListener('click', () => {
        burger.classList.toggle('open');
        mobileMenu?.classList.toggle('open');
    });

    // ── Project filter ────────────────
    const filterBtns = document.querySelectorAll('.filter-bar .filter-btn');
    const projectCards = document.querySelectorAll('#projectsGrid .project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;

            projectCards.forEach(card => {
                const tags = (card.dataset.tags || '').toLowerCase();
                const show = filter === 'tous' || tags.includes(filter.toLowerCase());

                if (show) {
                    card.classList.remove('hidden');
                    // Re-trigger reveal animation
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(14px)';
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        });
                    });
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ── Blog filter ───────────────────
    const blogFilterBtns = document.querySelectorAll('[data-blog-filter]');
    const blogCards = document.querySelectorAll('#blogGrid .blog-card');

    blogFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            blogFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.blogFilter;

            blogCards.forEach(card => {
                const cats = (card.dataset.blogCat || '').toLowerCase();
                const show = filter === 'tous' || cats.includes(filter.toLowerCase());

                if (show) {
                    card.classList.remove('hidden');
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(14px)';
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        });
                    });
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ── FAQ accordion ─────────────────
    document.querySelectorAll('.faq-item').forEach(item => {
        item.querySelector('.faq-q')?.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
            if (!isOpen) item.classList.add('open');
        });
    });

    // ── Contact form ──────────────────
    document.getElementById('contactForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('✅ Message envoyé ! Je vous répondrai bientôt.');
        e.target.reset();
    });

    // ── Toast ─────────────────────────
    const showToast = (msg) => {
        let toast = document.querySelector('.toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast';
            document.body.appendChild(toast);
        }
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3500);
    };

    // ── Scroll reveal (staggered) ─────
    const revealEls = document.querySelectorAll(
        '.project-card, .blog-card, .skill-block, .resource-card, ' +
        '.contact-card, .feature-item, .step-item, .sidebar-card, ' +
        '.skill-level-card, .mission-item, .stage-card, ' +
        '.annexe-banner, .projetpro-banner, .faq-item, .reveal'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.07, rootMargin: '0px 0px -24px 0px' });

    revealEls.forEach(el => {
        // Don't re-animate cards that were just filtered
        if (el.classList.contains('hidden')) return;

        const siblings = Array.from(el.parentElement?.children || [])
            .filter(c => c.classList.contains(el.classList[0]));
        const idx = siblings.indexOf(el);
        const delay = Math.min(idx * 0.07, 0.42);

        el.style.opacity = '0';
        el.style.transform = 'translateY(18px)';
        el.style.transition = `opacity 0.45s ease ${delay}s, transform 0.45s ease ${delay}s`;
        revealObserver.observe(el);
    });

    // ── Section titles reveal ─────────
    const sectionTitles = document.querySelectorAll('.section-title, .section-label, .section-desc');
    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                titleObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    sectionTitles.forEach((el, i) => {
        if (el.closest('#hero')) return; // Hero already animated by CSS
        el.style.opacity = '0';
        el.style.transform = 'translateY(14px)';
        el.style.transition = `opacity 0.4s ease ${i % 3 * 0.08}s, transform 0.4s ease ${i % 3 * 0.08}s`;
        titleObserver.observe(el);
    });

    // ── Skill bars animate on scroll ─
    const skillBars = document.querySelectorAll('.slc-fill');
    if (skillBars.length) {
        const barObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const targetWidth = bar.style.width; // e.g. "80%"
                    bar.style.width = '0%';
                    // Small delay so the reset registers
                    setTimeout(() => {
                        bar.style.transition = 'width 0.9s cubic-bezier(0.22, 1, 0.36, 1)';
                        bar.style.width = targetWidth;
                    }, 60);
                    barObserver.unobserve(bar);
                }
            });
        }, { threshold: 0.3 });

        skillBars.forEach(bar => barObserver.observe(bar));
    }


});
