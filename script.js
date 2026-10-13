document.addEventListener('DOMContentLoaded', () => {
    // 1. Cambio de Tema (Modo Oscuro / Claro)
    const themeToggleBtn = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem('nestcode-theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    if (themeToggleBtn) {
        themeToggleBtn.textContent = savedTheme === 'dark' ? '🌙' : '☀️';
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('nestcode-theme', newTheme);
            themeToggleBtn.textContent = newTheme === 'dark' ? '🌙' : '☀️';
        });
    }

    // 2. Menú Hamburguesa para Móviles
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('open');
            navLinks.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('open');
                navLinks.classList.remove('active');
            });
        });
    }

    // 3. Barra de Progreso de Scroll
    const scrollProgressBar = document.getElementById('scrollProgressBar');
    if (scrollProgressBar) {
        window.addEventListener('scroll', () => {
            const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const currentScroll = window.scrollY;
            const progress = (currentScroll / totalHeight) * 100;
            scrollProgressBar.style.width = `${progress}%`;
        });
    }

    // 4. Animación Fade-in General para Secciones
    const fadeElements = document.querySelectorAll('.fade-in');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => fadeObserver.observe(el));

    // 5. Reinicio Automático de la Animación del Logo SVG al volver a Inicio
    const heroSection = document.getElementById('inicio');
    const animatedLogoSvg = document.querySelector('.animated-logo-svg');

    if (heroSection && animatedLogoSvg) {
        const logoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Reiniciar ciclo de animación quitando y volviendo a poner la clase .animate
                    animatedLogoSvg.classList.remove('animate');
                    void animatedLogoSvg.offsetWidth; // Forzar reflujo
                    setTimeout(() => {
                        animatedLogoSvg.classList.add('animate');
                    }, 50);
                }
            });
        }, { threshold: 0.2 });

        logoObserver.observe(heroSection);
    }

    // 6. Formulario de Contacto
    const contactoForm = document.getElementById('contactoForm');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');

    if (contactoForm) {
        contactoForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';

            const formData = new FormData(contactoForm);

            try {
                const response = await fetch(contactoForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    formStatus.textContent = '¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.';
                    formStatus.className = 'form-status success';
                    contactoForm.reset();
                } else {
                    throw new Error('Error al procesar el mensaje');
                }
            } catch (error) {
                formStatus.textContent = 'Hubo un problema al enviar el mensaje. Inténtalo de nuevo.';
                formStatus.className = 'form-status error';
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Enviar Mensaje';
            }
        });
    }
});
