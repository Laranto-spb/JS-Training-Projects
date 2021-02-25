let storageKeys = [{
  name: 'Мои дела',
  storageKey: 'myTasks',
},
{
  name: 'Папины дела',
  storageKey: 'dadTasks',
},
{
  name: 'Мамины дела',
  storageKey: 'momTasks',
},
];

let taskList;

function createAppTitle(title) { // Create title
  let appTitle = document.createElement('h2');
  appTitle.innerHTML = title;
  return appTitle;
}

function createTodoItemForm() { // Create form
  let form = document.createElement('form');
  let input = document.createElement('input');
  let buttonWrapper = document.createElement('div');
  let button = document.createElement('button');

  form.classList.add('input-group', 'mb-3');
  input.classList.add('form-control');
  input.placeholder = 'Введите название нового дела';
  buttonWrapper.classList.add('input-group-append');
  button.classList.add('btn', 'btn-primary');
  button.textContent = 'Добавить дело';

  buttonWrapper.append(button);
  form.append(input);
  form.append(buttonWrapper);

  return {
    form,
    input,
    button,
  };
}

function createTodoList() { // Create todo List (ul)
  let list = document.createElement('ul');
  list.classList.add('list-group');
  return list;
}

function createTodoItem(name) { // Create todo item (li)
  let item = document.createElement('li');

  let buttonGroup = document.createElement('div');
  let doneButton = document.createElement('buttton');
  let deleteButton = document.createElement('button');

  item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-itmes-center');
  item.textContent = name;

  buttonGroup.classList.add('btn-group', 'btn-group-sm');
  doneButton.classList.add('btn', 'btn-success');
  doneButton.textContent = 'Готово';
  deleteButton.classList.add('btn', 'btn-danger');
  deleteButton.textContent = 'Удалить';

  buttonGroup.append(doneButton);
  buttonGroup.append(deleteButton);
  item.append(buttonGroup);

  doneButton.addEventListener('click', (e) => {
    item.classList.toggle('list-group-item-success');

    let clickedTask = e.path[2];
    let listOfTasks = e.path[3].children;
    let clickedIndex = [...listOfTasks].indexOf(clickedTask);

    taskList.forEach((el, idx) => {
      if (item.classList.contains('list-group-item-success') && clickedIndex === idx) {
        el.isDone = true;
      }
      if (!item.classList.contains('list-group-item-success') && clickedIndex === idx) {
        el.isDone = false;
      }
    });

    let title = e.path[4].children[0].textContent; // Name of page

    for (let key of storageKeys) {
      if (title === key.name) {
        localStorage.setItem(key.storageKey, JSON.stringify(taskList));
      }
    }
  });

  deleteButton.addEventListener('click', (e) => {
    let clickedTask = e.path[2];
    let listOfTasks = e.path[3].children;
    let clickedIndex = [...listOfTasks].indexOf(clickedTask);
    let title = e.path[4].children[0].textContent; // Name of page

    // eslint-disable-next-line no-restricted-globals
    if (confirm('Вы уверены?')) {
      item.remove();

      taskList.forEach((el, idx) => {
        if (idx === clickedIndex) {
          taskList.splice(clickedIndex, 1);
        }
      });
    }
    for (let key of storageKeys) {
      if (title === key.name) {
        localStorage.setItem(key.storageKey, JSON.stringify(taskList));
      }
    }
  });

  return {
    item,
    doneButton,
    deleteButton,
  };
}

function createTodoApp(container, title = 'Список дел', tasks) { // Create todo app (nest all functions in one to create App)
  let todoAppTitle = createAppTitle(title);
  let todoItemForm = createTodoItemForm();
  let todoList = createTodoList();

  if (localStorage.getItem('myTasks') === null) {
    let defaultList = [];

    for (let task of tasks) {
      defaultList.push({
        name: task.name,
        isDone: task.done,
      });
    }

    for (let task of defaultList) {
      let taskItem = createTodoItem(task.name);
      if (task.isDone === true) {
        taskItem.item.classList.add('list-group-item-success');
      }
      todoList.append(taskItem.item);
    }

    for (let key of storageKeys) {
      localStorage.setItem(key.storageKey, JSON.stringify(defaultList)); // Add def tasks
    }
  }

  for (let key of storageKeys) {
    if (title === key.name) {
      taskList = JSON.parse(localStorage.getItem(key.storageKey)); // Get deff tasks from storage
    }
  }

  if (taskList) { // Render tasks from storage
    for (let savedUserTask of taskList) {
      let userTask = createTodoItem(savedUserTask.name);
      if (savedUserTask.isDone === true) {
        userTask.item.classList.add('list-group-item-success');
      }
      todoList.append(userTask.item);
    }
  }

  todoItemForm.form.addEventListener('submit', (e) => {
    e.preventDefault();

    todoItemForm.button.disabled = true; // Disabled button after submit

    if (!todoItemForm.input.value) {
      return;
    }

    let taskItem = createTodoItem(todoItemForm.input.value);
    todoList.append(taskItem.item);

    taskList.push({ // Add task to working array
      name: todoItemForm.input.value,
      isDone: false,
    });

    for (let key of storageKeys) {
      if (title === key.name) {
        localStorage.setItem(key.storageKey, JSON.stringify(taskList)); // Add array to storage
      }
    }

    todoItemForm.input.value = '';
  });

  container.append(todoAppTitle);
  container.append(todoItemForm.form);
  container.append(todoList);

  if (!todoItemForm.input.value) { // Button disabled by default at start
    todoItemForm.button.disabled = true;
  }

  todoItemForm.input.addEventListener('input', () => { // Button disabled when input and input empty
    todoItemForm.button.disabled = false;
    if (!todoItemForm.input.value) {
      todoItemForm.button.disabled = true;
    }
  });

  todoItemForm.input.addEventListener('focus', () => { // Button disabled when focused and input empty
    todoItemForm.button.disabled = false;
    if (!todoItemForm.input.value) {
      todoItemForm.button.disabled = true;
    }
  });
}

// eslint-disable-next-line max-len
window.createTodoApp = createTodoApp; // Create new global method for window to create todoApp (func)
