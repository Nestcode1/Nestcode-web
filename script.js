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

  // 3. Menú Hamburguesa Móvil y Cierre Automático
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // 4. Modal de Autenticación con Transición Deslizable
  const authContainer = document.getElementById('authContainer');
  const registerBtn = document.getElementById('registerBtn');
  const loginBtn = document.getElementById('loginBtn');
  const openAuthModal = document.getElementById('openAuthModal');
  const closeAuthModal = document.getElementById('closeAuthModal');
  const authModalOverlay = document.getElementById('authModalOverlay');

  if (registerBtn && loginBtn && authContainer) {
    registerBtn.addEventListener('click', () => {
      authContainer.classList.add('active');
    });

    loginBtn.addEventListener('click', () => {
      authContainer.classList.remove('active');
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
      authContainer.classList.remove('active'); // Restablece la vista predeterminada
    });
  }

  // Cierre del modal al dar clic fuera del recuadro
  if (authModalOverlay) {
    authModalOverlay.addEventListener('click', (e) => {
      if (e.target === authModalOverlay) {
        authModalOverlay.classList.remove('active');
        authContainer.classList.remove('active');
      }
    });
  }

  // 5. Envío Asíncrono del Formulario (Formspree)
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
