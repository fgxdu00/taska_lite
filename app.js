var tasks = [];

var taskInput = document.getElementById('task-input');
var addBtn = document.getElementById('add-btn');
var taskList = document.getElementById('task-list');

function loadTasks() {
    var saved = localStorage.getItem('tasks');
    if (saved) {
        tasks = JSON.parse(saved);
    }
    renderTasks();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = '';

    for (var i = 0; i < tasks.length; i++) {
        var task = tasks[i];

        var li = document.createElement('li');
        if (task.done) {
            li.className = 'done';
        }

        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.done;
        checkbox.dataset.index = i;
        checkbox.addEventListener('change', toggleTask);

        var span = document.createElement('span');
        span.textContent = task.text;

        var deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.dataset.index = i;
        deleteBtn.addEventListener('click', deleteTask);

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    }
}

function addTask() {
    var text = taskInput.value.trim();
    if (text === '') return;

    tasks.push({ text: text, done: false });
    saveTasks();
    renderTasks();
    taskInput.value = '';
}

function toggleTask(e) {
    var index = e.target.dataset.index;
    tasks[index].done = !tasks[index].done;
    saveTasks();
    renderTasks();
}

function deleteTask(e) {
    var index = e.target.dataset.index;
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

loadTasks();