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

  doneButton.addEventListener('click', () => {
    item.classList.toggle('list-group-item-success');
  });

  deleteButton.addEventListener('click', () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Вы уверены?')) {
      item.remove();
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

  for (let defaultItem of tasks) { // Create default tasks
    let defaultTask = createTodoItem(defaultItem.name);
    if (defaultItem.done) {
      defaultTask.item.classList.add('list-group-item-success');
    }
    todoList.append(defaultTask.item);
  }

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

  todoItemForm.form.addEventListener('submit', (e) => {
    e.preventDefault();

    todoItemForm.button.disabled = true; // Disabled button after submit

    if (!todoItemForm.input.value) {
      return;
    }

    let todoItem = createTodoItem(todoItemForm.input.value);
    todoList.append(todoItem.item);

    todoItemForm.input.value = '';
  });
}

// eslint-disable-next-line max-len
window.createTodoApp = createTodoApp; // Create new global method for window to create todoApp (func)
