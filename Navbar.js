// Import Firebase modules (using CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_UlrcZsDh7q18mo6ttMxBHCbfeJNcRFU",
  authDomain: "js-project-16568.firebaseapp.com",
  databaseURL: "https://js-project-16568-default-rtdb.firebaseio.com",
  projectId: "js-project-16568",
  storageBucket: "js-project-16568.firebasestorage.app",
  messagingSenderId: "27259777910",
  appId: "1:27259777910:web:d682c9f58d4c5e58f7c057",
  measurementId: "G-PXRKTQM847"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 

// Sign Up
document.getElementById("signUpBtn").addEventListener("click", (e) => {
  e.preventDefault();
  let signUpModal = new bootstrap.Modal(document.getElementById("signUpModal"));
  signUpModal.show();
});

document.getElementById("signUpSubmitBtn").addEventListener("click", async () => {
  let sName = document.getElementById("signup-name").value.trim();
  let sEmail = document.getElementById("signup-email").value.trim();
  let sPassword = document.getElementById("signup-password").value.trim();

  if (sEmail === "" || sName === "" || sPassword === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Enter all fields",
    });
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, sEmail, sPassword);
    Swal.fire({
      title: "Registered successfully!",
      icon: "success",
    }).then(() => {
      document.getElementById("signup-name").value = "";
      document.getElementById("signup-email").value = "";
      document.getElementById("signup-password").value = "";
      location.href = "./Navbar.html"
    });
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: err.message, // Extract error message
    });
  }
});

// Login
document.getElementById("loginBtn").addEventListener("click", (e) => {
  e.preventDefault();
  let loginModal = new bootstrap.Modal(document.getElementById("loginModal"));
  loginModal.show();
});

document.getElementById("loginSubmitBtn").addEventListener("click", async () => {
  let sEmail = document.getElementById("login-email").value.trim();
  let sPassword = document.getElementById("login-password").value.trim();

  if (sEmail === "" || sPassword === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Enter all fields",
    });
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, sEmail, sPassword);
    Swal.fire({
      title: "Logged in successfully!",
      icon: "success",
    }).then(() => {
      document.getElementById("login-email").value = "";
      document.getElementById("login-password").value = "";
      location.href = "../focusflow.html";
    });
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: err.message, // Extract error message
    });
  }
});


