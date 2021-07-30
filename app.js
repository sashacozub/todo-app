// Get DOM elements
const form = document.querySelector('.todo');
const input = document.querySelector('input');
const taskList = document.querySelector('ul');
const submitButton = document.querySelector('.submit');

// Add task to the list on submit
form.addEventListener('submit', e => {
    e.preventDefault();
    if (input.value === '') {
        return;
    }

    createTask(input.value);
    form.reset();
})



const createTask = (task) => {
    const newTask = document.createElement('li');
    task.charAt(0).toUpperCase();
    newTask.innerHTML = `
        <p>${task}</p>
        <i class="fas fa-check-square button check"></i>
        <i class="fas fa-trash-alt button remove"></i>
    `;

    taskList.appendChild(newTask)
}


taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove')) {
        e.target.parentNode.remove();
    }

    if (e.target.classList.contains('check')) {
        console.log('done')
    }
})

submitButton.addEventListener('click', () => {
    if (input.value === '') {
        return;
    }
    
    createTask(input.value);
});
