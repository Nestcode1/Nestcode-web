document.addEventListener('DOMContentLoaded', () => {
  // --- Elementos del DOM ---
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const themeToggle = document.getElementById('themeToggle');
  const progressBar = document.getElementById('progressBar');

  // Elementos del Modal de Clientes
  const openAuthModalBtn = document.getElementById('openAuthModal');
  const closeAuthModalBtn = document.getElementById('closeAuthModal');
  const authModalOverlay = document.getElementById('authModalOverlay');
  const authContainer = document.getElementById('authContainer');

  // Botones de alternancia Escritorio
  const signUpBtn = document.getElementById('signUpBtn');
  const signInBtn = document.getElementById('signInBtn');

  // Botones de alternancia Móvil
  const toSignUpMobile = document.getElementById('toSignUpMobile');
  const toSignInMobile = document.getElementById('toSignInMobile');

  // --- 1. MENÚ RESPONSIVE (MÓVIL) ---
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('open');
      navLinks.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        navLinks.classList.remove('active');
      });
    });
  }

  // --- 2. BARRA DE PROGRESO AL SCROLLEAR ---
  window.addEventListener('scroll', () => {
    if (progressBar) {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + '%';
    }
  });

  // --- 3. CAMBIO DE TEMA (DARK / LIGHT) ---
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      themeToggle.textContent = newTheme === 'light' ? '☀️' : '🌙';
    });
  }

  // --- 4. ABRIR Y CERRAR MODAL CLIENTES ---
  if (openAuthModalBtn && authModalOverlay) {
    openAuthModalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Cerrar menú móvil si está abierto
      if (navLinks) navLinks.classList.remove('active');
      if (menuToggle) menuToggle.classList.remove('open');
      
      authModalOverlay.classList.add('active');
    });
  }

  if (closeAuthModalBtn && authModalOverlay) {
    closeAuthModalBtn.addEventListener('click', () => {
      authModalOverlay.classList.remove('active');
    });
  }

  // Cerrar al hacer clic fuera del contenido del modal
  if (authModalOverlay) {
    authModalOverlay.addEventListener('click', (e) => {
      if (e.target === authModalOverlay) {
        authModalOverlay.classList.remove('active');
      }
    });
  }

  // --- 5. ALTERNAR ENTRE LOGIN Y REGISTRO ---
  // Escritorio
  if (signUpBtn && authContainer) {
    signUpBtn.addEventListener('click', () => {
      authContainer.classList.add('active');
    });
  }

  if (signInBtn && authContainer) {
    signInBtn.addEventListener('click', () => {
      authContainer.classList.remove('active');
    });
  }

  // Móvil
  if (toSignUpMobile && authContainer) {
    toSignUpMobile.addEventListener('click', () => {
      authContainer.classList.add('active');
    });
  }

  if (toSignInMobile && authContainer) {
    toSignInMobile.addEventListener('click', () => {
      authContainer.classList.remove('active');
    });
  }
});
