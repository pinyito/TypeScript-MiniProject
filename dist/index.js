"use strict";
;
const btn = document.getElementById('btn');
const input = document.getElementById('todoinput');
const form = document.querySelector('form');
const list = document.getElementById('todolist');
const todos = readTodos();
todos.forEach(createTodo);
function readTodos() {
    const todosJSON = localStorage.getItem('todos');
    if (todosJSON === null)
        return [];
    return JSON.parse(todosJSON);
}
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}
;
form.addEventListener('submit', function (e) {
    e.preventDefault();
    const newTodo = {
        text: input.value,
        status: false
    };
    createTodo(newTodo);
    todos.push(newTodo);
    saveTodos();
    input.value = '';
});
function createTodo(todo) {
    const newListElement = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.status;
    checkbox.addEventListener('change', function () {
        todo.status = checkbox.checked;
        saveTodos();
    });
    newListElement.append(todo.text);
    newListElement.append(checkbox);
    list.append(newListElement);
}
;
