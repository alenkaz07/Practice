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

  // Динамический профиль войти
  const profileNav = document.getElementById('profile-nav');
  if (profileNav) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    let prefix = '';
    // /articles/
    if (location.pathname.includes('/articles/')) {
      prefix = '../';
    }

    if (currentUser) {
      profileNav.innerHTML = `
        <a href="${prefix}${currentUser.role === 'admin' ? 'admin-users.html' : 'profile.html'}" class="profile-link" title="Личный кабинет">
          <svg width="22" height="22" viewBox="0 0 22 22" style="vertical-align:middle; margin-right:5px;"><circle cx="11" cy="7.5" r="5" fill="#2e7d32"/><ellipse cx="11" cy="17" rx="7" ry="4" fill="#a5d6a7"/></svg>
          ${currentUser.fullname ? currentUser.fullname.split(' ')[0] : 'Профиль'}
        </a>
        <a href="#" id="logout-link" class="profile-link" style="margin-left:10px;">Выйти</a>
      `;
      document.getElementById('logout-link').onclick = function(e) {
        e.preventDefault();
        localStorage.removeItem('currentUser');
        // Если в подпапке, после выхода возврат на главную
        if (prefix) {
          window.location.href = '../index.html';
        } else {
          window.location.reload();
        }
      }
    } else {
      profileNav.innerHTML = `<a href="${prefix}login.html" class="profile-link">Войти</a>`;
    }
  }
});
