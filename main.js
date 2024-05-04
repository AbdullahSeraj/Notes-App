let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

let arrayOfTasks = [];

if (localStorage.getItem('tasks')) {
  arrayOfTasks = JSON.parse(localStorage.getItem('tasks'));
}

getDataToLocal();

// Add Task
submit.addEventListener("click", function () {
  if (input.value !== "") {
    addTaskToArray(input.value);
    input.value = "";
  }
});

tasksDiv.addEventListener('click', function (e) {
  if (e.target.classList.contains('delete')) {
    e.target.parentElement.remove();

    deleteTaskFromLocal(e.target.parentElement.getAttribute('data-id'));
  }
  if (e.target.classList.contains('task')) {
    addDonetoLocal(e.target.getAttribute('data-id'));
    e.target.classList.toggle('done');
  }
});

document.addEventListener("keyup", function (e) {
  if (e.key == "Enter") {
    if (input.value !== "") {
      addTaskToArray(input.value);
      input.value = "";
    }
  }
});

function addTaskToArray(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  }

  arrayOfTasks.push(task);

  addElementsToPageFrom(arrayOfTasks);

  addDataToLocal(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks) {
  tasksDiv.innerHTML = '';

  arrayOfTasks.forEach(task => {
    let div = document.createElement("div");
    div.className = "task";

    if (task.completed) {
      div.classList.add('done');
    }

    div.setAttribute("data-id", task.id);
    div.innerHTML = task.title;

    let span = document.createElement('span');
    span.innerHTML = "Delete";
    span.className = 'delete';
    div.appendChild(span);

    tasksDiv.appendChild(div);
  });
}

function addDataToLocal(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataToLocal() {
  let data = window.localStorage.getItem('tasks');
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}

function deleteTaskFromLocal(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocal(arrayOfTasks);
}

function addDonetoLocal(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed = !arrayOfTasks[i].completed;
    }
  }
  addDataToLocal(arrayOfTasks);
}

function clearAll() {
  if (tasksDiv.innerHTML != '') {

    let div = document.createElement('div');
    div.className = 'clearDiv';

    let input = document.createElement('input');
    input.type = "submit";
    input.className = 'clear';
    input.value = 'Clear All';
    div.appendChild(input);

    document.querySelector('.content').appendChild(div);

    input.addEventListener('click', function () {
      tasksDiv.innerHTML = '';

      localStorage.removeItem("tasks");
    });
  }
}

clearAll();
