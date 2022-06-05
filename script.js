"use strict";
const heaing = document.querySelector(".heading");
const txt = document.querySelector(".txt");
const addTask = document.querySelector(".btn-add");
const welcomWord = document.querySelector(".welcom");
const invaildMessage = document.querySelector(".invaild");
const newTasksContainer = document.querySelector(".newTasks-container");
const clearTasks = document.querySelector(".btn-clear");

function add(txt) {
  if (txt.value.length > 1 && txt.value !== " ") {
    let newTask = txt.value;
    // hide error message, welocm word
    invaildMessage.classList.add("hidden");
    welcomWord.classList.add("hidden");
    // add new p
    const para = document.createElement("p");
    // captaillize the task.
    const captallizeTask =
      newTask[0].toUpperCase() + newTask.toLowerCase().slice(1);

    const html = `<p class="newTask">${captallizeTask}</p>`;
    newTasksContainer.insertAdjacentHTML("afterbegin", html);

    // const node = document.createTextNode(captallizeTask);
    // para.appendChild(node);
    // // area in which paragraph appers
    // newTask.appendChild(para);

    //clear txt area after add task
    txt.value = "";
    // apper clear button
    clearTasks.classList.remove("hidden");
  } else {
    // show error message.
    invaildMessage.classList.remove("hidden");
  }
}

// Add task by button
addTask.addEventListener("click", function () {
  add(txt);
});

// Add task by pressing enter
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") add(txt);
});

clearTasks.addEventListener("click", function () {
  // clear the div
  newTasksContainer.innerHTML = "";
  // Add welcom word, hide clear button and hide error meassage
  welcomWord.classList.remove("hidden");
  clearTasks.classList.add("hidden");
  invaildMessage.classList.add("hidden");
});
