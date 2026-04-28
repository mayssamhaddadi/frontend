async function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorEl = document.getElementById("error");
  const card = document.querySelector(".card");

  // reset
  errorEl.innerText = "";
  errorEl.classList.remove("show");

  // validation
  if (!email) {
    showError("Entrez votre email");
    return;
  }

  if (!password) {
    showError("Entrez votre mot de passe");
    return;
  }

  // email format
  const emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;

  if (!emailRegex.test(email)) {
    showError("Email invalide");
    return;
  }

  try {
    // ✅ API الصحيح
    const res = await fetch("https://backend-production-938d.up.railway.app/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      // ✅ تخزين token
      localStorage.setItem("token", data.token);

      // redirect
      window.location.href = "./dashboard.html";
    } else {
      showError(data.message || "Email ou mot de passe incorrect");
    }

  } catch (err) {
    console.log(err);
    showError("Erreur serveur");
  }

  // function ديال error
  function showError(msg) {
    errorEl.innerText = msg;
    errorEl.classList.add("show");

    card.classList.add("shake");
    setTimeout(() => card.classList.remove("shake"), 300);
  }
}