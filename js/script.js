function addTask() {
    var taskInput = document.getElementById('taskInput');
    var taskText = taskInput.value.trim();

    if (taskText !== '') {
        var tasksContainer = document.getElementById('tasks');
        var newTask = document.createElement('li');
        newTask.innerHTML = `
            <section class="note">
                <p>${taskText}</p>
                <button onclick="deleteTask(this)">usuń</button>
            </section>
        `;
        
        tasksContainer.appendChild(newTask);
        taskInput.value = '';

        saveTasksInCookies();

    }
}

function deleteTask(deleteBtn) {
    var taskItem = deleteBtn.parentNode;
    taskItem.parentNode.removeChild(taskItem);

    saveTasksInCookies();
}

function saveTasksInCookies() {
    var tasksContainer = document.getElementById('tasks');
    var tasks = tasksContainer.querySelectorAll('.note p');
    var tasksArray = Array.from(tasks).map(task => task.textContent);
    document.cookie = `tasks=${JSON.stringify(tasksArray)};`;
}

window.onload = function() {
    var tasksContainer = document.getElementById('tasks');
    var savedTasks = getCookie('tasks');

    if (savedTasks) {
        savedTasks = JSON.parse(savedTasks);
        for (var i = 0; i < savedTasks.length; i++) {
            var newTask = document.createElement('li');
            newTask.innerHTML = `
                <section class="note">
                    <p>${savedTasks[i]}</p>
                    <button onclick="deleteTask(this)">usuń</button>
                </section>
            `;
            tasksContainer.appendChild(newTask);
        }
    }
};

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}