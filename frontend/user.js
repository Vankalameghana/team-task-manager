function getUser(){
  return JSON.parse(localStorage.getItem("user"));
}

// ================= PROJECT =================
async function submitProject(){

  const user = getUser();

  const form = new FormData();
  form.append("title", projectTitle.value);
  form.append("description", projectDesc.value);
  form.append("deadline", deadline.value);
  form.append("createdBy", user.id);

  const file = projectFile.files[0];
  if(file) form.append("file", file);

  await fetch("http://localhost:5000/projects", {
    method:"POST",
    body: form
  });

  alert("Project Submitted");
}

// ================= TASK =================
async function submitTask(){

  await fetch("http://localhost:5000/tasks", {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({
      title: taskTitle.value,
      status: status.value,
      assignedTo: assignedTo.value,
      projectId: projectId.value
    })
  });

  alert("Task Submitted");
}

// ================= TEAM =================
async function submitTeamMember(){

  const user = getUser();

  await fetch("http://localhost:5000/team", {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({
      name: memberName.value,
      email: memberEmail.value,
      role: memberRole.value,
      projectId: memberProjectId.value,
      contribution: memberContribution.value,
      createdBy: user.id
    })
  });

  alert("Team Member Added");
  loadTeam();
}

// ================= LOAD TEAM =================
async function loadTeam(){

  const res = await fetch("http://localhost:5000/team");
  const data = await res.json();

  document.getElementById("teamList").innerHTML =
    data.map(t => `
      <div class="box">
        <b>${t.name}</b><br>
        ${t.email}<br>
        ${t.role}<br>
        ${t.contribution}
      </div>
    `).join("");
}

loadTeam();