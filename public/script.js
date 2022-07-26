'use strict';
const todoContainer = document.querySelector('.todo-container');
const heaing = document.querySelector('.heading');
const txt = document.querySelector('.txt');
const btnAddTask = document.querySelector('.btn-add');
const welcomWord = document.querySelector('.welcom');
const invaildMessage = document.querySelector('.invaild');
const tasksContainer = document.querySelector('.tasks');
const newTasksContainer = document.querySelector('.newTasks-container');
const clearTasks = document.querySelector('.btn-clear');
const btnDelete = document.querySelector('.btn-delete');
const btnEdit = document.querySelector('.btn-edit');
const btnCheckMark = document.querySelector('.btn-check-mark');
const editedContainer = document.querySelector('.EditTaskContainer');
const editedTxt = document.querySelector('.edited-txt');
const btnEditTask = document.querySelector('.btn-editTask');
const boxCompeleted = document.querySelector('.completed-checkbox');
const txtCompleted = document.querySelector('.completed-txt');
const inputId = document.querySelector('.id-input');
const hideMsgs = () => {
  invaildMessage.classList.add('hidden');
  welcomWord.classList.add('hidden');
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
          <button class="btn btn-delete" data-id="${taskID}">✖</button>
          <button class="btn btn-edit" data-id="${taskID}">✏️</button>
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

const addTask = async () => {
  const name = txt.value;
  try {
    await axios.post('/api/v1/tasks', { name });
    showTasks();
    txt.value = '';
  } catch (error) {
    invaildMessage.classList.remove('hidden');
  }
};

// Add task by button
btnAddTask.addEventListener('click', function () {
  addTask();
});

// Finshed Tasks
newTasksContainer.addEventListener('click', async (e) => {
  const el = e.target;
  const p = el.parentElement.firstChild;
  if (el.classList.contains('btn-check-mark')) {
    p.classList.add('true-task-completed');
    p.classList.remove('false-task-completed');
  }
  // sent patch request with new data compled data
  try {
    await axios.patch(`/api/v1/tasks/${p.dataset.id}`, {
      completed: true,
    });
  } catch (error) {
    invaildMessage.classList.remove('hidden');
  }
});

// Delete Task
newTasksContainer.addEventListener('click', async (e) => {
  const el = e.target;
  if (el.classList.contains('btn-delete')) {
    const id = el.dataset.id;
    try {
      await axios.delete(`/api/v1/tasks/${id}`);
      showTasks();
    } catch (error) {
      invaildMessage.classList.remove('hidden');
    }
  }
});

// Delete All Task
clearTasks.addEventListener('click', async () => {
  const id = newTasksContainer.firstChild.dataset.id;

  while (!tasksContainer.classList.contains('hidden')) {
    const id = newTasksContainer.firstChild.firstChild.dataset.id;
    try {
      await axios.delete(`/api/v1/tasks/${id}`);
      showTasks();
    } catch (error) {
      invaildMessage.classList.remove('hidden');
    }
  }
});

/**
 * EDIT TASK PAGE fun
 */

/**
 * delete hidden from container
 * to view page must apper value of task in input ,
 * save Id in variable and update the task,
 * add hidden class to container
 * boxCompeleted.value
 */
newTasksContainer.addEventListener('click', (e) => {
  const el = e.target;
  if (el.classList.contains('btn-edit')) {
    todoContainer.classList.add('hidden');
    tasksContainer.classList.add('hidden');
    editedContainer.classList.remove('hidden');

    const id = el.dataset.id;
    const p = el.parentElement.firstChild;

    editedTxt.value = p.innerText;
    editedTxt.innerHTML = p.innerText;
    inputId.value = id;
    inputId.innerHTML = id;
  }
});

btnEditTask.addEventListener('click', async () => {
  // send req
  try {
    const completed = boxCompeleted.value === 'true' ? true : false;
    await axios.patch(`/api/v1/tasks/${inputId.value}`, {
      name: editedTxt.value,
      completed,
    });
    showTasks();
  } catch (error) {
    invaildMessage.classList.remove('hidden');
  }

  // Show TODO list
  todoContainer.classList.remove('hidden');
  tasksContainer.classList.remove('hidden');
  editedContainer.classList.add('hidden');
});
