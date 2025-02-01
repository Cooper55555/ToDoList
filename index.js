document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTaskToDOM(task.text, task.date));
}

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskDateInput = document.getElementById("taskDate");
    const taskText = taskInput.value.trim();
    const taskDate = taskDateInput.value;

    if (taskText !== "" && taskDate !== "") {
        addTaskToDOM(taskText, taskDate);
        saveTask(taskText, taskDate);
        taskInput.value = "";
        taskDateInput.value = "";
    } else {
        alert("Please enter a task and select a date/time!");
    }
}

function addTaskToDOM(taskText, date) {
    const taskList = document.getElementById("taskList");
    const listItem = document.createElement("li");

    const taskContent = document.createElement("div");
    taskContent.className = "task-content";

    const dateElement = document.createElement("div");
    dateElement.textContent = new Date(date).toLocaleString();
    dateElement.className = "date";

    const taskTextElement = document.createElement("div");
    taskTextElement.textContent = taskText;
    taskTextElement.className = "task-text";

    taskContent.appendChild(dateElement);
    taskContent.appendChild(taskTextElement);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete";
    deleteButton.onclick = function() {
        taskList.removeChild(listItem);
        removeTaskFromStorage(taskText);
    };

    listItem.appendChild(taskContent);
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
}

function saveTask(taskText, date) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: taskText, date: date });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTaskFromStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}