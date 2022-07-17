'use strict';
const form = document.querySelector('.form');
const heaing = document.querySelector('.heading');
const txt = document.querySelector('.txt');
const btnAddTask = document.querySelector('.btn-add');
const welcomWord = document.querySelector('.welcom');
const invaildMessage = document.querySelector('.invaild');
const tasksContainer = document.querySelector('.tasks');
const newTasksContainer = document.querySelector('.newTasks-container');
const clearTasks = document.querySelector('.btn-clear');
const btnDelete = document.querySelector('.btn-delete');
const btnCheckMark = document.querySelector('.btn-check-mark');

const hideMsgs = () => {
  invaildMessage.classList.add('hidden');
  welcomWord.classList.add('hidden');
};

const addTask = async () => {
  const name = txt.value;
  try {
    await axios.post('http://127.0.0.1:3000/api/v1/tasks', { name });
    showTasks();
    txt.value = '';
  } catch (error) {
    console.log(error);
  }
};

// Show all tasks
const showTasks = async () => {
  try {
    const {
      data: { tasks },
    } = await axios.get('/api/v1/tasks');

    if (tasks.length < 1) {
      // hide tasks container and clear btn, tasks container
      newTasksContainer.classList.add('hidden');
      clearTasks.classList.add('hidden');
      tasksContainer.classList.add('hidden');
      return;
    } else {
      // hide error message, welcom word
      hideMsgs();
      const allTasks = tasks
        .map((task) => {
          const { completed, _id: taskID, name } = task;

          return `<div class="newTasks-container" data-id="${taskID}"><p class="newTask ${completed}-task-completed" data-id="${taskID}">${name}</p>
          <button class="btn btn-delete"data-id="${taskID}">✖</button>
          <button class="btn btn-edit">✏️</button>
          <button class="btn btn-check-mark">✔️</button><br>
          </div>`;
        })
        .join('');
      newTasksContainer.innerHTML = allTasks;
      // apper clear button
      clearTasks.classList.remove('hidden');
    }
  } catch (error) {
    invaildMessage.classList.remove('hidden');
  }
};

showTasks();

// Add task by button
btnAddTask.addEventListener('click', function () {
  addTask();
});

// Finshed Tasks
newTasksContainer.addEventListener('click', (e) => {
  const el = e.target;
  const p = el.parentElement.firstChild;
  if (el.classList.contains('btn-check-mark')) {
    p.classList.add('true-task-completed');
    p.classList.remove('false-task-completed');
  }
});

// Delete Task
newTasksContainer.addEventListener('click', async (e) => {
  const el = e.target;
  if (el.classList.contains('btn-delete')) {
    const id = el.dataset.id;
    console.log(id);
    try {
      await axios.delete(`/api/v1/tasks/${id}`);
      showTasks();
    } catch (error) {
      console.log(error);
    }
  }
});

clearTasks.addEventListener('click', async () => {
  const id = newTasksContainer.firstChild.dataset.id;
  console.log(newTasksContainer.firstChild.firstChild);

  while (!tasksContainer.classList.contains('hidden')) {
    const id = newTasksContainer.firstChild.firstChild.dataset.id;
    try {
      await axios.delete(`/api/v1/tasks/${id}`);
      showTasks();
    } catch (error) {}
  }
});
