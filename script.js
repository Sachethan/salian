let navOpen = false;

function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  navOpen = !navOpen;
  navLinks.classList.toggle('show', navOpen);
}

// Hide menu when clicking outside
document.addEventListener('click', function (e) {
  const nav = document.querySelector('nav');
  const toggle = document.querySelector('.menu-toggle');
  const links = document.getElementById('navLinks');

  if (
    navOpen &&
    !nav.contains(e.target) &&
    !toggle.contains(e.target)
  ) {
    links.classList.remove('show');
    navOpen = false;
  }
});

// Hide menu when clicking a nav link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('show');
    navOpen = false;
  });
});

// Function to apply theme on page load
window.addEventListener('DOMContentLoaded', () => {
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'dark') {
    document.body.classList.add('dark');
  }
});

// Toggle theme and store preference
document.getElementById('themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const theme = document.body.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
});

