document.addEventListener('DOMContentLoaded', function() {
    const todoForm = document.getElementById('todoForm');
    const todoInput = document.getElementById('todoInput');
    const todoList = document.getElementById('todoList');
    const filter = document.getElementById('filter');
    const clearCompleted = document.getElementById('clearCompleted');

    // Retrieve tasks from local storage
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    // Display existing tasks from local storage
    todos.forEach(todo => {
        const todoItem = createTodoItem(todo.text, todo.completed);
        todoList.appendChild(todoItem);
    });

    todoForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const todoText = todoInput.value.trim();
        if (todoText === '') return;

        const todoItem = createTodoItem(todoText);
        todoList.appendChild(todoItem);

        todos.push({ text: todoText, completed: false });
        localStorage.setItem('todos', JSON.stringify(todos));

        todoInput.value = '';
    });

    todoList.addEventListener('click', function(event) {
        const target = event.target;

        if (target.classList.contains('delete-btn')) {
            const li = target.parentElement;
            const todoText = li.textContent.trim();

            // Remove from todos array
            todos = todos.filter(todo => todo.text !== todoText);

            // Update local storage
            localStorage.setItem('todos', JSON.stringify(todos));

            li.remove();
        } else if (target.tagName === 'LI') {
            target.classList.toggle('completed');

            // Update todos array
            const todoText = target.textContent.trim();
            todos.forEach(todo => {
                if (todo.text === todoText) {
                    todo.completed = !todo.completed;
                }
            });

            // Update local storage
            localStorage.setItem('todos', JSON.stringify(todos));
        }
    });

    filter.addEventListener('change', function() {
        const selectedFilter = filter.value;
        const todoItems = todoList.querySelectorAll('li');

        todoItems.forEach(item => {
            switch (selectedFilter) {
                case 'completed':
                    item.style.display = item.classList.contains('completed') ? 'flex' : 'none';
                    break;
                case 'active':
                    item.style.display = item.classList.contains('completed') ? 'none' : 'flex';
                    break;
                default:
                    item.style.display = 'flex';
            }
        });
    });

    clearCompleted.addEventListener('click', function() {
        const completedItems = todoList.querySelectorAll('li.completed');

        completedItems.forEach(item => {
            const todoText = item.textContent.trim();

            // Remove from todos array
            todos = todos.filter(todo => todo.text !== todoText);

            // Update local storage
            localStorage.setItem('todos', JSON.stringify(todos));

            item.remove();
        });
    });

    function createTodoItem(todoText, completed = false) {
        const li = document.createElement('li');
        li.textContent = todoText;

        if (completed) {
            li.classList.add('completed');
        }

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';

        li.appendChild(deleteBtn);

        return li;
    }
});
