document.addEventListener("DOMContentLoaded", () => {
    // Tab Switching
    const loginTab = document.getElementById("loginTab");
    const signupTab = document.getElementById("signupTab");
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
  
    const switchToSignup = document.getElementById("switchToSignup");
    const switchToLogin = document.getElementById("switchToLogin");
  
    function showLogin() {
      loginTab.classList.add("active");
      signupTab.classList.remove("active");
      loginForm.classList.add("active");
      signupForm.classList.remove("active");
    }
  
    function showSignup() {
      signupTab.classList.add("active");
      loginTab.classList.remove("active");
      signupForm.classList.add("active");
      loginForm.classList.remove("active");
    }
  
    loginTab.addEventListener("click", showLogin);
    signupTab.addEventListener("click", showSignup);
  
    if (switchToSignup) {
      switchToSignup.addEventListener("click", (e) => {
        e.preventDefault();
        showSignup();
      });
    }
    if (switchToLogin) {
      switchToLogin.addEventListener("click", (e) => {
        e.preventDefault();
        showLogin();
      });
    }
  
    // Basic login and signup form handling
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Login functionality not implemented.");
    });
  
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const password = document.getElementById("signupPassword").value;
      const confirm = document.getElementById("signupConfirm").value;
      if (password !== confirm) {
        alert("Passwords do not match!");
        return;
      }
      alert("Signup functionality not implemented.");
    });
  });
  