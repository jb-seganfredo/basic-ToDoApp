window.addEventListener('load', () => {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    const nameInput = document.getElementById('name');
    const newTodoForm = document.getElementById('todo-form');

    const username = localStorage.getItem('username');
    if (username) {
        nameInput.value = username;
    }

    nameInput.addEventListener('input', (e) => {
        localStorage.setItem('username', e.target.value);
    });

    newTodoForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const content = e.target.elements.content.value;
        const category = e.target.elements.category.value;

        if (!content.trim()) {
            alert('Please enter the task content!');
            return; 
        }

        if (!category) {
            alert('Please select a category!');
            return; 
        }

        const todo = {
            content: content,
            category: category,
            done: false,
            createdAt: new Date().getTime()
        };

        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));

        e.target.reset();
        DisplayTodos();
    });

    DisplayTodos();

    function DisplayTodos() {
        const todoList = document.querySelector('.todo-list');
        todoList.innerHTML = "";

        todos.forEach(todo => {
            const todoItem = document.createElement('div');
            todoItem.classList.add('todo-item');

            const label = document.createElement('label');
            const input = document.createElement('input');
            const span = document.createElement('span');
            const content = document.createElement('div');
            const actions = document.createElement('div');
            const edit = document.createElement('button');
            const deleteButton = document.createElement('button');

            input.type = 'checkbox';
            input.checked = todo.done;
            span.classList.add('bubble', todo.category || 'default-category');
            content.classList.add('todo-content');
            actions.classList.add('actions');
            edit.classList.add('edit');
            deleteButton.classList.add('delete');

            content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
            edit.textContent = 'Edit';
            deleteButton.textContent = 'Delete';

            label.appendChild(input);
            label.appendChild(span);
            actions.appendChild(edit);
            actions.appendChild(deleteButton);
            todoItem.appendChild(label);
            todoItem.appendChild(content);
            todoItem.appendChild(actions);
            todoList.appendChild(todoItem);

            if (todo.done) {
                todoItem.classList.add('done');
            }

            input.addEventListener('change', () => {
                todo.done = input.checked;
                localStorage.setItem('todos', JSON.stringify(todos));
                DisplayTodos();
            });

            edit.addEventListener('click', () => {
                const inputField = content.querySelector('input');
                inputField.removeAttribute('readonly');
                inputField.focus();
                inputField.addEventListener('blur', () => {
                    inputField.setAttribute('readonly', true);
                    todo.content = inputField.value;
                    localStorage.setItem('todos', JSON.stringify(todos));
                    DisplayTodos();
                });
            });

            deleteButton.addEventListener('click', () => {
                todos = todos.filter(t => t !== todo);
                localStorage.setItem('todos', JSON.stringify(todos));
                DisplayTodos();
            });
        });
    }
});
