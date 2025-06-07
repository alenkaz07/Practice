(function() {
  if (!localStorage.getItem('users')) {
    const users = [
      {
        fullname: 'Администратор',
        email: 'admin@leshoz.gov.ru',
        password: 'admin',
        role: 'admin'
      },
      {
        fullname: 'Модератор',
        email: 'moderator@leshoz.gov.ru',
        password: 'moderator',
        role: 'moderator'
      },
      {
        fullname: 'Сотрудник',
        email: 'staff@leshoz.gov.ru',
        password: 'staff',
        role: 'staff'
      },
      {
        fullname: 'Пользователь',
        email: 'user@a.ru',
        password: 'user',
        role: 'user'
      }
    ];
    localStorage.setItem('users', JSON.stringify(users));
  }
})();


document.getElementById('login-form').onsubmit = function(e) {
  e.preventDefault();
  const email = this.email.value.trim();
  const password = this.password.value;

  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.email === email && u.password === password);

  const msg = document.getElementById('login-msg');
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = user.role === 'admin' ? 'admin-users.html' : 'profile.html';
  } else {
    msg.textContent = 'Неверный логин или пароль';
    msg.style.color = 'red';
  }
};
