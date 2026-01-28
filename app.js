// Registrar Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('SW registrado:', reg))
      .catch(err => console.log('Error SW:', err));
  });
}

// Variables
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const status = document.getElementById('status');

// Cargar tareas desde localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Renderizar tareas
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''} 
             onchange="toggleTask(${index})">
      <span class="task-text">${task.text}</span>
      <button class="delete-btn" onclick="deleteTask(${index})">
        Eliminar
      </button>
    `;
    taskList.appendChild(li);
  });
}

// Agregar tarea
function addTask() {
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ text, completed: false });
    saveTasks();
    taskInput.value = '';
    renderTasks();
  }
}

// Alternar completado
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// Eliminar tarea
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Guardar en localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Event listeners
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') addTask();
});

// Detectar estado de conexión
function updateOnlineStatus() {
  if (navigator.onLine) {
    status.textContent = '🟢 Online';
    status.className = 'status online';
  } else {
    status.textContent = '🔴 Offline - Los datos están guardados localmente';
    status.className = 'status offline';
  }
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

// Inicializar
renderTasks();
updateOnlineStatus();