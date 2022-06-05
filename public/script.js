"use strict";
const heaing = document.querySelector(".heading");
const txt = document.querySelector(".txt");
const addTask = document.querySelector(".btn-add");
const welcomWord = document.querySelector(".welcom");
const invaildMessage = document.querySelector(".invaild");
const newTasksContainer = document.querySelector(".newTasks-container");
const clearTasks = document.querySelector(".btn-clear");
const btnClose = document.querySelectorAll(".btn-close");
const btnCheckMark = document.querySelectorAll(".btn-check-mark");

function add(txt) {
  if (txt.value.length > 1 && txt.value !== " ") {
    let newTask = txt.value;
    // hide error message, welocm word
    invaildMessage.classList.add("hidden");
    welcomWord.classList.add("hidden");
    // captaillize the task.
    const captallizeTask =
      newTask[0].toUpperCase() + newTask.toLowerCase().slice(1);

    const html = `<p class="newTask">${captallizeTask}
    <button class="btn btn-delete">✖</button>
    <button class="btn btn-edit">✏️</button>
    <button class="btn btn-check-mark">✔️</button>
    </p>`;
    newTasksContainer.insertAdjacentHTML("afterbegin", html);

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
