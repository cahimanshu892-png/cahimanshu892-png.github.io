// ===================================
// CA Himanshu Gupta — Website Scripts
// ===================================

document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    const handleScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // --- Mobile Nav Toggle ---
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('navOverlay');

    const closeNav = () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navOverlay.classList.remove('active');
    };

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        navOverlay.classList.toggle('active');
    });

    navOverlay.addEventListener('click', closeNav);

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeNav);
    });

    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            closeNav();
        }
    });

    // --- Active Nav Link on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const updateActiveLink = () => {
        const scrollPos = window.scrollY + 120;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    window.addEventListener('scroll', updateActiveLink, { passive: true });

    // --- Back to Top Button ---
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- Scroll Reveal Animation ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll(
        '.service-card, .why-card, .pain-card, .about-card, .contact-card, .contact-form-wrapper, .process-step'
    ).forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Staggered animation for grid items
    document.querySelectorAll('.services-grid, .why-grid, .pain-grid, .process-steps').forEach(grid => {
        Array.from(grid.children).forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
        });
    });

    // --- Counter Animation ---
    const animateCounters = () => {
        document.querySelectorAll('.stat-number').forEach(counter => {
            const text = counter.textContent;
            const match = text.match(/(\d+)/);
            if (!match) return;
            const target = parseInt(match[0]);
            const suffix = text.replace(match[0], '');
            let current = 0;
            const increment = Math.max(1, Math.floor(target / 40));
            const stepTime = 1500 / Math.ceil(target / increment);
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) { current = target; clearInterval(timer); }
                counter.textContent = current + suffix;
            }, stepTime);
        });
    };

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                statsObserver.unobserve(heroStats);
            }
        }, { threshold: 0.5 });
        statsObserver.observe(heroStats);
    }
});

// --- Contact Form Handler (WhatsApp) ---
function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const service = formData.get('service');
    const message = formData.get('message') || '';

    const serviceLabels = {
        itr: 'Income Tax & ITR Filing',
        gst: 'GST Registration & Returns',
        audit: 'Audit & Assurance',
        registration: 'Company/LLP Registration',
        bookkeeping: 'Accounting & Bookkeeping',
        tds: 'TDS/TCS Compliance',
        advisory: 'Business Advisory',
        other: 'Other'
    };

    const whatsappMsg = encodeURIComponent(
        `Hi CA Himanshu,\n\n` +
        `I'm ${name} and I need help with *${serviceLabels[service] || service}*.\n` +
        `${message ? `\nDetails: ${message}\n` : ''}` +
        `\nPhone: ${phone}\n\nLooking forward to hearing from you!`
    );

    form.parentElement.innerHTML = `
        <div class="form-success fade-in visible">
            <i class="fas fa-check-circle"></i>
            <h3>Redirecting to WhatsApp!</h3>
            <p>You'll be connected with CA Himanshu Gupta shortly.</p>
        </div>
    `;

    setTimeout(() => {
        window.open(`https://wa.me/917042070366?text=${whatsappMsg}`, '_blank');
    }, 800);
}
