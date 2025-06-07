const user = JSON.parse(localStorage.getItem('currentUser'));
const profileDiv = document.getElementById('profile-info');
if (!user) {
  profileDiv.textContent = 'Вы не авторизованы!';
} else {
  profileDiv.innerHTML = `
    <b>ФИО:</b> ${user.fullname}<br>
    <b>E-mail:</b> ${user.email}<br>
    <b>Роль:</b> ${user.role}
  `;
}
document.getElementById('logout-btn').onclick = () => {
  localStorage.removeItem('currentUser');
  location.href = 'login.html';
};
