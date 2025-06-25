// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmnhphYClCa7sFcP4j_bFGv3R3_zoWdYI",
  authDomain: "admin-login-93141.firebaseapp.com",
  projectId: "admin-login-93141",
  storageBucket: "admin-login-93141.firebasestorage.app",
  messagingSenderId: "830952828374",
  appId: "1:830952828374:web:19b9cf90114af148b20877"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Login button
const login = document.getElementById('mylogin');
login.addEventListener("click", function (event) {
  event.preventDefault();

  // Input
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Sign in with Firebase Auth
  signInWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      alert("Login successful!");
      window.location.href = "approve.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Error: " + errorMessage);
    });
});

