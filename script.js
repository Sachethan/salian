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

// Toggle theme and store preference
document.getElementById('themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const theme = document.body.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
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

function goBack() {
  const loader = document.getElementById('loader');
  loader.classList.add('show');

  setTimeout(() => {
    if (history.length > 1) {
      history.back();
    } else {
      window.location.href = 'index.html'; // fallback if no history
    }
  }, 200);
}

  window.addEventListener("DOMContentLoaded", () => {
  const savedName = localStorage.getItem("userName");
  const savedEmail = localStorage.getItem("userEmail");

  if (savedName) {
    document.querySelector("input[name='name']").value = savedName;
    document.getElementById("userdisplay").textContent = savedName;
  }

  if (savedEmail) {
    document.querySelector("input[name='email']").value = savedEmail;
  }
      if (savedName && savedEmail) {
      document.getElementById("clearDataBtn").style.display = "inline-block";
    }
});

function cleardata() {
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    location.reload();
}

const serviceCards = document.querySelectorAll(".service-card");

  serviceCards.forEach(card => {
    card.addEventListener("click", () => {
      const serviceName = card.dataset.service;
      const message = `I need ${serviceName} service from your side, please reply to this`;
        const popup = document.getElementById("popupOverlay");
      const textarea = document.getElementById("requestInput");
      textarea.value = message;
        popup.style.display = "flex";
            });
  });

  function closePopup() {
    document.getElementById("popupOverlay").style.display = "none";
  }

