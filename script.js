'use strict'
const heaing = document.querySelector('.heading');
const txt = document.querySelector('.txt');
const addTask = document.querySelector('.add');
const welcomWord = document.querySelector('.welcom');
const invaildMessage = document.querySelector('.invaild');
const newTask = document.querySelector('.newTask');
const clearTasks = document.querySelector('.clear');
let tasks;
function add(txt) {
  if (txt.value.length > 1 && txt.value !== ' ') {
    console.log(tasks);
    tasks = txt.value;
    console.log(tasks);
    // hide error message, welocm word
    invaildMessage.classList.add('hidden');
    welcomWord.classList.add('hidden');
    // add new p
    const para = document.createElement("p");
    // captaillize the task.
    const captallizeTask = tasks[0].toUpperCase() + tasks.toLowerCase().slice(1);
    const node = document.createTextNode(captallizeTask);

    para.appendChild(node);
    // area in which paragraph appers
    newTask.appendChild(para);
    //clear txt area after add task
    txt.value = '';
    // apper clear button
    clearTasks.classList.remove('hidden');
  }
  else {
    // show error message.
    invaildMessage.classList.remove('hidden');
  }
}

// Add task by button
addTask.addEventListener('click', function () {
  add(txt);
})

// Add task by pressing enter
document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') add(txt);
})

clearTasks.addEventListener('click', function () {
  // clear the div
  newTask.innerHTML = '';
  // Add welcom word, hide clear button and hide error meassage
  welcomWord.classList.remove('hidden');
  clearTasks.classList.add('hidden');
  invaildMessage.classList.add('hidden');

})