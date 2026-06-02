const FORM_ENDPOINT = 'https://formspree.io/f/mgobwvje';

const INFO_CONTENT = {
    franquicias: {
        subtitle: 'División Retail',
        title: 'Gestión de Franquicias',
        tags: ['Entel Perú', 'Retail', 'Operación nacional'],
        body: [
            'Somos operadores estratégicos de canales de venta para Entel Perú, con más de una década de experiencia gestionando puntos de venta a nivel nacional.',
            'Administramos tiendas comerciales, islas en centros comerciales y formatos puerta a calle, garantizando los estándares de marca, la atención al cliente y el cumplimiento de metas comerciales.'
        ],
        highlights: [
            'Reclutamiento y capacitación de personal de ventas',
            'Supervisión de inventario y reportes de gestión',
            'Presencia en los principales centros comerciales del país',
            'Equipo de más de 300 colaboradores en operación'
        ]
    },
    amet: {
        subtitle: 'Para cadenas de retail',
        title: 'Servicio Integrado de Instalación de Láminas',
        tags: ['Operación completa', 'Láminas AMET', 'Multidispositivo'],
        body: [
            'Amet 360 permite que tu tienda venda láminas protectoras de pantalla como servicio adicional. Ofrecemos máquinas de corte con láminas propias y una línea de cases, todo diseñado para adaptarse a la medida exacta de cada dispositivo.',
            'Compatible con smartphones, smartwatches, iPads y tablets. Instalamos la máquina en tu local, capacitamos a tu equipo de ventas, gestionamos la postventa y asumimos la garantía. Tú generas ingresos; nosotros operamos el servicio de punta a punta.'
        ],
        highlights: [
            'Láminas AMET para smartphones, tablets, iPads y smartwatches',
            'Máquinas de corte de láminas a medida para cada dispositivo',
            'Instalación del equipo y puesta en marcha en tu tienda',
            'Capacitación continua para tu personal de ventas',
            '+15,000 láminas instaladas al mes en todo el Perú'
        ]
    },
    distribucion: {
        subtitle: 'Importación y distribución',
        title: 'Distribución B2B',
        tags: ['ZAGG', 'Mophie', 'Acefast', 'Choetech'],
        body: [
            'Importamos y distribuimos accesorios tecnológicos de marcas líderes a nivel mundial, incluyendo ZAGG, Mophie, Acefast y Choetech.',
            'Abastecemos a las principales cadenas de retail del Perú con un portafolio de productos de alta rotación: cargadores, protectores, audífonos y accesorios para dispositivos móviles.'
        ],
        highlights: [
            'Representación oficial de marcas globales',
            'Abastecimiento mayorista a cadenas retail',
            'Portafolio de alta rotación en tecnología móvil',
            'Tienda online VP Trends para consumidor final'
        ]
    }
};

const contactModal = document.getElementById('contact-modal');
const infoModal = document.getElementById('info-modal');
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
const submitBtn = document.getElementById('submit-btn');
const infoTitle = document.getElementById('info-modal-title');
const infoSubtitle = document.getElementById('info-modal-subtitle');
const infoBody = document.getElementById('info-modal-body');
const infoTags = document.getElementById('info-modal-tags');
const infoHighlights = document.getElementById('info-modal-highlights');

function getOpenModal() {
    if (!contactModal.classList.contains('hidden')) return contactModal;
    if (!infoModal.classList.contains('hidden')) return infoModal;
    return null;
}

function lockBody() {
    document.body.style.overflow = 'hidden';
}

function unlockBody() {
    document.body.style.overflow = '';
}

function openContactModal() {
    if (!infoModal.classList.contains('hidden')) {
        closeInfoModal();
    }
    closeMobileMenu();
    contactModal.classList.remove('hidden');
    contactModal.setAttribute('aria-hidden', 'false');
    lockBody();
    document.getElementById('nombres').focus();
}

function closeContactModal() {
    contactModal.classList.add('hidden');
    contactModal.setAttribute('aria-hidden', 'true');
    if (infoModal.classList.contains('hidden')) {
        unlockBody();
    }
}

function openInfoModal(key) {
    const content = INFO_CONTENT[key];
    if (!content) return;

    infoSubtitle.textContent = content.subtitle || '';
    infoTitle.textContent = content.title;
    infoBody.innerHTML = content.body.map(function (paragraph) {
        return '<p>' + paragraph + '</p>';
    }).join('');

    infoTags.innerHTML = (content.tags || []).map(function (tag) {
        return '<span class="inline-block text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full bg-blue-50 vp-blue">' + tag + '</span>';
    }).join('');

    infoHighlights.innerHTML = (content.highlights || []).map(function (item) {
        return '<li class="flex items-start gap-2"><span class="text-green-500 mt-0.5 shrink-0">✓</span><span>' + item + '</span></li>';
    }).join('');

    infoModal.classList.remove('hidden');
    infoModal.setAttribute('aria-hidden', 'false');
    lockBody();
}

