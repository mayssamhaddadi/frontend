const API = "https://backend-production-938d.up.railway.app";
const params = new URLSearchParams(window.location.search);
const jobId = params.get("jobId");

async function submitApplication() {
  const name = document.getElementById("name").value;
  const prenom = document.getElementById("prenom").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const education = document.getElementById("education").value;
  const experience = document.getElementById("experience").value;
  const msg = document.getElementById("msg");

  // langues (checkbox)
  const languages = Array.from(
    document.querySelectorAll('input[name="languages"]:checked')
  ).map(cb => cb.value);

  // validation
  if (!name || !prenom || !email || !phone || !education || !experience || languages.length === 0) {
    msg.style.color = "red";
    msg.innerText = "Remplissez tous les champs";
    return;
  }

  try {
    const res = await fetch(API + "/apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        prenom,
        email,
        phone,
        education,
        languages,
        experience,
        jobId
      })
    });

    const text = await res.text();

    msg.style.color = "green";
    msg.innerText = text;

    // reset
    document.getElementById("name").value = "";
    document.getElementById("prenom").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("education").value = "";
    document.getElementById("experience").value = "";

    document.querySelectorAll('input[name="languages"]').forEach(cb => cb.checked = false);

  } catch (err) {
    msg.style.color = "red";
    msg.innerText = "Erreur serveur";
  }
}
function goBack() {
  window.history.back();
}
function goBack() {
  window.location.href = "../Jobs/user.html";
}