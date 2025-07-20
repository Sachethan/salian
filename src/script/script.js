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
window.addEventListener("DOMContentLoaded", () => {
  // Hide Elfsight branding
  hideElfsightBranding();

 const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbziNy-rYG9oWJSHkSvyytw09IYLIHoConrNLji_SCT8Jc99aUmmc9FC0e2Oyp7lI7CQ/exec";
const STORAGE_KEY = "hashConfigCache";

const hash = window.location.hash ? window.location.hash.slice(1) : "";
const isRootRedirect = hash.startsWith("root-");

function logProgress(msg, step) {
  const percent = step * 20;
  console.log(`[${percent}%] ${msg}`);
}

function getConfigMap(configs) {
  const map = {};
  for (const c of configs) {
    if (c.hash) map[String(c.hash).trim()] = c;
  }
  return map;
}

function processConfigs(configs) {
  const config = configs.find(c => String(c.hash).trim() === hash);
  if (!config) {
    logProgress(`Hash '${hash}' not found in config list.`, 2);
    loader.classList.add('show');
    return;
  }

  logProgress(`Hash '${hash}' found. Processing.`, 3);

  if (isRootRedirect && config.root) {
    const currentFile = window.location.pathname.split("/").pop();
    const targetFile = config.root.trim();
    if (currentFile !== targetFile) {
      logProgress(`Redirecting to ${targetFile}#${hash}`, 4);
      window.location.href = `${targetFile}#${hash}`;
      return;
    }
  }

  let blogUrl = "" + (config.root || "");
  if (config.templateId) {
    blogUrl += `?open=${encodeURIComponent(config.templateId)}`;
    if (config.url) {
      blogUrl += `&override=${encodeURIComponent(config.url)}`;
    }
  }

  logProgress("Calling loadPosterEditor with resolved blogUrl.", 5);
  if (loader) loader.classList.remove('show');
  loadPosterEditor(blogUrl);
}

// ✅ If no hash — show message
if (!hash) {
  logProgress("No #tag found. Showing default info message.", 1);
  showMessage(
    "<strong>Note:</strong> If you're a new user, please click to <a href='#' id='registerMessageLink'>Register</a>, if not then <a href='pages/login/login.html'>Login</a>.",
    "info"
  );
}

// ✅ Always show loader if first load or #root- present
let useLoader = false;
let useCache = true;

let cachedConfigs = [];
try {
  const cached = localStorage.getItem(STORAGE_KEY);
  if (cached) {
    cachedConfigs = JSON.parse(cached);
    logProgress("Loaded config from localStorage.", 2);
  } else {
    useLoader = true;
    useCache = false;
    logProgress("No localStorage found. Will fetch fresh data.", 1);
  }
} catch (e) {
  useLoader = true;
  useCache = false;
  logProgress("Invalid cache. Will fetch fresh data.", 1);
}

if (isRootRedirect) {
  useLoader = true;
  useCache = false;
  logProgress("Detected #root- tag. Forcing fresh fetch with loader.", 1);
}

if (useLoader && loader) {
  loader.classList.add('show');
}

// ✅ Step 1: Use cached config if allowed
if (useCache && hash) {
  processConfigs(cachedConfigs);
}

// ✅ Step 2: Fetch latest config from backend
fetch(SCRIPT_URL, { method: "GET", cache: "no-store" })
  .then(res => res.json())
  .then(json => {
    const latestConfigs = Array.isArray(json) ? json : (json.data || []);
    const newMap = getConfigMap(latestConfigs);
    const oldMap = getConfigMap(cachedConfigs);

    const newConfig = newMap[hash];
    const oldConfig = oldMap[hash];

    // Save fresh data
    localStorage.setItem(STORAGE_KEY, JSON.stringify(latestConfigs));

    if (useLoader) {
      logProgress("Loader-mode complete. Processing fresh config.", 4);
      processConfigs(latestConfigs);
    } else if (hash && JSON.stringify(newConfig) !== JSON.stringify(oldConfig)) {
      logProgress("Detected update to current #hash config.", 4);
      if (confirm("🔄 This section was updated. Reload page to apply changes?")) {
        location.reload();
      }
    } else {
      logProgress("No change in config or background sync complete.", 5);
      loader.classList.remove('show');
    }
  })
  .catch(err => {
    console.error("[ERROR] Fetch failed:", err);
    if (loader) loader.classList.remove('show');
  });

});  
  // Apply saved theme
  const savedTheme = localStorage.getItem("theme");
  const isDarkMode = savedTheme === "dark";
  document.body.classList.toggle("dark", isDarkMode);
  const toggle = document.getElementById("themeToggle");
  if (toggle) toggle.checked = isDarkMode;

    // Load saved name/email
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
    


// Toggle theme and save preference
toggle.addEventListener('change', () => {
  const isDark = toggle.checked;
  document.body.classList.toggle('dark', isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Send dark mode info to iframe
const gdrive = document.getElementById("scrollingIframe");
const youtubefrm = document.getElementById("youtubefrm");

const themeMessage = { theme: isDark ? "dark" : "light" };

if (gdrive && gdrive.contentWindow) {
  gdrive.contentWindow.postMessage(themeMessage, "*");
}

if (youtubefrm && youtubefrm.contentWindow) {
  youtubefrm.contentWindow.postMessage(themeMessage, "*");
}
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

  // Show popup
  document.getElementById("gdrive").addEventListener("click", function () {
    document.getElementById("popupOverlay").style.display = "flex";
  });

  // Close popup
  document.getElementById("closePopup").addEventListener("click", function () {
    document.getElementById("popupOverlay").style.display = "none";
  });