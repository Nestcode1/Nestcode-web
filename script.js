document.addEventListener('DOMContentLoaded', () => {
    // 1. Cambio de Tema (Modo Oscuro / Claro)
    const themeToggleBtn = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem('nestcode-theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    themeToggleBtn.textContent = savedTheme === 'dark' ? '🌙' : '☀️';

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('nestcode-theme', newTheme);
        themeToggleBtn.textContent = newTheme === 'dark' ? '🌙' : '☀️';
    });

    // 2. Menú Hamburguesa para Móviles
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('open');
            navLinks.classList.toggle('active');
        });

        // Cerrar menú al hacer clic en cualquier enlace
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

    // 4. Animación Fade-in al hacer Scroll (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in');
    const observerOptions = {
        threshold: 0.15
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        fadeObserver.observe(el);
    });

    // 5. Interactividad del Formulario de Contacto
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
                    throw new Error('Error en el servidor');
                }
            } catch (error) {
                formStatus.textContent = 'Hubo un error al enviar el mensaje. Inténtalo de nuevo.';
                formStatus.className = 'form-status error';
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Enviar Mensaje';
            }
        });
    }
});
