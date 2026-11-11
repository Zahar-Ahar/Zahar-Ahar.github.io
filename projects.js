let allProjects = [];

function renderProjects(list) {
  const container = document.getElementById('projects-list');
  container.innerHTML = '';

  list.forEach(project => {
    const link = project.link ? `<a href="${project.link}" class="project-link">Открыть</a>` : '';
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <p>Статус: ${project.status}</p>
      ${link}
    `;
    container.appendChild(card);
  });
}

async function loadProjects() {
  const response = await fetch('projects.json');
  allProjects = await response.json();
  renderProjects(allProjects);
}

loadProjects();

document.getElementById('filter-all').addEventListener('click', () => {
  renderProjects(allProjects);
});

document.getElementById('filter-done').addEventListener('click', () => {
  const done = allProjects.filter(project => project.status === 'сделано');
  renderProjects(done);
});

