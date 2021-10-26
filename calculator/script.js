let numbers = document.querySelectorAll('.number'),
  operations = document.querySelectorAll('.operator'),
  decimalBtn = document.getElementById('decimal'),
  clearBtns = document.querySelectorAll('.clear-btn'),
  resultBtn = document.getElementById('result'),
  display = document.getElementById('display'),
  memoryCurrentNumber = 0,
  memoryNewNumber = false, /* Введено новое число или нет */
  memoryPendingOperation = '';  /* Ожидаемая операция */


for (let i = 0; i < numbers.length; i++) {
  let numberBtn = numbers[i];
  numberBtn.addEventListener('click', function (e) {
    numberPress(e.target.textContent); /* Ищем, что на содержание кнопки, на которую нажали и передаем number в функцию дальше*/
  }
  );
};

for (let i = 0; i < operations.length; i++) {
  let operationBtns = operations[i];
  operationBtns.addEventListener('click', function (e) {
    operation(e.target.textContent);
  });
};

for (let i = 0; i < clearBtns.length; i++) {
  let clearBtn = clearBtns[i];
  clearBtn.addEventListener('click', function (e) {
    clear(e.target.id); /* Ищем айди кнопки, которую нажали */
  });
};


decimalBtn.addEventListener('click', decimal);

resultBtn.addEventListener('click', operation);

function numberPress(number) {
  if (memoryNewNumber) {
    display.value = number;
    memoryNewNumber = false;
  } else {
    if (display.value === '0') {  /*заменяет ноль на дисплее на введнное число, если строго равно нулю замени на number (что кликнули в техтконтент*/
      display.value = number;
    } else
      display.value += number;
    };
  };


function operation(op) {
  let localOperationMemory = display.value; /* какое число было введено перед тем, как запутить матем. операцию */
  if (memoryNewNumber && memoryPendingOperation !== '=') {
    display.value = memoryCurrentNumber;
  } else
    memoryNewNumber = true;
  if (memoryPendingOperation === '+') {
    memoryCurrentNumber = Number((parseFloat(localOperationMemory) + parseFloat(memoryCurrentNumber)).toFixed(14)); /* Парсфлоат приводит к числу с точкой вместо строки */
  } else if (memoryPendingOperation === '-') {
    memoryCurrentNumber = Number((parseFloat(memoryCurrentNumber) - parseFloat(localOperationMemory)).toFixed(14));
  } else if (memoryPendingOperation === '*') {
    memoryCurrentNumber *= parseFloat(localOperationMemory);
  } else if (memoryPendingOperation === '/') {
    memoryCurrentNumber /= parseFloat(localOperationMemory);
  } else if (memoryPendingOperation === 'xy') {
    memoryCurrentNumber = Math.pow(parseFloat(memoryCurrentNumber), parseFloat(localOperationMemory));
  } else if (memoryPendingOperation === '√') {
    memoryCurrentNumber = Math.sqrt(parseFloat(localOperationMemory));
  }


    else {
    memoryCurrentNumber = parseFloat(localOperationMemory);
  };

  display.value = memoryCurrentNumber;
  memoryPendingOperation = op;
};



function decimal(e) {
  let localDecimalMemory = display.value;

  if (memoryNewNumber) {
    localDecimalMemory = '0.';
    memoryNewNumber = false;
  } else {
    if (localDecimalMemory.indexOf('.') === -1) {
      localDecimalMemory += '.';
    };
  };
  display.value = localDecimalMemory;
};

function clear(id) {
  if (id === 'c') {
    display.value = '0';
    memoryNewNumber = true;
  } else if (id === 'ce') {
    memoryCurrentNumber = 0, /* Все очистить */
    display.value = '0';
    memoryNewNumber = true; /* Введено новое число 0 */
    memoryPendingOperation = '';
  }
  console.log('Нажали на ' + id + '!');
};
