console.log('JS CONNECTED');
let projects = [];

document.getElementById('projectForm').addEventListener('submit', function (e) {
  e.preventDefault();

  let name = document.getElementById('projectName').value;
  let startDate = document.getElementById('startDate').value;
  let endDate = document.getElementById('endDate').value;
  let description = document.getElementById('description').value;

  let checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  let technologies = [];

  checkboxes.forEach((cb) => {
    technologies.push(cb.value);
  });

  let project = {
    name,
    startDate,
    endDate,
    description,
    technologies,
  };

  projects.push(project);
  renderProjects();
});

function renderProjects() {
  let container = document.getElementById('projectList');
  container.innerHTML = '';

  projects.forEach((project, index) => {
    container.innerHTML += `
            <div class="card">
                <img src="#">
                <h3>${project.name}</h3>
                <p>${project.startDate} - ${project.endDate}</p>
                <p>${project.description}</p>
                <p>${project.technologies.join(', ')}</p>
                <button class="btn btn-primary" onclick="deleteProject(${index})">Delete</button>
            </div>
        `;
  });
}

function deleteProject(index) {
  projects.splice(index, 1);
  renderProjects();
}
