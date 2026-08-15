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

  // 2. Menú Responsive Móvil
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.classList.toggle('open');
      navLinks.classList.toggle('active');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // 3. Barra de Progreso de Scroll
  const progressBar = document.getElementById('scrollProgressBar');

  if (progressBar) {
    window.addEventListener('scroll', () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        progressBar.style.width = `${progress}%`;
      }
    }, { passive: true });
  }

  // 4. Animación al Hacer Scroll
  const fadeElements = document.querySelectorAll('.fade-in');

  if (fadeElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.15 });

    fadeElements.forEach(element => observer.observe(element));
  }

  // 5. Efectos de Tarjetas (Tilt 3D & Mouse Tracker)
  const trackerCards = document.querySelectorAll('.tracker-card');
  const tiltCards = document.querySelectorAll('.tilt-card');
  const isMobile = window.innerWidth <= 768;

  trackerCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  if (!isMobile) {
    tiltCards.forEach(card => {
      let ticking = false;

      card.addEventListener('mousemove', (e) => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            ticking = false;
          });
          ticking = true;
        }
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });
  }

  // 6. Efecto Ripple
  const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-contacto-secundario, .theme-toggle-btn, .btn-auth-trigger');

  buttons.forEach(button => {
    button.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      this.appendChild(ripple);

      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      setTimeout(() => ripple.remove(), 600);
    });
  });

  // 7. Formulario con Formspree (AJAX)
  const contactoForm = document.getElementById('contactoForm');
  const submitBtn = document.getElementById('submitBtn');
  const formStatus = document.getElementById('formStatus');

  if (contactoForm && submitBtn && formStatus) {
    contactoForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      submitBtn.disabled = true;
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Enviando...';

      formStatus.className = 'form-status';
      formStatus.style.display = 'block';
      formStatus.textContent = '';

      const formData = new FormData(contactoForm);

      try {
        const response = await fetch(contactoForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          formStatus.textContent = '¡Gracias! Tu mensaje ha sido enviado correctamente.';
          formStatus.classList.add('success');
          contactoForm.reset();
        } else {
          const data = await response.json();
          if (data && data.errors) {
            formStatus.textContent = data.errors.map(error => error.message).join(", ");
          } else {
            formStatus.textContent = 'Ocurrió un error al enviar el formulario. Intenta nuevamente.';
          }
          formStatus.classList.add('error');
        }
      } catch (error) {
        formStatus.textContent = 'Error de conexión. Revisa tu red e inténtalo de nuevo.';
        formStatus.classList.add('error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
  }

  // 8. Modal de Acceso e Inyección para Alternar en Móvil
  const authModalOverlay = document.getElementById('authModalOverlay');
  const openAuthModalBtn = document.getElementById('openAuthModal');
  const closeAuthModalBtn = document.getElementById('closeAuthModal');
  const authContainer = document.getElementById('authContainer');
  const registerBtn = document.getElementById('registerBtn');
  const loginBtn = document.getElementById('loginBtn');

  const signInForm = document.querySelector('.auth-form-container.sign-in .auth-form');
  const signUpForm = document.querySelector('.auth-form-container.sign-up .auth-form');

  if (signInForm && !document.getElementById('mobileToSignUp')) {
    const btnSwitch = document.createElement('button');
    btnSwitch.id = 'mobileToSignUp';
    btnSwitch.type = 'button';
    btnSwitch.className = 'mobile-auth-switch';
    btnSwitch.textContent = '¿No tienes cuenta? Regístrate aquí';
    btnSwitch.addEventListener('click', () => authContainer.classList.add('active'));
    signInForm.appendChild(btnSwitch);
  }

  if (signUpForm && !document.getElementById('mobileToSignIn')) {
    const btnSwitch = document.createElement('button');
    btnSwitch.id = 'mobileToSignIn';
    btnSwitch.type = 'button';
    btnSwitch.className = 'mobile-auth-switch';
    btnSwitch.textContent = '¿Ya tienes cuenta? Inicia sesión';
    btnSwitch.addEventListener('click', () => authContainer.classList.remove('active'));
    signUpForm.appendChild(btnSwitch);
  }

  const closeModal = () => {
    if (authModalOverlay) {
      authModalOverlay.classList.remove('active');
    }
  };

  if (openAuthModalBtn && authModalOverlay) {
    openAuthModalBtn.addEventListener('click', () => {
      authModalOverlay.classList.add('active');
    });
  }

  if (closeAuthModalBtn) {
    closeAuthModalBtn.addEventListener('click', closeModal);
  }

  if (authModalOverlay) {
    authModalOverlay.addEventListener('click', (e) => {
      if (e.target === authModalOverlay) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && authModalOverlay && authModalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  if (registerBtn && authContainer) {
    registerBtn.addEventListener('click', () => authContainer.classList.add('active'));
  }

  if (loginBtn && authContainer) {
    loginBtn.addEventListener('click', () => authContainer.classList.remove('active'));
  }

});
