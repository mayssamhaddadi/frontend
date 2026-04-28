const API = "https://backend-production-938d.up.railway.app";
// =======================
// 🔐 AUTH
// =======================
function isValidToken(token) {
  return token && token !== "null" && token !== "undefined" && token.length > 10;
}

const token = localStorage.getItem("token");

if (!isValidToken(token)) {
  localStorage.removeItem("token");
  window.location.href = "./login.html";
}

// =======================
// 📦 JOBS
// =======================
async function fetchJobs() {
  try {
    const res = await fetch(API + "/jobs");
    const jobs = await res.json();

    const container = document.getElementById("jobs");
    if (!container) return;

    container.innerHTML = "";

    jobs.reverse().forEach(job => {
      const div = document.createElement("div");
      div.className = "job";

      div.innerHTML = `
        <h3>${job.title}</h3>
        <p>${job.location}</p>
        <p>${job.description}</p>
        <button onclick="deleteJob('${job._id}')">Delete</button>
      `;

      container.appendChild(div);
    });

  } catch (err) {
    console.log("Erreur jobs:", err);
  }
}

// =======================
// ➕ ADD JOB
// =======================
async function addJob() {
  const titleInput = document.getElementById("title");
  const locationInput = document.getElementById("location");
  const descriptionInput = document.getElementById("description");

  const title = titleInput.value;
  const location = locationInput.value;
  const description = descriptionInput.value;

  if (!title || !location || !description) {
    alert("Remplissez tous les champs");
    return;
  }

  try {
    await fetch(API + "/add-job", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify({ title, location, description })
    });

    // 🔥 vider inputs
    titleInput.value = "";
    locationInput.value = "";
    descriptionInput.value = "";

    // تحديث
    fetchJobs();

  } catch (err) {
    console.log("Erreur add job:", err);
  }
}

// =======================
// ❌ DELETE JOB
// =======================
async function deleteJob(id) {
  try {
    await fetch(API + "/delete-job/" + id, {
      method: "DELETE",
      headers: { "Authorization": token }
    });

    fetchJobs();

  } catch (err) {
    console.log("Erreur delete:", err);
  }
}

// =======================
// 👤 CANDIDATES
// =======================
async function fetchCandidates() {
  try {
    const res = await fetch(API + "/candidates");
    const data = await res.json();

    const container = document.getElementById("candidates");
    if (!container) return;

    container.innerHTML = "";

    data.forEach(job => {
      const div = document.createElement("div");
      div.className = "job";

      div.innerHTML = `<h3 style="color:#4a6cf7;">${job.jobTitle}</h3>`;

      if (job.candidates.length === 0) {
        div.innerHTML += "<p>Aucun candidat</p>";
      }

      job.candidates.forEach(c => {
        div.innerHTML += `
          <p><b>${c.name} ${c.prenom || ""}</b></p>
          <p>${c.email}</p>
          <p>${c.phone || ""}</p>
          <p>${c.education || ""}</p>
          <p>${c.experience}</p>
          <p>${(c.languages || []).join(", ")}</p>
          <hr/>
        `;
      });

      container.appendChild(div);
    });

  } catch (err) {
    console.log("Erreur candidates:", err);
  }
}

// =======================
// 🚪 LOGOUT
// =======================
function logout() {
  localStorage.removeItem("token");
  window.location.href = "./login.html";
}

// =======================
// 🚀 START
// =======================
fetchJobs();
fetchCandidates();