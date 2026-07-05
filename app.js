document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            const isOpen = mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('open');
            document.body.classList.toggle('menu-open', isOpen);
        });
        
        // Close menu when a link is clicked
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('open');
                document.body.classList.remove('menu-open');
            });
        });
    }
    
    // --- Animated Counters (Impact Metrics & Toolkit Visual Metrics) ---
    const countUp = (element, target) => {
        let current = 0;
        const duration = 1500;
        const absTarget = Math.abs(target);
        const increment = Math.ceil(absTarget / (duration / 16));
        const originalText = element.textContent.trim();
        const hasPercent = originalText.includes('%') || element.classList.contains('prof-val');
        const hasPlus = originalText.includes('+');
        const isNegative = target < 0;
        
        const updateCount = () => {
            current += increment;
            if (current >= absTarget) {
                let suffix = '';
                if (hasPercent) suffix = '%';
                else if (hasPlus) suffix = '+';
                
                let prefix = '';
                if (isNegative) prefix = '-';
                
                element.textContent = prefix + absTarget + suffix;
            } else {
                let suffix = '';
                if (hasPercent) suffix = '%';
                else if (hasPlus) suffix = '+';
                
                let prefix = '';
                if (isNegative) prefix = '-';
                
                element.textContent = prefix + current + suffix;
                requestAnimationFrame(updateCount);
            }
        };
        requestAnimationFrame(updateCount);
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetEl = entry.target.querySelector('.stat-pct') || entry.target.querySelector('.metric-num') || entry.target.querySelector('.toolkit-stat-num');
                if (targetEl) {
                    const rawTarget = targetEl.getAttribute('data-target');
                    const cleanTarget = parseInt(rawTarget.replace(/[+-]/g, ''), 10);
                    countUp(targetEl, cleanTarget);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.stat-card, .metric-card, .toolkit-stat-card, .trust-indicator').forEach(card => {
        counterObserver.observe(card);
    });

    // --- Proficiency Progress Bars Observer ---
    const profBars = document.querySelectorAll('.prof-bar-item');
    if (profBars.length > 0) {
        const profObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const barItem = entry.target;
                    const fill = barItem.querySelector('.prof-bar-fill');
                    if (fill) {
                        fill.style.width = fill.getAttribute('data-width');
                    }
                    
                    const valEl = barItem.querySelector('.prof-val');
                    if (valEl) {
                        const targetVal = parseInt(valEl.getAttribute('data-target'), 10);
                        countUp(valEl, targetVal);
                    }
                    observer.unobserve(barItem);
                }
            });
        }, { threshold: 0.1 });
        
        profBars.forEach(bar => profObserver.observe(bar));
    }
    
    // --- Contact Form Submission Handling ---
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm && formSuccess) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Collect Form Data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            console.log('Sending message:', formData);
            
            // Display visual success toast
            contactForm.classList.add('hidden');
            formSuccess.classList.remove('hidden');
            
            // Optional: simulate reset/re-show after some time or keep thank you
        });
    }
    
    // --- Scrolled Navbar Shadow & Backdrop Blur ---
    const navbar = document.getElementById('navbar');
    
    function checkScroll() {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Run on load in case page is refreshed scrolled down
    
    // --- Dynamic Navigation Active Link on Scroll ---
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 150; // offset for nav header height and breathing room
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < (sectionTop + sectionHeight)) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href.endsWith(`#${currentSectionId}`) || href === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
    
    // --- Footer Copyright Year ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    // --- Case Study Active TOC Link highlighting ---
    const tocLinks = document.querySelectorAll('.toc-link');
    const csSections = document.querySelectorAll('.cs-section');
    
    if (tocLinks.length > 0 && csSections.length > 0) {
        const csObserverOptions = {
            root: null,
            rootMargin: '0px 0px -60% 0px', // Trigger when section is in top half
            threshold: 0
        };
        
        const csObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const activeId = entry.target.getAttribute('id');
                    
                    tocLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${activeId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, csObserverOptions);
        
        csSections.forEach(sec => csObserver.observe(sec));
    }
    
    // --- Case Study Lightbox Gallery Interactivity ---
    const lightboxOverlay = document.getElementById('lightboxOverlay');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const triggers = document.querySelectorAll('.main-lightbox-trigger');
    
    if (lightboxOverlay && lightboxImg && triggers.length > 0) {
        triggers.forEach(img => {
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightboxOverlay.classList.remove('hidden');
                lightboxOverlay.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden'; // Stop page scroll
            });
        });
        
        const closeLightbox = () => {
            lightboxOverlay.classList.add('hidden');
            lightboxOverlay.setAttribute('aria-hidden', 'true');
            lightboxImg.src = '';
            document.body.style.overflow = ''; // Re-enable scroll
        };
        
        lightboxClose.addEventListener('click', closeLightbox);
        lightboxOverlay.addEventListener('click', (e) => {
            if (e.target === lightboxOverlay) {
                closeLightbox();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !lightboxOverlay.classList.contains('hidden')) {
                closeLightbox();
            }
        });
    }
    // --- Resume Tab Switcher ---
    const resumeTabBtns = document.querySelectorAll('.resume-tab-btn');
    const resumeTabContents = document.querySelectorAll('.resume-tab-content');
    
    if (resumeTabBtns.length > 0 && resumeTabContents.length > 0) {
        resumeTabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                resumeTabBtns.forEach(b => b.classList.remove('active'));
                resumeTabContents.forEach(c => c.classList.remove('active'));
                
                btn.classList.add('active');
                const targetId = btn.getAttribute('data-tab');
                const targetContent = document.getElementById(targetId);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }
    
    // --- Mouse Parallax on Hero Portrait & Skill Chips ---
    const heroSection = document.querySelector('.hero, .about-hero');
    const portraitFrame = document.querySelector('.portrait-frame');
    const floatingChips = document.querySelectorAll('.floating-chip');
    
    if (heroSection && portraitFrame && floatingChips.length > 0) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left - (rect.width / 2);
            const y = e.clientY - rect.top - (rect.height / 2);
            
            const normX = x / (rect.width / 2);
            const normY = y / (rect.height / 2);
            
            portraitFrame.style.transform = `translate(${normX * 8}px, ${normY * 8}px) rotateY(${normX * -6}deg) rotateX(${normY * 6}deg)`;
            
            floatingChips.forEach((chip, index) => {
                const depth = (index % 3 + 1) * 6;
                const chipX = normX * depth;
                const chipY = normY * depth;
                chip.style.transform = `translate(${chipX}px, ${chipY}px)`;
            });
        });
        
        heroSection.addEventListener('mouseleave', () => {
            portraitFrame.style.transform = 'translate(0px, 0px) rotateY(0deg) rotateX(0deg)';
            floatingChips.forEach(chip => {
                chip.style.transform = 'translate(0px, 0px)';
            });
        });
    }

    // --- Back to Top Smooth Scroll ---
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- Smooth Page Transition Animations ---
    const animatedLinks = document.querySelectorAll('a[href$=".html"], a.work-card, a.btn');
    animatedLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('mailto:') || href.startsWith('http') || href.startsWith('#')) return;

        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.body.classList.add('page-transition-active');
            setTimeout(() => {
                window.location.href = href;
            }, 350);
        });
    });

    // --- Premium Footer Interactions ---
    const footer = document.querySelector('.footer-premium');
    if (footer) {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Entrance reveal: fade/slide up the three columns once, staggered via CSS transition-delay
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    footer.classList.add('is-revealed');
                    initFooterEffects(); // lazy-init decorative effects only once footer is actually in view
                    observer.disconnect();
                }
            });
        }, { threshold: 0.15 });
        revealObserver.observe(footer);

        let effectsInitialized = false;
        function initFooterEffects() {
            if (effectsInitialized) return;
            effectsInitialized = true;

            if (reducedMotion) return; // skip all decorative motion for reduced-motion users

            spawnParticles();
            setupSpotlight();
            setupMagnetic();
        }

        // Floating particles (~5% opacity, slow drift), generated once and lazily
        function spawnParticles() {
            const field = document.getElementById('footerParticles');
            if (!field) return;
            const count = 14;
            for (let i = 0; i < count; i++) {
                const p = document.createElement('span');
                p.className = 'footer-particle';
                p.style.left = `${Math.random() * 100}%`;
                p.style.top = `${Math.random() * 100}%`;
                p.style.animationDuration = `${8 + Math.random() * 10}s`;
                p.style.animationDelay = `${Math.random() * 6}s`;
                field.appendChild(p);
            }
        }

        // Cursor spotlight: soft radial glow follows the pointer within the footer
        function setupSpotlight() {
            const spotlight = document.getElementById('footerSpotlight');
            if (!spotlight) return;
            let ticking = false;
            let lastX = 0.5, lastY = 0.3;

            footer.addEventListener('mousemove', (e) => {
                const rect = footer.getBoundingClientRect();
                lastX = ((e.clientX - rect.left) / rect.width) * 100;
                lastY = ((e.clientY - rect.top) / rect.height) * 100;
                if (!ticking) {
                    requestAnimationFrame(() => {
                        spotlight.style.setProperty('--spot-x', `${lastX}%`);
                        spotlight.style.setProperty('--spot-y', `${lastY}%`);
                        ticking = false;
                    });
                    ticking = true;
                }
            });
        }

        // Magnetic hover: buttons/icons drift subtly toward the cursor within their own bounds
        function setupMagnetic() {
            const magnets = footer.querySelectorAll('.magnetic');
            const strength = 0.25;
            magnets.forEach(el => {
                let ticking = false;
                let offsetX = 0, offsetY = 0;

                el.addEventListener('mousemove', (e) => {
                    const rect = el.getBoundingClientRect();
                    offsetX = (e.clientX - rect.left - rect.width / 2) * strength;
                    offsetY = (e.clientY - rect.top - rect.height / 2) * strength;
                    if (!ticking) {
                        requestAnimationFrame(() => {
                            el.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
                            ticking = false;
                        });
                        ticking = true;
                    }
                });

                el.addEventListener('mouseleave', () => {
                    el.style.transform = '';
                });
            });
        }

        // Ripple feedback on click for footer buttons and social icons
        footer.querySelectorAll('.btn-footer, .back-to-top-pill, .footer-social-icon').forEach(el => {
            el.style.position = el.style.position || 'relative';
            el.style.overflow = 'hidden';
            el.addEventListener('click', (e) => {
                if (reducedMotion) return;
                const rect = el.getBoundingClientRect();
                const ripple = document.createElement('span');
                const size = Math.max(rect.width, rect.height) * 1.4;
                ripple.className = 'footer-ripple';
                ripple.style.width = ripple.style.height = `${size}px`;
                ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
                ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
                el.appendChild(ripple);
                ripple.addEventListener('animationend', () => ripple.remove());
            });
        });
    }
});


