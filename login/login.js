// --- Firebase Imports ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

// --- Firebase Config ---
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// --- Initialize Firebase ---
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// --- Set Persistence ---
(async () => {
    await setPersistence(auth, browserLocalPersistence);
})();

// --- DOM Ready ---
document.addEventListener('DOMContentLoaded', () => {
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

    // --- Register ---
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
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

        startLoading(registerBtn);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                username: username,
                email: email,
                role: "user",
                createdAt: new Date().toISOString()
            });

                stopLoading(registerBtn, originalText);
                showMessage(registerMessageDiv, 'Registration successful! You can now sign in.', 'success');
                registerForm.reset();
                emailStatusDiv.textContent = '';
                setTimeout(() => {
                hideMessage(registerMessageDiv);
                showLoginBtn.click(); // Switch to login form
                }, 2000);

        } catch (err) {
            stopLoading(registerBtn, originalText);
            let msg = 'Registration failed. Try again.';
            if (err.code === 'auth/email-already-in-use') msg = 'Email is already registered.';
            else if (err.code === 'auth/weak-password') msg = 'Password should be at least 6 characters.';
            showMessage(registerMessageDiv, msg, 'error');
        }
    });

    // --- Login ---
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        hideMessage(loginMessageDiv);

        const email = loginEmailInput.value.trim().toLowerCase();
        const password = loginPasswordInput.value;
        const loginBtn = loginForm.querySelector("button[type='submit']");
        const originalText = loginBtn.innerHTML;

        if (!email || !password) {
            showMessage(loginMessageDiv, 'Please enter both email and password.', 'error');
            return;
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            showMessage(loginMessageDiv, 'Please enter a valid email address.', 'error');
            return;
        }

        startLoading(loginBtn);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

             // Fetch username from Firestore
            const userDoc = await getDoc(doc(db, "users", user.uid));
            const userData = userDoc.exists() ? userDoc.data() : {};
            localStorage.setItem('loggedInUserId', user.uid);
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('usergd', 'true');
            localStorage.setItem('userEmail', email);
            

const docRef = doc(db, "users", user.uid);
getDoc(docRef)
  .then((docSnap) => {
    if (docSnap.exists()) {
      const userData = docSnap.data(); // Firestore user data

      const username = userData.username; // from Firestore
      const email = user.email;           // from Firebase Auth
      const uid = user.uid;               // from Firebase Auth

      if (username && email && uid) {
        const userInfo = {
          username: username,
          email: email,
          uid: uid
        };

        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        console.log("User info saved to localStorage");
      } else {
        console.log("Missing user info, not saved");
      }

    } else {
      console.log("No document found matching ID");
    }
  })
  .catch((error) => {
    console.error("Error fetching user document:", error);
  });

        
            stopLoading(loginBtn, originalText);
            showMessage(loginMessageDiv, `Welcome back, ${userData.username || 'User'}!`, 'success');            loginForm.reset();
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 1500);

        } catch (err) {
            stopLoading(loginBtn, originalText);
            let msg = 'Login failed. Try again.';
            if (err.code === 'auth/user-not-found') msg = 'No user found with that email.';
            else if (err.code === 'auth/wrong-password') msg = 'Incorrect password.';
            showMessage(loginMessageDiv, msg, 'error');
        }
    });


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

// Function to apply theme on page load
window.addEventListener('DOMContentLoaded', () => {
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'dark') {
    document.body.classList.add('dark');
  }
    
 const shouldShowRegister = localStorage.getItem("showRegister");

  if (shouldShowRegister === "true") {
    localStorage.removeItem("showRegister");

    const registerBtn = document.getElementById("showRegisterBtn");
    if (registerBtn) {
      registerBtn.click(); // Open the register section or form
    }
  }   
    
});

// Toggle theme and store preference
document.getElementById('themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const theme = document.body.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
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


});



