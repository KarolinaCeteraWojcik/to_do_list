const taskInput = document.querySelector('#taskInput');
const priorityInput = document.querySelector('#priorityInput');
const addTaskButton = document.querySelector('#addTaskButton');
const removeFinishedTasksButton = document.querySelector('#removeFinishedTasksButton');
const taskList = document.querySelector('#taskList');

let counter = document.querySelector('#counter');
counter.innerText = 0;
let counterAsNumber = parseInt(counter.innerText, 10);

function increaseCounter() {
    counterAsNumber++;
    counter.innerText = counterAsNumber;
}

function decreaseCounter() {
    counterAsNumber--;
    counter.innerText = counterAsNumber;
}

function createLiElement () {
    const task = document.createElement('li');
    task.className = 'task to-do';
    const taskText = document.createElement('h3');
    taskText.classList.add('task-text');
    taskText.innerText = taskInput.value;
    task.appendChild(taskText);

    if (priorityInput.value > 0) {
        const priority = document.createElement('span');
        priority.className = "priority";
        priority.innerText = `Priority: ${priorityInput.value}`;
        priority.setAttribute('data-priority', `${priorityInput.value}`);
        taskText.appendChild(priority);
        priorityInput.value = '';
    }

    return task;
}

// Local storage

// przy pobieraniu wartości z inputa - aktualizować obiekt i wpychać do tablicy

// function saveTaskToLocalStorage () {
//     const dataFromLocalStorage = [];
//     if(localStorage.getItem())
// }


function createButtonDelete () {
    const buttonDelete = document.createElement('button');
    buttonDelete.innerText = 'Delete';
    buttonDelete.className = 'delete';
    return buttonDelete;
}

function createButtonCompleted () {
    const buttonCompleted = document.createElement('button');
    buttonCompleted.innerText = 'Completed';
    buttonCompleted.className = 'complete';
    return buttonCompleted;
}

function completeTask() {
    const task = this.parentElement;
    if (this.className === 'complete') {
        task.classList.remove('to-do');
        task.classList.add('completed');
        this.classList.add('reset');
        this.innerText = 'Reset';
        decreaseCounter();
    } else {
        task.classList.remove('completed');
        task.classList.add('to-do');
        this.classList.add('complete');
        this.classList.remove('reset');
        this.innerText = 'Completed';
        increaseCounter();
    }
}

function deleteTask() {
    this.parentElement.remove();
    const task = this.parentElement.firstElementChild;
    if (task.className !== 'task completed') {
        decreaseCounter();
    }
}

function removeFinishedTask() {
    const completedTasks = document.querySelectorAll('.completed');
    completedTasks.forEach(function (completed) {
        taskList.removeChild(completed);
    });
}

function addTask () {
    if (taskInput.value.length < 5 || taskInput.value.length > 100) {
        alert('You can enter from 5 to 100 letter');
        return false;
    }

    const task = createLiElement();
    const buttonDelete = createButtonDelete();
    task.appendChild(buttonDelete);
    const buttonCompleted = createButtonCompleted();
    task.appendChild(buttonCompleted);
    taskList.appendChild(task);
    taskInput.value = '';
    increaseCounter();

    buttonCompleted.addEventListener('click', completeTask);
    buttonDelete.addEventListener('click', deleteTask);

    // const removeFinishedTasksButton = document.querySelector('#removeFinishedTasksButton');
    removeFinishedTasksButton.addEventListener('click', removeFinishedTask);

    // return taskList; - do local storage?
}

addTaskButton.addEventListener('click', addTask);


//
// const listChildren = [...taskList.children];
// localStorage.setItem('addedTasks', JSON.stringify(listChildren));
//
