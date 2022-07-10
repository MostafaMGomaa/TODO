'use strict';
const heaing = document.querySelector('.heading');
const txt = document.querySelector('.txt');
const btnAddTask = document.querySelector('.btn-add');
const welcomWord = document.querySelector('.welcom');
const invaildMessage = document.querySelector('.invaild');
const newTasksContainer = document.querySelector('.newTasks-container');
const clearTasks = document.querySelector('.btn-clear');
const btnClose = document.querySelectorAll('.btn-close');
const btnCheckMark = document.querySelectorAll('.btn-check-mark');

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
  } catch (error) {}
};

async function add(txt) {
  if (txt.value.length > 1 && txt.value !== ' ') {
    let newTask = txt.value;
    // hide error message, welcom word
    hideMsgs();
    // captaillize the task.
    const captallizeTask =
      newTask[0].toUpperCase() + newTask.toLowerCase().slice(1);

    const html = `<p class="newTask">${captallizeTask}
    <button class="btn btn-delete">✖</button>
    <button class="btn btn-edit">✏️</button>
    <button class="btn btn-check-mark">✔️</button>
    </p>`;
    newTasksContainer.insertAdjacentHTML('afterbegin', html);

    //clear txt area after add task
    txt.value = '';
    // apper clear button
    clearTasks.classList.remove('hidden');
  } else {
    // show error message.
    invaildMessage.classList.remove('hidden');
  }
}

// Show all tasks
const showTasks = async () => {
  try {
    const {
      data: { tasks },
    } = await axios.get('http://localhost:3000/api/v1/tasks');

    // if (tasks.length > 0) {
    // hide error message, welcom word
    hideMsgs();
    const allTasks = tasks
      .map((task) => {
        const { completed, _id: taskID, name } = task;
        return `<p class="newTask">${name}
          <button class="btn btn-delete data-id="${taskID}"" >✖</button>
      <button class="btn btn-edit">✏️</button>
      <button class="btn btn-check-mark">✔️</button>
      </p>`;
      })
      .join('');
    newTasksContainer.innerHTML = allTasks;
    // }
  } catch (error) {}
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
