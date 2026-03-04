var tasks = [];

function loadTasks() {
    var saved = localStorage.getItem('tasks');
    if (saved) {
        tasks = JSON.parse(saved);
    }
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function generateId() {
    return Date.now().toString();
}

function addTask() {
    var input = document.getElementById('task-input');
    var text = input.value.trim();

    if (text === '') return;

    var task = {
        id: generateId(),
        text: text,
        done: false
    };

    tasks.unshift(task);
    saveTasks();
    renderTasks();

    input.value = '';
    input.focus();
}

function deleteTask(id) {
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks.splice(i, 1);
            break;
        }
    }
    saveTasks();
    renderTasks();
}

function toggleDone(id) {
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks[i].done = !tasks[i].done;
            break;
        }
    }
    saveTasks();
    renderTasks();
}

function startEdit(id) {
    renderTasks(id);
}

function saveEdit(id) {
    var input = document.getElementById('edit-' + id);
    var newText = input.value.trim();

    if (newText === '') return;

    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks[i].text = newText;
            break;
        }
    }

    saveTasks();
    renderTasks();
}

function renderTasks(editingId) {
    var list = document.getElementById('task-list');
    var emptyMsg = document.getElementById('empty-msg');

    list.innerHTML = '';

    if (tasks.length === 0) {
        emptyMsg.classList.add('visible');
        return;
    }

    emptyMsg.classList.remove('visible');

    for (var i = 0; i < tasks.length; i++) {
        var task = tasks[i];
        var li = document.createElement('li');
        li.className = 'task-item' + (task.done ? ' done' : '');

        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.done;
        checkbox.setAttribute('data-id', task.id);
        checkbox.addEventListener('change', (function(id) {
            return function() { toggleDone(id); };
        })(task.id));

        li.appendChild(checkbox);

        if (editingId === task.id) {
            var editInput = document.createElement('input');
            editInput.type = 'text';
            editInput.id = 'edit-' + task.id;
            editInput.value = task.text;
            editInput.addEventListener('keydown', (function(id) {
                return function(e) {
                    if (e.key === 'Enter') saveEdit(id);
                    if (e.key === 'Escape') renderTasks();
                };
            })(task.id));
            li.appendChild(editInput);

            var saveBtn = document.createElement('button');
            saveBtn.className = 'btn-save';
            saveBtn.textContent = 'Save';
            saveBtn.addEventListener('click', (function(id) {
                return function() { saveEdit(id); };
            })(task.id));
            li.appendChild(saveBtn);

            setTimeout(function() {
                var el = document.getElementById('edit-' + task.id);
                if (el) el.focus();
            }, 0);
        } else {
            var span = document.createElement('span');
            span.className = 'task-text';
            span.textContent = task.text;
            li.appendChild(span);

            var actions = document.createElement('div');
            actions.className = 'task-actions';

            var editBtn = document.createElement('button');
            editBtn.className = 'btn-edit';
            editBtn.textContent = 'Edit';
            editBtn.addEventListener('click', (function(id) {
                return function() { startEdit(id); };
            })(task.id));
            actions.appendChild(editBtn);

            var deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn-delete';
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', (function(id) {
                return function() { deleteTask(id); };
            })(task.id));
            actions.appendChild(deleteBtn);

            li.appendChild(actions);
        }

        list.appendChild(li);
    }
}

document.getElementById('add-btn').addEventListener('click', addTask);

document.getElementById('task-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') addTask();
});

loadTasks();
renderTasks();