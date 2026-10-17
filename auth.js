
const supabase = window.childShildSupabase;

function showMessage(message, isError = false) {
  const output = document.getElementById("authMessage");

  if (output) {
    output.textContent = message;
    output.style.color = isError ? "red" : "green";
  }
}

// REGISTER
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const fullName = document.getElementById("name").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;

    showMessage("Creating account...");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: new URL(
          "login.html",
          window.location.href
        ).href
      }
    });

    if (error) {
      showMessage(error.message, true);
      return;
    }

    if (data.session) {
      showMessage("Account created successfully!");
      window.location.href = "index.html";
    } else {
      showMessage("Check your email to confirm your account.");
      registerForm.reset();
    }
  });
}

// LOGIN
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    showMessage("Logging in...");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      showMessage("Login failed. Check your email and password.", true);
      return;
    }

    if (data.session) {
      window.location.href = "index.html";
    }
  });
}

// LOGOUT
const logoutButton = document.getElementById("logoutButton");

if (logoutButton) {
  logoutButton.addEventListener("click", async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      showMessage(error.message, true);
      return;
    }

    window.location.href = "login.html";
  });
}