function closeInfoModal() {
    infoModal.classList.add('hidden');
    infoModal.setAttribute('aria-hidden', 'true');
    if (contactModal.classList.contains('hidden')) {
        unlockBody();
    }
}

function showMessage(text, isError) {
    formMessage.textContent = text;
    formMessage.className = 'text-sm ' + (isError ? 'text-red-600' : 'text-green-600');
    formMessage.classList.remove('hidden');
}

document.querySelectorAll('[data-open-contact]').forEach(function (btn) {
    btn.addEventListener('click', openContactModal);
});

document.querySelectorAll('[data-close-contact]').forEach(function (el) {
    el.addEventListener('click', closeContactModal);
});

document.querySelectorAll('[data-open-info]').forEach(function (btn) {
    btn.addEventListener('click', function () {
        openInfoModal(btn.getAttribute('data-open-info'));
    });
});

document.querySelectorAll('[data-close-info]').forEach(function (el) {
    el.addEventListener('click', closeInfoModal);
});

document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (!contactModal.classList.contains('hidden')) closeContactModal();
    else if (!infoModal.classList.contains('hidden')) closeInfoModal();
});

contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    if (FORM_ENDPOINT.includes('TU_FORM_ID_AQUI')) {
        showMessage('Configura FORM_ENDPOINT en js/main.js con tu ID de Formspree antes de publicar.', true);
        return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
    formMessage.classList.add('hidden');

    const payload = {
        nombres: contactForm.nombres.value.trim(),
        apellidos: contactForm.apellidos.value.trim(),
        telefono: contactForm.telefono.value.trim(),
        correo: contactForm.correo.value.trim(),
        _subject: 'Nuevo contacto desde vpmobile.pe'
    };

    try {
        const response = await fetch(FORM_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            contactForm.reset();
            showMessage('¡Gracias! Recibimos tu información. Te contactaremos pronto.', false);
            setTimeout(closeContactModal, 2500);
        } else {
            showMessage('No pudimos enviar el formulario. Intenta de nuevo o escríbenos directamente.', true);
        }
    } catch (err) {
        showMessage('Error de conexión. Verifica tu internet e intenta nuevamente.', true);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar mensaje';
    }
});

function formatNumber(value, useComma) {
    if (!useComma) return String(value);
    return value.toLocaleString('es-PE');
}

function animateCounter(element) {
    const target = parseInt(element.dataset.target, 10);
    const prefix = element.dataset.prefix || '';
    const suffix = element.dataset.suffix || '';
    const useComma = element.dataset.comma === 'true';
    const duration = 1800;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(target * eased);

        element.textContent = prefix + formatNumber(current, useComma) + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        observer.unobserve(entry.target);
    });
}, { threshold: 0.4 });

document.querySelectorAll('[data-counter]').forEach(function (counter) {
    counterObserver.observe(counter);
});

const animateObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const delay = parseInt(el.dataset.animateDelay || '0', 10) * 120;
        setTimeout(function () {
            el.classList.add('is-visible');
        }, delay);
        animateObserver.unobserve(el);
    });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-animate]').forEach(function (el) {
    animateObserver.observe(el);
});

const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

function closeMobileMenu() {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.classList.remove('is-open');
    mobileMenu.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menú');
}

function openMobileMenu() {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.classList.add('is-open');
    mobileMenu.classList.add('is-open');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Cerrar menú');
}

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function () {
        if (mobileMenu.classList.contains('is-open')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth >= 768) {
            closeMobileMenu();
        }
        updateNavHeight();
    });
}

function updateNavHeight() {
    const nav = document.querySelector('nav');
    if (nav) {
        document.documentElement.style.setProperty('--nav-height', nav.offsetHeight + 'px');
    }
}

function getNavOffset() {
    const nav = document.querySelector('nav');
    return (nav ? nav.offsetHeight : 64) + 12;
}

function scrollToSection(target) {
    const top = window.scrollY + target.getBoundingClientRect().top - getNavOffset();
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
}

function handleAnchorClick(e, link) {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    const id = href.slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();

    const menuWasOpen = mobileMenu && mobileMenu.classList.contains('is-open');

    if (menuWasOpen) {
        closeMobileMenu();
        setTimeout(function () {
            updateNavHeight();
            scrollToSection(target);
        }, 380);
    } else {
        scrollToSection(target);
    }
}

document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
        handleAnchorClick(e, link);
    });
});

updateNavHeight();
window.addEventListener('load', updateNavHeight);

if (window.location.hash) {
    window.addEventListener('load', function () {
        const target = document.getElementById(window.location.hash.slice(1));
        if (target) {
            setTimeout(function () {
                updateNavHeight();
                scrollToSection(target);
            }, 100);
        }
    });
}
