const API = "https://backend-production-938d.up.railway.app";

let allJobs = [];

// عرض jobs
async function fetchJobs() {
  try {
    const params = new URLSearchParams(window.location.search);
    const city = params.get("city");

    let url = API + "/jobs";

    if (city) {
      url += `?city=${city}`;
    }

    const res = await fetch(url);
    const jobs = await res.json();

    allJobs = jobs; // مهم للـ search

    displayJobs(jobs);

    // تغيير العنوان
    const title = document.getElementById("jobs-title");
    if (title && city) {
      title.innerText = `Offres à ${city}`;
    }

  } catch (err) {
    console.log(err);
  }
}

// عرض فـ HTML
function displayJobs(jobs) {
  const container = document.getElementById("jobs");
  container.innerHTML = "";

  if (jobs.length === 0) {
    container.innerHTML = "<p>Aucune offre disponible</p>";
    return;
  }

  jobs.forEach(job => {
    container.innerHTML += `
      <div class="job">
        <div>
          <h3>${job.title}</h3>
          <p>${job.location}</p>
          <p>${job.description}</p>
        </div>

        <button onclick="apply('${job._id}')">Apply</button>
      </div>
    `;
  });
}

// search
function searchJobs() {
  const value = document.getElementById("search").value.toLowerCase();

  const filtered = allJobs.filter(j =>
    j.title.toLowerCase().includes(value) ||
    j.location.toLowerCase().includes(value)
  );

  displayJobs(filtered);
}

// redirect
function apply(jobId) {
  window.location.href = "./apply.html?jobId=" + jobId;
}

// start
fetchJobs();