function hideElfsightBranding() {
    const badge = document.querySelector('a[href*="elfsight.com"]');
    if (badge) {
      badge.remove(); // Or badge.style.display = "none";
    } else {
      setTimeout(hideElfsightBranding, 500); // Retry after 500ms
    }
  }

  // Start checking once the page loads
  window.addEventListener("DOMContentLoaded", hideElfsightBranding);
  
  // Keep checking every few seconds in case it's added later
  setInterval(hideElfsightBranding, 3000);

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

const toggle = document.getElementById('themeToggle');

// Load theme and update switch on page load
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  const isDarkMode = savedTheme === 'dark';

  document.body.classList.toggle('dark', isDarkMode);
  toggle.checked = isDarkMode;
});

// Toggle theme and save preference
toggle.addEventListener('change', () => {
  const isDark = toggle.checked;
  document.body.classList.toggle('dark', isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});




// loader.js
function navigateWithLoader(url, delay = 800) {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.classList.add('show');
    setTimeout(() => {
      window.location.href = url;
    }, delay);
  } else {
    window.location.href = url;
  }
}


  window.addEventListener("DOMContentLoaded", () => {
  const savedName = localStorage.getItem("username");
      const savedEmail = localStorage.getItem("userEmail");

  if (savedName) {
    document.querySelector("input[name='name']").value = savedName;
    document.getElementById("userdisplay").textContent = savedName;
    document.getElementById("userPname").textContent = savedName;
  }

  if (savedEmail) {
    document.querySelector("input[name='email']").value = savedEmail;
  }
});


  function closePopup() {
    document.getElementById("popupOverlay").style.display = "none";
  }


