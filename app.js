// Get DOM elements
const form = document.querySelector('.todo');
const input = document.querySelector('input');
const tasksList = document.querySelector('ul');
const submitButton = document.querySelector('.submit');
const filterTabs = document.querySelector('.filter-tabs');


// Create a box that get confirmation of task deletion
const deleteConfirmation = (task) => {
    // Create all the elements for the box and assign classes
    const body = document.querySelector('body');

    const confirmationContainer = document.createElement('div');
    confirmationContainer.classList.add('confirmation-box');
    
    const confirmationMessageBox = document.createElement('div');
    confirmationMessageBox.classList.add('delete-confirmation');

    const h2 = document.createElement('h2');
    h2.innerText = 'Are you sure you want to delete this task?';

    const h3 = document.createElement('h3');
    h3.innerText = 'It will be gone forever!';

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('confirmation-btns');

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    deleteButton.innerText = 'Delete';

    const cancelButton = document.createElement('button');
    cancelButton.classList.add('cancel-btn');
    cancelButton.innerText = 'Cancel';

    buttonsContainer.appendChild(deleteButton);
    buttonsContainer.appendChild(cancelButton);
    confirmationMessageBox.appendChild(h2);
    confirmationMessageBox.appendChild(h3);
    confirmationMessageBox.appendChild(buttonsContainer);
    confirmationContainer.appendChild(confirmationMessageBox);
    body.appendChild(confirmationContainer);

    // Remove task if confirmed, or cancel deletion and close window
    buttonsContainer.addEventListener('click', e => {
        if (e.target.className === 'delete-btn') {
            task.parentNode.classList.add('removed');
            task.parentNode.addEventListener('transitionend', () => {
                task.parentNode.remove();
                saveToLocalStorage(tasksList.innerHTML);
            });
            window.removeEventListener('keyup', keyboardEvent);
            body.removeChild(confirmationContainer);
        } else if (e.target.className === 'cancel-btn') {
            window.removeEventListener('keyup', keyboardEvent);
            body.removeChild(confirmationContainer);
        }
    })

    // Confirm if "enter" is pressed and cancel if "Escape" is pressed
    const keyboardEvent = e => {
        if (e.code === 'Enter') {
            task.parentNode.classList.add('removed');
            task.parentNode.addEventListener('transitionend', () => {
                task.parentNode.remove();
                saveToLocalStorage(tasksList.innerHTML);
            });
            window.removeEventListener('keyup', keyboardEvent);
            body.removeChild(confirmationContainer);
        } else if (e.code === 'Escape') {
            window.removeEventListener('keyup', keyboardEvent);
            body.removeChild(confirmationContainer);
        }
    }

    // Create event listener with call to function that will be canceled when either "delete" of "cancel" will be pressed
    window.addEventListener('keyup', keyboardEvent);
}



// Function that saves the data to local storage for later retrieval
const saveToLocalStorage = list => {
    localStorage.setItem('saved-todo', list);
}

// Retrieve the list from local storage and show all items on page load
window.addEventListener('load', () => {
    tasksList.innerHTML = localStorage.getItem('saved-todo');
    tasksList.childNodes.forEach(node => {
        node.style.display = 'flex';
    })
})

// Add task to the list on submit activated with keyboard
form.addEventListener('submit', e => {
    e.preventDefault();
    if (input.value.trim() === '') {
        return;
    }
    createTask(input.value);
})

// Add task to the list when submit ("+") button is clicked
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
    }, 0);

    form.reset();
}


// Tag item as "done" or "remove" depending on which button was clicked
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

    if (button.classList.contains('remove')) {
        deleteConfirmation(button);
    }   
})


// Filter To-Do items depending on which filter is used
filterTabs.addEventListener('click', e => {
    switch (e.target.id) {
        case 'tab-all':
            showAllItems();
            break;
        case 'tab-completed':
            showCompletedItems();
            break;
        case 'tab-incompleted':
            showIncompletedItems();
            break;
        default:
            showAllItems();
            break;
    }
})

const showAllItems = () => {
    tasksList.childNodes.forEach(node => {
        node.style.display = 'flex';
    });
}

const showCompletedItems = () => {
    tasksList.childNodes.forEach(node => {
        node.style.display = 'none';
        if (node.classList.contains('checked')) {
            node.style.display = 'flex';
        }
    })
}

const showIncompletedItems = () => {
    tasksList.childNodes.forEach(node => {
        node.style.display = 'none';
        if (!node.classList.contains('checked')) {
            node.style.display = 'flex';
        }
    })
}

// Change the color of active tab
filterTabs.addEventListener('click', e => {
    filterTabs.childNodes.forEach(tab => {
        if (tab.nodeType !== 3) {
            tab.classList.remove('active-tab');
        }
        e.target.classList.add('active-tab');
    })
})
