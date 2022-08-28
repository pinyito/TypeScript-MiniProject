
interface Todo {
    text: string;
    status: boolean;
};

const btn = document.getElementById('btn')! as HTMLButtonElement;
const input = document.getElementById('todoinput')! as HTMLInputElement;
const form = document.querySelector('form')!;
const list = document.getElementById('todolist')!;

const todos: Todo[] = readTodos();
todos.forEach(createTodo);

function readTodos(): Todo[]{
    const todosJSON = localStorage.getItem('todos');
    if(todosJSON === null) return [];
    return JSON.parse(todosJSON);
}

function saveTodos(){
    localStorage.setItem('todos', JSON.stringify(todos));
};

form.addEventListener('submit', function (e: SubmitEvent) {
        e.preventDefault();
        const newTodo: Todo = {
            text: input.value,
            status: false
        };
        createTodo(newTodo);
        todos.push(newTodo);
        
        saveTodos();
        input.value = '';
    });

    function createTodo(todo: Todo){
        const newListElement = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.status;
        checkbox.addEventListener('change', function(){
            todo.status = checkbox.checked;
            saveTodos();
        });
        newListElement.append(todo.text);
        newListElement.append(checkbox);
        list.append(newListElement);
    };