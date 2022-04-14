const formTask = document.querySelector('.todo-control');
const todoList = document.querySelector('.todo-list');
const completedList = document.querySelector('.todo-completed');

let taskList = [];

formTask.addEventListener('submit', function(event) {
  event.preventDefault();
  const textTask = document.querySelector('.header-input');

  if (textTask.value.length > 0) {
    const newTask = {
      text: textTask.value,
      completed: false
    };
    taskList.push(newTask);
    textTask.value = '';
    updateList();
  }
});

function updateList() {
  todoList.innerHTML = '';
  completedList.innerHTML = '';
  taskList.forEach(function(item,index) {
    const listItem = document.createElement('li');
  
    listItem.classList.add('todo-item');
    listItem.innerHTML = '<span class="text-todo">' + item.text +'</span>' +
      '<div class="todo-buttons">' + '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' + '</div>';
    
    if (item.completed) {
      completedList.append(listItem);
    } else {
      todoList.append(listItem);
    }

    listItem.querySelector('.todo-complete').addEventListener('click', function () {
      item.completed = !item.completed;
      updateList();
    });   

    listItem.querySelector('.todo-remove').addEventListener('click', function () {
      taskList.splice(index, 1);
      updateList();
    });

  });
  localStorage.tasks = JSON.stringify(taskList);
}

if (typeof localStorage.tasks !== 'undefined') {
  taskList = JSON.parse(localStorage.tasks);
}
updateList();
