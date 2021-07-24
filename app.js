// Get DOM elements
const form = document.querySelector('.todo');
const input = document.querySelector('input');
const taskList = document.querySelector('ul');

// Add task to the list on submit
form.addEventListener('submit', e => {
    e.preventDefault();
    if (input.value === '') {
        return;
    }

    createTask(input.value);
    input.value = '';
})



const createTask = (task) => {
    const newTask = document.createElement('li');
    newTask.classList.add('test');
    newTask.innerHTML = `
        <p>${task}</p>
        <div>
            <button class="add">Check</button>
            <button class="remove">Delete</button>
        </div>
    `;

    taskList.appendChild(newTask)
}


taskList.addEventListener('click', (e) => {
    if (e.target.className === 'remove') {
        e.target.parentNode.parentNode.remove()
    }
})