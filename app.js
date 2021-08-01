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


// Create a new list item with user's input as text
const createTask = (task) => {
    const newTask = document.createElement('li');
    newTask.innerHTML = `
        <p>${task}</p>
        <i class="fas fa-check-square button check"></i>
        <i class="fas fa-trash-alt button remove"></i>
    `;
    tasksList.appendChild(newTask);
    saveToLocalStorage(tasksList.innerHTML);
    form.reset();
}


// Check item as done or remove depending on which button was clicked
tasksList.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove')) {
        e.target.parentNode.classList.add('removed');
        e.target.parentNode.addEventListener('transitionend', () => {
            e.target.parentNode.remove();
            saveToLocalStorage(tasksList.innerHTML);
        })
    }
    if (e.target.classList.contains('check')) {
        e.target.parentNode.classList.toggle('checked');
        saveToLocalStorage(tasksList.innerHTML);
    }
})

const saveToLocalStorage = list => {
    localStorage.setItem('saved-todo', list);
}

window.addEventListener('load', () => {
    tasksList.innerHTML = localStorage.getItem('saved-todo');
})


