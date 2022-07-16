'use strict';
const form = document.querySelector('.form');
const heaing = document.querySelector('.heading');
const txt = document.querySelector('.txt');
const btnAddTask = document.querySelector('.btn-add');
const welcomWord = document.querySelector('.welcom');
const invaildMessage = document.querySelector('.invaild');
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
    } = await axios.get('http://localhost:3000/api/v1/tasks');

    if (tasks.length > 0) {
      // hide error message, welcom word
      hideMsgs();
      const allTasks = tasks
        .map((task) => {
          const { completed, _id: taskID, name } = task;
          return `<p class="newTask ${completed}-task-completed" data-id="${taskID}">${name}</p>
          <button class="btn btn-delete"data-id="${taskID}">✖</button>
          <button class="btn btn-edit">✏️</button>
          <button class="btn btn-check-mark">✔️</button>
          `;
        })
        .join('');
      newTasksContainer.innerHTML = allTasks;
      // apper clear button
      clearTasks.classList.remove('hidden');
    }
  } catch (error) {
    console.log(error);
  }
};

showTasks();

// Add task by button
btnAddTask.addEventListener('click', function () {
  addTask();
});

// Add task by pressing enter
document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') addTask();
});

clearTasks.addEventListener('click', function () {
  // clear the div
  newTasksContainer.innerHTML = '';
  // Add welcom word, hide clear button and hide error meassage
  welcomWord.classList.remove('hidden');
  clearTasks.classList.add('hidden');
  invaildMessage.classList.add('hidden');
});

//
// btnCheckMark.addEventListener('click', () => {
//   // delete class -> false-task-completed
//   // add class -> true-task-completed
// });

newTasksContainer.addEventListener('click', async (e) => {
  const el = e.target;
  console.log(el.classList);
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
