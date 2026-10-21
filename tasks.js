function renderTasks(list) {
  const container = document.getElementById('tasks-list');
  container.innerHTML = '';

  list.forEach(task => {
    const link = task.link ? `<a href="${task.link}" class="task-link">Смотреть на сайте</a>` : '';
    const card = document.createElement('div');
    card.className = 'task-card';
    card.innerHTML = `
      <h3>Задача ${task.number}: ${task.title}</h3>
      <p>${task.date}</p>
      <p>${task.learned}</p>
      ${link}
    `;
    container.appendChild(card);
  });
}

async function loadTasks() {
    try {
        const response = await fetch('tasks.json');
        if (!response.ok) {
            throw new Error('Json file error: ' + response.status);
        }   
        const tasks = await response.json();
        tasks.sort((a, b) => b.date.localeCompare(a.date));
        renderTasks(tasks);
    } catch (error) {
        document.getElementById('tasks-list').textContent = 'Загрузка задач не удалась. Попробуйте повторить позже.';
        console.error(error);
    }
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
}

function renderCommits(list) {
  const container = document.getElementById('commits-list');
  container.innerHTML = '';

  list.forEach(item => {
    const row = document.createElement('p');
    row.textContent = `${formatDate(item.commit.author.date)}: ${item.commit.message}`;
    container.appendChild(row);
  });
}

async function loadCommits() {
  try {
    const response = await fetch('https://api.github.com/repos/Zahar-Ahar/Zahar-Ahar.github.io/commits?per_page=5');
    if (!response.ok) {
      throw new Error('Ответ сервера: ' + response.status);
    }
    const commits = await response.json();
    renderCommits(commits);
  } catch (error) {
    document.getElementById('commits-list').textContent = 'Не удалось загрузить последние обновления сайта. Попробуйте позже.';
    console.error(error);
  }
}

loadTasks();
loadCommits();
