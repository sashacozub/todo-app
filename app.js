// Get DOM elements
const form = document.querySelector('.todo');
const input = document.querySelector('input');
const tasksList = document.querySelector('ul');
const submitButton = document.querySelector('.submit');

// Add task to the list on submit
form.addEventListener('submit', e => {
    e.preventDefault();
    if (input.value.trim() === '') {
        return;
    }
    createTask(input.value);
})

// Add task to the list when submit button is clicked
submitButton.addEventListener('click', () => {
    if (input.value.trim() === '') {
        return;
    }
    createTask(input.value);
});


const createTask = task => {
    // Create container for new task
    const newTask = document.createElement('div');

    // Create a list item that will contain the text
    const taskText = document.createElement('li');
    taskText.innerText = task;

    // Create buttons
    const buttonDone = document.createElement('button');
    const buttonRemove = document.createElement('button');

    // Create icons for the buttons
    const iconDone = document.createElement('i');
    const iconRemove = document.createElement('i');

    // Assign classes to elements
    newTask.className = 'new-task';
    buttonDone.className = 'task-btn check';
    buttonRemove.className = 'task-btn remove';
    iconDone.className = 'fas fa-check-square fa-2x';
    iconRemove.className = 'fas fa-trash-alt fa-2x';

    // Combine all elements in one and append to the list
    buttonDone.appendChild(iconDone);
    buttonRemove.appendChild(iconRemove);
    newTask.appendChild(taskText);
    newTask.appendChild(buttonDone);
    newTask.appendChild(buttonRemove);
    tasksList.appendChild(newTask);

    // This makes the task smoothly appear straight after added
    setTimeout(() => {
        newTask.classList.add('task-appear');
        saveToLocalStorage(tasksList.innerHTML);
    }, 0)

    form.reset();
}


// Check item as done or remove depending on which button was clicked
tasksList.addEventListener('click', e => {
    // Grab the actual button and not the icon
    const button = e.target.parentNode;
    if (button.classList.contains('check')) {
        // Change style for task container
        button.parentNode.classList.toggle('checked');
        button.previousSibling.classList.toggle('text-check');
        button.parentNode.addEventListener('transitionend', () => {
            saveToLocalStorage(tasksList.innerHTML);
        })
    }
    /********* PERMA-DELETE *********/
    if (button.classList.contains('remove')) {
        button.parentNode.classList.add('removed');
        button.parentNode.addEventListener('transitionend', () => {
            button.parentNode.remove();
            saveToLocalStorage(tasksList.innerHTML);
        })
    }

    /********* TEMP-DELETE *********/
    // if (button.classList.contains('remove')) {
    //     button.parentNode.classList.add('removed');
    //     button.parentNode.addEventListener('transitionend', () => {
    //         button.parentNode.style.display = 'none';
    //         saveToLocalStorage(tasksList.innerHTML);
    //     })
    // }    
})

const saveToLocalStorage = list => {
    localStorage.setItem('saved-todo', list);
}

window.addEventListener('load', () => {
    tasksList.innerHTML = localStorage.getItem('saved-todo');
})