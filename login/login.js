if (localStorage.getItem('isLoggedIn')) {
    window.location.href = '../index.html';
  }

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
        document.addEventListener('DOMContentLoaded', () => {
            // --- DOM Elements ---
            const loginFormContainer = document.getElementById('loginFormContainer');
            const registerFormContainer = document.getElementById('registerFormContainer');
            const loginForm = document.getElementById('loginForm');
            const registerForm = document.getElementById('registerForm');

            const showRegisterBtn = document.getElementById('showRegisterBtn');
            const showLoginBtn = document.getElementById('showLoginBtn');

            const loginEmailInput = document.getElementById('loginEmail');
            const loginPasswordInput = document.getElementById('loginPassword');

            const registerNameInput = document.getElementById('registerName');
            const registerEmailInput = document.getElementById('registerEmail');
            const registerPasswordInput = document.getElementById('registerPassword');
            const registerConfirmPasswordInput = document.getElementById('registerConfirmPassword');

            const loginMessageDiv = document.getElementById('loginMessage');
            const registerMessageDiv = document.getElementById('registerMessage');
            const emailStatusDiv = document.getElementById('emailStatus');

            

            /**
             * Displays a message in the specified message div.
             * @param {HTMLElement} el - The message div element.
             * @param {string} message - The message to display.
             * @param {string} type - 'success' or 'error'.
             */
            function showMessage(el, message, type = 'error') {
                el.textContent = message;
                el.className = 'message-box'; // Reset classes
                if (type === 'success') {
                    el.classList.add('success-message');
                } else { // Default to error for simplicity if not success
                    el.classList.add('error-message');
                }
                el.classList.add('show'); // Trigger animation
            }

            /**
             * Hides the message div.
             * @param {HTMLElement} el - The message div element.
             */
            function hideMessage(el) {
                el.classList.remove('show');
                // Optional: clear text after animation
                setTimeout(() => {
                    if (!el.classList.contains('show')) { // Check if it wasnt reshown quickly
                         el.textContent = '';
                    }
                }, 300); // Match transition duration
            }
            
            /**
             * Switches between login and registration forms with animation.
             * @param {HTMLElement} toHide - The form container to hide.
             * @param {HTMLElement} toShow - The form container to show.
             */
            function switchForms(toHide, toShow) {
                toHide.classList.remove('visible-form');
                toHide.classList.add('hidden-form');

                // Wait for the hide animation to complete before showing the new form
                setTimeout(() => {
                    toShow.classList.remove('hidden-form');
                    toShow.classList.add('visible-form');
                }, 50); // A small delay can help ensure the class changes apply for transition
            }


            // --- Form Switching Logic ---
            showRegisterBtn.addEventListener('click', () => {
                switchForms(loginFormContainer, registerFormContainer);
                hideMessage(loginMessageDiv);
                loginForm.reset();
                // Manually trigger label float for empty fields after reset if needed
                document.querySelectorAll('#loginForm .form-input').forEach(input => {
                    input.dispatchEvent(new Event('blur')); // Trigger blur to reset label state
                });
            });

            showLoginBtn.addEventListener('click', () => {
                switchForms(registerFormContainer, loginFormContainer);
                hideMessage(registerMessageDiv);
                emailStatusDiv.textContent = '';
                registerForm.reset();
                document.querySelectorAll('#registerForm .form-input').forEach(input => {
                    input.dispatchEvent(new Event('blur'));
                });
            });
          
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxU183NSwMKZhKHnvdhBDhKOEsncfRxUdeVCD1CEdfkwjq2LEH-fMCzUbmiEW772ZaC/exec"; // <-- Replace with your Web App URL if different

 
let emailCheckTimeout;
registerEmailInput.addEventListener('input', () => {
    clearTimeout(emailCheckTimeout);
    const email = registerEmailInput.value.trim().toLowerCase();

    if (!email) {
        emailStatusDiv.textContent = '';
        emailStatusDiv.className = 'email-status-message';
        return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        emailStatusDiv.textContent = 'Invalid email format.';
        emailStatusDiv.className = 'email-status-message text-red-500';
        return;
    }

    emailStatusDiv.textContent = 'Checking...';
    emailStatusDiv.className = 'email-status-message text-gray-500';

    emailCheckTimeout = setTimeout(() => {
        fetch(GOOGLE_SCRIPT_URL) // No POST, just GET to getSheetData
            .then(res => res.json())
            .then(data => {
                // Check if email exists in any row (assuming email is in column index 1)
                const emailExists = data.some(row => row[1]?.toLowerCase() === email);
                if (emailExists) {
                    emailStatusDiv.textContent = 'Email already exists';
                    emailStatusDiv.className = 'email-status-message text-red-500';
                } else {
                    emailStatusDiv.textContent = 'Email available.';
                    emailStatusDiv.className = 'email-status-message text-green-500';
                }
            })
            .catch(() => {
                emailStatusDiv.textContent = 'Unable to verify email.';
                emailStatusDiv.className = 'email-status-message text-red-500';
            });
    }, 500);
});
        

// Registration
registerForm.addEventListener('submit', (event) => {
event.preventDefault();
hideMessage(registerMessageDiv);

const username = registerNameInput.value.trim();
const email = registerEmailInput.value.trim().toLowerCase();
const password = registerPasswordInput.value;
const confirmPassword = registerConfirmPasswordInput.value;
const registerBtn = registerForm.querySelector("button[type='submit']");
const originalText = registerBtn.innerHTML;

// Validation
if (!username || !email || !password || !confirmPassword) {
showMessage(registerMessageDiv, 'Please fill in all fields.', 'error');
return;
}

if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email)) {
  showMessage(registerMessageDiv, 'Enter a valid Gmail address.', 'error');
  return;
}

if (password !== confirmPassword) {
showMessage(registerMessageDiv, 'Passwords do not match.', 'error');
return;
}

// Start loading
startLoading(registerBtn);

fetch(GOOGLE_SCRIPT_URL, {
method: 'POST',
body: JSON.stringify({
action: "register",
username,
email,
password
}),
})
.then(res => res.json())
.then(data => {
stopLoading(registerBtn, originalText);

if (data.success) {
showMessage(registerMessageDiv, 'Registration successful! You can now sign in.', 'success');
registerForm.reset();
emailStatusDiv.textContent = '';
setTimeout(() => {
hideMessage(registerMessageDiv);
showLoginBtn.click(); // Switch to login form
}, 2000);
} else {
showMessage(registerMessageDiv, data.message, 'error');
}
})
.catch(err => {
stopLoading(registerBtn, originalText);
console.error(err);
showMessage(registerMessageDiv, 'Registration failed. Try again later.', 'error');
});
});

            
// Login......            
loginForm.addEventListener('submit', (event) => {
event.preventDefault();
hideMessage(loginMessageDiv);

const email = loginEmailInput.value.trim().toLowerCase();
const password = loginPasswordInput.value;
const loginBtn = loginForm.querySelector("button[type='submit']");
const originalText = loginBtn.innerHTML;

// Validation
if (!email || !password) {
showMessage(loginMessageDiv, 'Please enter both email and password.', 'error');
return;
}

if (!/^\S+@\S+\.\S+$/.test(email)) {
showMessage(loginMessageDiv, 'Please enter a valid email address.', 'error');
return;
}

// Start loading
startLoading(loginBtn);

fetch(GOOGLE_SCRIPT_URL, {
method: 'POST',
body: JSON.stringify({
action: "login",
email,
password
}),
})
.then(res => res.json())
.then(data => {
stopLoading(loginBtn, originalText);

if (data.success) {
showMessage(loginMessageDiv, `Welcome back, ${data.name}!`, 'success');
loginForm.reset();
try {
localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('usergd', 'true');
    localStorage.setItem('userEmail', email);
window.location.href = '../index.html';
} catch (e) {
console.error("LocalStorage error", e);
}
} else {
showMessage(loginMessageDiv, data.message, 'error');
}
})
.catch(err => {
stopLoading(loginBtn, originalText);
console.error(err);
showMessage(loginMessageDiv, 'Login failed. Try again later.', 'error');
});
});

            
            // Initialize floating labels correctly on page load/refresh if fields have values
            document.querySelectorAll('.form-input').forEach(input => {
                if (input.value) { // If there's a value (e.g. browser autofill)
                    input.nextElementSibling.classList.add('form-input:not(:placeholder-shown) + .form-label');
                     // This direct class add might be too aggressive. A better way:
                    if (input.placeholder !== " ") input.placeholder = " "; // Ensure placeholder is " "
                    input.dispatchEvent(new Event('input')); // Trigger an input event
                    input.dispatchEvent(new Event('blur')); // Or blur to ensure label state is correct
                } else if (input.placeholder !== " ") {
                     input.placeholder = " "; // Set placeholder for floating label CSS to work
                }
            });
        });

function startLoading(button) {
    button.disabled = true;
    button.innerHTML = `<svg class="animate-spin h-5 w-5 mr-2 inline-block text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
    </svg> Loading...`;
}

function stopLoading(button, originalText) {
    button.disabled = false;
    button.innerHTML = originalText;
}