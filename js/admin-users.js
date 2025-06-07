const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser || currentUser.role !== 'admin') {
  alert('Доступ только для администратора!');
  location.href = 'login.html';
}
function renderUsers() {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const table = document.getElementById('users-table');
  table.innerHTML = `<tr>
    <th>ФИО</th><th>Email</th><th>Роль</th><th>Удалить</th>
  </tr>` +
    users.map((u, i) =>
      `<tr>
        <td>${u.fullname}</td>
        <td>${u.email}</td>
        <td>${u.role}</td>
        <td><button onclick="deleteUser(${i})">X</button></td>
      </tr>`
    ).join('');
}
window.deleteUser = function(index) {
  let users = JSON.parse(localStorage.getItem('users') || '[]');
  users.splice(index, 1);
  localStorage.setItem('users', JSON.stringify(users));
  renderUsers();
}
document.getElementById('create-user-form').onsubmit = function(e) {
  e.preventDefault();
  const fullname = this.fullname.value.trim();
  const email = this.email.value.trim().toLowerCase();
  const password = this.password.value;
  const role = this.role.value;
  let users = JSON.parse(localStorage.getItem('users') || '[]');
  if (users.find(u => u.email === email)) {
    document.getElementById('admin-msg').textContent = 'Такой email уже существует!';
    return;
  }
  users.push({fullname, email, password, role});
  localStorage.setItem('users', JSON.stringify(users));
  document.getElementById('admin-msg').textContent = 'Пользователь создан!';
  renderUsers();
  this.reset();
};
document.getElementById('logout-btn').onclick = () => {
  localStorage.removeItem('currentUser');
  location.href = 'login.html';
};
renderUsers();
