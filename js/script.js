document.addEventListener('DOMContentLoaded', () => {
  // Бургер меню
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      if (mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
        mainNav.classList.add('closed');
        navToggle.setAttribute('aria-label', 'Открыть меню');
      } else {
        mainNav.classList.add('open');
        mainNav.classList.remove('closed');
        navToggle.setAttribute('aria-label', 'Закрыть меню');
      }
    });

    // На больших экранах меню всегда видно
    const checkDesktopMenu = () => {
      if (window.innerWidth > 768) {
        mainNav.classList.remove('open', 'closed');
      } else {
        if (!mainNav.classList.contains('open')) {
          mainNav.classList.add('closed');
        }
      }
    };
    window.addEventListener('resize', checkDesktopMenu);
    checkDesktopMenu();
  }

    // Версия для слабовидящих
    const accessibilityToggleTop = document.getElementById('accessibilityToggleTop');
    if (accessibilityToggleTop) {
      accessibilityToggleTop.addEventListener('click', function () {
        document.body.classList.toggle('visually-impaired');
        if (document.body.classList.contains('visually-impaired')) {
          localStorage.setItem('visuallyImpaired', 'yes');
          this.textContent = 'Версия стандартная';
        } else {
          localStorage.removeItem('visuallyImpaired');
          this.textContent = 'Версия для слабовидящих';
        }
      });
      if (localStorage.getItem('visuallyImpaired') === 'yes') {
        document.body.classList.add('visually-impaired');
        accessibilityToggleTop.textContent = 'Версия стандартная';
      }
    }
});
