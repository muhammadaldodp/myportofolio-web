console.log('JS CONNECTED');

let projects = JSON.parse(localStorage.getItem('projects')) || [];

renderProjects();

document.getElementById('projectForm').addEventListener('submit', function (e) {
  e.preventDefault();

  let name = document.getElementById('projectName').value;
  let startDate = document.getElementById('startDate').value;
  let endDate = document.getElementById('endDate').value;
  let description = document.getElementById('description').value;
  let imageFile = document.getElementById('image').files[0];
  let checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  let technologies = [];

  checkboxes.forEach((cb) => {
    technologies.push(cb.value);
  });

  if (imageFile.size > 300000) {
    alert('Ukuran gambar terlalu besar! Max 300KB');
    return;
  }

  let reader = new FileReader();
  reader.readAsDataURL(imageFile);

  reader.onload = function () {
    let project = {
      name,
      startDate,
      endDate,
      description,
      technologies,
      image: reader.result,
    };

    projects.push(project);
    localStorage.setItem('projects', JSON.stringify(projects));
    renderProjects();
    document.getElementById('projectForm').reset();
  };
});

function renderProjects() {
  let container = document.getElementById('projectList');
  container.innerHTML = '';

  projects.forEach((project, index) => {
    container.innerHTML += `
      <div class="card p-3 m-2" style="width: 18rem;">
        <img src="${project.image}" class="card-img-top">
        <div class="card-body">
          <h3>${project.name}</h3>
          <p>${project.startDate} - ${project.endDate}</p>
          <p>${project.description}</p>
          <p>${project.technologies.join(', ')}</p>
          
          <div class="d-flex justify-content-between">
            <button class="btn btn-success btn-sm" onclick="detailProject(${index})">Detail</button>
            <button class="btn btn-danger btn-sm" onclick="deleteProject(${index})">Delete</button>
          </div>
        </div>
      </div>
    `;
  });
}

function deleteProject(index) {
  projects.splice(index, 1);
  localStorage.setItem('projects', JSON.stringify(projects));
  renderProjects();
}

function detailProject(index) {
  localStorage.setItem('detailIndex', index);
  window.location.href = 'detail-project.html';
}
