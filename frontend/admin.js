function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

async function loadDashboard() {
  const res = await fetch("http://localhost:5000/admin/dashboard");
  const data = await res.json();

  users.innerText = data.totalUsers;
  projects.innerText = data.totalProjects;
  tasks.innerText = data.totalTasks;
  team.innerText = data.totalTeam;
}

async function loadUsers() {
  const res = await fetch("http://localhost:5000/users");
  const data = await res.json();

  userList.innerHTML = data
    .map(
      (u) =>
        `<div class="box">
      <h3>${u.name}</h3>
      <p>${u.email}</p>
      <span class="badge">${u.role}</span>
    </div>`,
    )
    .join("");
}

async function loadProjects() {
  const res = await fetch("http://localhost:5000/projects");
  const data = await res.json();

  projectsContainer.innerHTML = data
    .map(
      (p) =>
        `<div class="box">
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <p>By: ${p.creatorName}</p>
      <div class="progress">
        <div style="width:${Math.random() * 100}%"></div>
      </div>
    </div>`,
    )
    .join("");
}

async function loadTeam() {
  const res = await fetch("http://localhost:5000/team");
  const data = await res.json();

  teamContainer.innerHTML = data
    .map(
      (t) =>
        `<div class="box">
      <h3>${t.name}</h3>
      <p>${t.role}</p>
      <p>${t.contribution}</p>
    </div>`,
    )
    .join("");
}

loadDashboard();
loadUsers();
loadProjects();
loadTeam();
