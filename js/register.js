document.getElementById('register-form').onsubmit = function(e) {
  e.preventDefault();
  const fullname = this.fullname.value.trim();
  const email = this.email.value.trim().toLowerCase();
  const password = this.password.value;
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  // Проверка на уникальность email
  if (users.find(u => u.email === email)) {
    document.getElementById('register-msg').textContent = 'Пользователь с таким e-mail уже зарегистрирован!';
    return;
  }
  // Создать нового пользователя (роль user по умолчанию)
  users.push({fullname, email, password, role: 'user'});
  localStorage.setItem('users', JSON.stringify(users));
  document.getElementById('register-msg').textContent = 'Регистрация успешна! Теперь вы можете войти.';
  this.reset();
};
