function listTasks() {
    let lsItems = [];
    let items_store = localStorage.getItem('todo');
    if (items_store !== null) {
        lsItems = JSON.parse(items_store);
    }
    return lsItems;
}

function addTask(event) {
    event.preventDefault();
    const content = document.getElementById('inputTask');
    const task = {
        id: Date.now(),
        content: content.value,
        completed: false,
    }

    let lsItems = listTasks();
    lsItems.push(task);
    localStorage.setItem('todo', JSON.stringify(lsItems));
    content.value = '';
    content.focus();
    showTask();
    return false;
}

function showTask() {
    let lsItems = listTasks();
    let filter = getFilter();
    let tasks = [];
    if (filter == "completed") {
        tasks = lsItems.filter(filter => filter.completed == true);
    } else if (filter == "active") {
        tasks = lsItems.filter(filter => filter.completed == false);
    } else {
        tasks = lsItems;
    }
    let itemCount = tasks.length
    let buildHtml = '<ul>';
    for (let i = 0; i < tasks.length; i++) {
        let id = tasks[i].id;
        let content = tasks[i].content;
        buildHtml += '<li><input id="' + id + '" type="checkbox" class="complete"';
        if (tasks[i].completed == true) {
            buildHtml += ' checked />';
        } else {
            buildHtml += '/>';
        }
        buildHtml += '<span id="' + id + '">' + content + '</span>';
        buildHtml += '<button class="remove" id="' + id + '">x</button></li>';
    };
    buildHtml += '</ul>';

    document.getElementById('taskList').innerHTML = buildHtml;
    document.getElementById('count').innerHTML = itemCount;
    const buttons = document.getElementsByClassName('remove');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', removeTask);
    };
    const checked = document.getElementsByClassName('complete');
    for (let i = 0; i < checked.length; i++) {
        checked[i].addEventListener('click', checkTask);
    };
}

function removeTask() {
    const id = this.getAttribute('id');
    let lsItems = listTasks();
    let x = lsItems.findIndex(arr_id => arr_id.id.toString() === id);
    lsItems.splice(x, 1);
    localStorage.setItem('todo', JSON.stringify(lsItems));
    showTask();
    return false;
}

function checkTask() {
    const id = this.getAttribute('id');
    let lsItems = listTasks();
    let x = lsItems.findIndex(arr_id => arr_id.id.toString() === id);
    lsItems[x].completed = !lsItems[x].completed;
    localStorage.setItem('todo', JSON.stringify(lsItems));
    showTask();
    return false;
}

document.getElementById('submitTask').addEventListener('click', addTask);
showTask();

function getFilter() {
    let filterValue
    let radio = document.getElementsByName('taskFilter');
    for (let i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            filterValue = radio[i].value;
            break;
        }
    }
    console.log(filterValue);
    return filterValue;
}