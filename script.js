document.addEventListener('DOMContentLoaded', () => {

  // 1. Barra de progreso de scroll
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (window.scrollY / windowHeight) * 100;
    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${progress}%`;
    }
  });

  // 2. Cambio de Tema (Oscuro / Claro)
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', newTheme);
      themeToggle.textContent = newTheme === 'dark' ? '🌙' : '☀️';
    });
  }

  // 3. Menú Hamburguesa Móvil
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // 4. Desplazamiento Suave (Scroll) y Cierre automático del menú móvil
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      // Oculta el menú desplegable en dispositivos móviles al hacer clic en una pestaña
      if (navLinks) {
        navLinks.classList.remove('active');
      }

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // 5. Modal de Autenticación con Transición Deslizable (Corregido)
  const authContainer = document.getElementById('authContainer');
  const registerBtn = document.getElementById('registerBtn');
  const loginBtn = document.getElementById('loginBtn');
  const openAuthModal = document.getElementById('openAuthModal');
  const closeAuthModal = document.getElementById('closeAuthModal');
  const authModalOverlay = document.getElementById('authModalOverlay');

  if (registerBtn && loginBtn && authContainer) {
    registerBtn.addEventListener('click', () => {
      authContainer.classList.add('active'); // Muestra el panel de registro deslizándose
    });

    loginBtn.addEventListener('click', () => {
      authContainer.classList.remove('active'); // Regresa al panel de inicio de sesión
    });
  }

  if (openAuthModal && authModalOverlay) {
    openAuthModal.addEventListener('click', () => {
      authModalOverlay.classList.add('active');
    });
  }

  if (closeAuthModal && authModalOverlay) {
    closeAuthModal.addEventListener('click', () => {
      authModalOverlay.classList.remove('active');
      authContainer.classList.remove('active');
    });
  }

  if (authModalOverlay) {
    authModalOverlay.addEventListener('click', (e) => {
      if (e.target === authModalOverlay) {
        authModalOverlay.classList.remove('active');
        authContainer.classList.remove('active');
      }
    });
  }

  // 6. Envío Asíncrono del Formulario (Formspree)
  const contactoForm = document.getElementById('contactoForm');
  const submitBtn = document.getElementById('submitBtn');
  const formStatus = document.getElementById('formStatus');

  if (contactoForm) {
    contactoForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(contactoForm);
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';
      formStatus.textContent = '';

      try {
        const response = await fetch(contactoForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          formStatus.style.color = '#22c55e';
          formStatus.textContent = '¡Mensaje enviado con éxito! Nos comunicaremos contigo pronto.';
          contactoForm.reset();
        } else {
          formStatus.style.color = '#ef4444';
          formStatus.textContent = 'Ocurrió un inconveniente al enviar el mensaje. Inténtalo de nuevo.';
        }
      } catch (error) {
        formStatus.style.color = '#ef4444';
        formStatus.textContent = 'Error de red. Verifica tu conexión.';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar Mensaje';
      }
    });
  }

});
