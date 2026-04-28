const API = "https://backend-production-938d.up.railway.app";
/* REDIRECT */
function goToApply(id) {
  // بما أن apply.html داخل نفس folder (Jobs)
  window.location.href = `Jobs/apply.html?jobId=${id}`;
}
/* LOAD JOBS */
async function loadJobs() {
  try {
    const res = await fetch(API + "/jobs");
    const jobs = await res.json();

    const container = document.getElementById("jobs");
    if (!container) return;

    container.innerHTML = "";

    const latestJobs = jobs.slice(-4).reverse();

    latestJobs.forEach(job => {
      const div = document.createElement("div");
      div.className = "card";

      div.innerHTML = `
        <h3>${job.title}</h3>
        <p>${job.description}</p>
        <span>${job.location}</span>
        <button onclick="goToApply('${job._id}')">
          Postuler
        </button>
      `;

      container.appendChild(div);
    });

  } catch (err) {
    console.log("Erreur jobs:", err);
  }
}

loadJobs();

/* HERO BACKGROUND */
const hero = document.querySelector(".hero");

if (hero) {
 
const images = [
  "Jobs/images/image1menu.png",
  "Jobs/images/image3menu.png",
  "Jobs/images/imagemen2.png",
];
  let index = 0;

  function changeBackground() {
    hero.style.backgroundImage = `url(${images[index]})`;
    index = (index + 1) % images.length;
  }

  changeBackground();
  setInterval(changeBackground, 4000);
}

/* DIAMOND EFFECT */
const diamonds = document.querySelectorAll(".diamond");

if (diamonds.length > 0) {
  window.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    diamonds.forEach((el, i) => {
      el.style.transform =
        `rotate(45deg) translate(${x * (i+1) * 0.2}px, ${y * (i+1) * 0.2}px)`;
    });
  });
}

function goToJobs(city) {
  window.location.href = `Jobs/user.html?city=${city}`;
}