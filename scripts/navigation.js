const menuButton = document.getElementById('menu');
const nav = document.getElementById('navMenu');

menuButton.addEventListener('click', () => {
  nav.classList.toggle('open');
});