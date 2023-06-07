var todos = [];
window.addEventListener('load', () => {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    const nameinput = document.querySelector('#name');
    const newTodoForm = document.querySelector('#new-todo-form');

    const username = localStorage.getItem('username') || '';
    nameinput.value = username;

    nameinput.addEventListener('change', e => {
        localStorage.setItem('username', e.target.value)
    })

    newTodoForm.addEventListener('submit', e => {
        e.preventDefault();
        console.log('Vyyy')
        var todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createAt: new Date(),
            milicreateAt: new Date().getTime(),
            completetionDate: new Date(e.target.elements.completetionDate.value),
            milicompletetionDate: new Date(e.target.elements.completetionDate.value).getTime()
        }
        // console.log(new Date());
        console.log("Ngay hoan thành" + todo.completetionDate);
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos))

        e.target.reset();

        DisplayTodo();
    })

    DisplayTodo();

    const btnsortByCompleteletionDate = document.querySelector('.sortByCompleteletionDate');
    btnsortByCompleteletionDate.addEventListener('click', e => {
        todos.sort((a, b) => a.milicompletetionDate - b.milicompletetionDate);
        localStorage.setItem('todos', JSON.stringify(todos));
        console.log(todos)
        DisplayTodo();
        console.log('Zy da bam sort');
    })

    const btnSortByCreateAt = document.querySelector('.sortByCreateAt');
    btnSortByCreateAt.addEventListener('click', e => {
        todos.sort((a, b) => a.milicreateAt - b.milicreateAt);
        localStorage.setItem('todos', JSON.stringify(todos));
        console.log(todos)
        DisplayTodo();
        console.log('Zy da bam sort1');

    })
})


function DisplayTodo() {
    const todoList = document.querySelector('#todo-list');
    todoList.innerHTML = '';

    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');

        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('div');
        const datee = document.createElement('div');
        const createAt = document.createElement('div');
        const completeDate = document.createElement('div');
        const actions = document.createElement('div');

        const edit = document.createElement('button');
        const del = document.createElement('button');

        input.type = 'checkbox';
        input.checked = todo.done;
        span.classList.add('bubble');
        if (todo.category == 'personal') {
            span.classList.add('personal');
        } else {
            span.classList.add('business');
        }

        content.classList.add('todo-content');
        datee.classList.add('date');
        datee.appendChild(createAt);

        createAt.innerHTML = `${todo.createAt}`;
        completeDate.innerHTML = `${todo.completetionDate}`;

        datee.appendChild(completeDate);
        actions.classList.add('action')
        edit.classList.add('edit');
        del.classList.add('delete');
        content.innerHTML = ` <input type="text" value="${todo.content}" readonly>`;
        edit.innerHTML = 'Edit';
        del.innerHTML = 'Delete';

        label.appendChild(input);
        label.appendChild(span);

        actions.appendChild(edit);
        actions.appendChild(del);

        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);
        todoItem.appendChild(datee);
        todoList.appendChild(todoItem);

        if (todo.done) {
            todoItem.classList.add('done');
        }

        input.addEventListener('click', e => {
            todo.done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos))

            if (todo.done) {
                todoItem.classList.add('done');
            } else {
                todoItem.classList.remove('done');
            }

            DisplayTodo();
        })

        edit.addEventListener('click', e => {
            const input = content.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();

            input.addEventListener('blur', e => {
                input.setAttribute('readonly', true);
                todo.content = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                DisplayTodo();
            })
        })

        del.addEventListener('click', e => {
            todos = todos.filter(t => t != todo)
            localStorage.setItem('todos', JSON.stringify(todos));
            DisplayTodo();
        })

        setInterval(() => {
            const timeRemaining = Math.floor((new Date(todo.completetionDate) - new Date()) / 1000);

            console.log("tg con lai" + timeRemaining)
            if (timeRemaining == 25 && timeRemaining >= 0) {
                console.log("Cảnh báo! Chỉ còn 5 giây cho completetionDate của todo:", todo);
                alert("Cảnh báo! Chỉ còn 5 giây cho completetionDate của todo:", todo);
                todoItem.classList.add('warn')
            }

        }, 1000);
    });


    



}









