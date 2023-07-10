var todos = [];
var tasks = [];
var done = [];
var unfinished = [];
// var files;
window.addEventListener('load', () => {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    done = JSON.parse(localStorage.getItem('done')) || [];
    unfinished = JSON.parse(localStorage.getItem('unfinished')) || [];

    var listFileName = [];

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
        console.log("area = " + e.target.elements.note.value)
        var todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createAt: new Date(),
            milicreateAt: new Date().getTime(),
            completetionDate: new Date(e.target.elements.completetionDate.value),
            milicompletetionDate: new Date(e.target.elements.completetionDate.value).getTime(),
            description: document.querySelector('.description').value,
            note: e.target.elements.note.value,
            // file: e.target.elements.file.value
            file: listFileName
        }
        console.log(todo.category);
        if (todo.category == "task") {
            tasks.push(todo);
            localStorage.setItem('tasks', JSON.stringify(tasks))
            DisplayTodo(tasks);
            console.log(document.querySelector('#task'))
            document.querySelector('#tasks').checked = true;
        }
        else {
            todos.push(todo);
            localStorage.setItem('todos', JSON.stringify(todos))
            DisplayTodo(todos);
            document.querySelector('#todos').checked = true;
        }

        unfinished.push(todo);
        localStorage.setItem('unfinished', JSON.stringify(unfinished))
        e.target.reset();

        

    })

    DisplayTodo(tasks);

    var categoryList = document.getElementsByName("categoryList");

    for (var i = 0; i < categoryList.length; i++) {
        categoryList[i].addEventListener("change", function () {
            if (this.checked) {
                if (this.id === "tasks") {
                    DisplayTodo(tasks);
                } else if (this.id === "todos") {
                    DisplayTodo(todos);
                }
                else if(this.id === "done"){
                    DisplayTodo(done);
                }
                else if(this.id === "unfinished"){
                    DisplayTodo(unfinished);
                }
            }
        });
    }

    var inputfile = document.querySelector('input[type="file"]');
    
    
    
    inputfile.addEventListener('change', function(){
        
        checkFiles();

    })
    

    function checkFiles(){
        files = inputfile.files;
        console.log(files)
        var size = 0;
        for (var i = 0; i < files.length; i++) {
            size += files[i].size;
        }

        if(size> 10 * 1024 * 1024){
            alert("Kích thước phải nhỏ hơn 10 MB");
            
            inputfile.value = "";
            return 0;
        }else{
            for (var i = 0; i < files.length; i++) {
                listFileName.push(files[i].name)
            }
        }
        return 1;
        
    }

    var date = document.querySelector('#completetionDate')
    
    function checkDate(){
        ngayhoanthanh = new Date(date.value);
        ngayhientai = new Date();
        console.log(ngayhoanthanh)
        if(ngayhoanthanh<ngayhientai){
            alert("Ngày hoàn thành phải sau ngày hiện tại")
            return 0;
        }
        return 1;
    }

    date.addEventListener('change',checkDate)
})

function DisplayTodo(arr) {
    const todoList = document.querySelector('#todo-list');
    todoList.innerHTML = '';

    arr.forEach(todo => {
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
        if (todo.category == 'task') {
            span.classList.add('task');
        } else {
            span.classList.add('todo');
        }

        content.classList.add('todo-content');
        datee.classList.add('date');
        // datee.appendChild(createAt);

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
            console.log("check", e.target.checked);
            localStorage.setItem('todos', JSON.stringify(todos))
            localStorage.setItem('tasks', JSON.stringify(tasks))
            

            if (todo.done) {
                todoItem.classList.add('done');
                done.push(todo)
                console.log(todo)
                unfinished = unfinished.filter(t => t != todo)
                localStorage.setItem('unfinished', JSON.stringify(unfinished))
                localStorage.setItem('done', JSON.stringify(done))
            } else {
                todoItem.classList.remove('done');
                unfinished.push(todo)
                done = done.filter(t => t != todo)
                localStorage.setItem('done', JSON.stringify(done))
                localStorage.setItem('unfinished', JSON.stringify(unfinished))
            }

            DisplayTodo(arr);
        })

        edit.addEventListener('click', e => {
            const input = content.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();

            input.addEventListener('blur', e => {
                input.setAttribute('readonly', true);
                todo.content = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos))
                localStorage.setItem('tasks', JSON.stringify(tasks))

                
                DisplayTodo(arr);
            })
        })

        del.addEventListener('click', e => {
            arr = arr.filter(t => t != todo)
            if (document.querySelector('#tasks').checked)
                localStorage.setItem('tasks', JSON.stringify(arr));
            else
                localStorage.setItem('todos', JSON.stringify(arr));
            DisplayTodo(arr);
        })



        // setInterval(() => {
        //     const timeRemaining = Math.floor((new Date(todo.completetionDate) - new Date()) / 1000);

        //     console.log("tg con lai" + timeRemaining)
        //     if (timeRemaining == 25 && timeRemaining >= 0) {
        //         console.log("Cảnh báo! Chỉ còn 5 giây cho completetionDate của todo:", todo);
        //         alert("Cảnh báo! Chỉ còn 5 giây cho completetionDate của todo:", todo);
        //         todoItem.classList.add('warn')
        //     }

        // }, 1000);
    });
}


const btnsortByCompleteletionDate = document.querySelector('.sortByCompleteletionDate');
btnsortByCompleteletionDate.addEventListener('click', e => {

    if (document.querySelector('#tasks').checked) {
        tasks.sort((a, b) => a.milicompletetionDate - b.milicompletetionDate);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        DisplayTodo(tasks);
    }

    else {
        todos.sort((a, b) => a.milicompletetionDate - b.milicompletetionDate);
        localStorage.setItem('todos', JSON.stringify(todos));
        DisplayTodo(todos);
    }

    console.log('Zy da bam sort');
})

const btnSortByCreateAt = document.querySelector('.sortByCreateAt');
btnSortByCreateAt.addEventListener('click', e => {

    if (document.querySelector('#tasks').checked) {
        tasks.sort((a, b) => a.milicreateAt - b.milicreateAt);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        DisplayTodo(tasks);
    }
    else {
        todos.sort((a, b) => a.milicreateAt - b.milicreateAt);
        localStorage.setItem('todos', JSON.stringify(todos));
        DisplayTodo(todos);
    }
    console.log('Zy da bam sort1');

})


var quill = new Quill('#editor', {
    theme: 'snow',
    placeholder: 'Description..'
  });
  
quill.on('text-change', function() {
    var html = quill.root.innerHTML;
    document.getElementById('myTextarea').value = html;
  });









