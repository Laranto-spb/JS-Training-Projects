const studentsBase = [];



const form = document.getElementById('form');
const nameInput = document.getElementById('name');
const surnameInput = document.getElementById('surname');
const lastNameInput = document.getElementById('lastname');
const birthDateInput = document.getElementById('birth-date');
const startDateInput = document.getElementById('start-date');
const facultyInput = document.getElementById('faculty');
const addBtn = document.getElementById('add-btn');

const $studentsTable = document.querySelector('.student-table > tbody');
const tBody = document.querySelector('tbody');

const currentDate = new Date().getFullYear().toString() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();



function validateInputs() {
  const nameValue = nameInput.value.trim();
  const surNameValue = surnameInput.value.trim();
  const lastNameValue = lastNameInput.value.trim();

  if (nameValue.length <= 0 || surNameValue.length <= 0 || lastNameValue.length <= 0) {
    return 'Заполните все поля ФИО';
  } else if (birthDateInput.value > currentDate || birthDateInput.value < '1900-01-01') {
    return 'Введите корректную дату';
  } else if (startDateInput.value < 2000) {
    return 'Дата начала обучения не может быть меньше 2000';
  } else if (startDateInput.value > new Date().getFullYear().toString()) {
    return 'Дата начала обучения не может быть больше сегодня'
  } else if (facultyInput.value.length <= 0) {
    return 'Заполните поле "Факультет"';
  } else {
    return true;
  }

}

function getDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  return {
    year,
    month,
  };
}

function addToBase() {

  const studentInfo = {
    name: nameInput.value,
    surName: surnameInput.value,
    lastName: lastNameInput.value,
    birthDate: birthDateInput.value,
    startDate: startDateInput.value,
    faculty: facultyInput.value,
    endDate: (+startDateInput.value + 4).toString()
  };

  studentsBase.push(studentInfo);
}

function renderTable(base) {
  clearTable();

  const currentYear = getDate().year;
  const currentMonth = getDate().month + 1;

  base.forEach(({
    name,
    surName,
    lastName,
    birthDate,
    startDate,
    faculty,
    endDate
  }) => {
    const row = document.createElement('tr');
    const age = currentYear - birthDate.slice(0, 4);
    const endYear = currentYear - startDate + 1;

    let currentGrade;

    if (endYear > 4 || (endYear === 4 && currentMonth > 9)) {
      currentGrade = 'Закончил';
    } else {
      currentGrade = `${endYear} курс`;
    }

    function totalName() {
      return `${lastName} ${name} ${surName}`;
    }

    row.innerHTML = `<td>${totalName()}</td><td>${faculty}</td><td>${birthDate} (${age})</td><td>${startDate} - ${endDate} (${currentGrade})</td>`;
    $studentsTable.appendChild(row);

  })

}

const headers = Array.from(document.querySelector('.student-table').querySelectorAll('th'));

const sortTable = (asc = true, column) => {

  const dirMod = asc ? 1 : -1;

  column.classList.toggle('th-asc', asc);
  column.classList.toggle('th-desc', !asc);

  switch (column.id) {
    case 'studentName':
      studentsBase.sort((a, b) => `${a.lastName} ${a.name} ${a.surName}` > `${b.lastName} ${b.name} ${b.surName}` ? (1 * dirMod) : -1 * dirMod);
      break;

    case 'Faculty':
      studentsBase.sort((a, b) => a.faculty > b.faculty ? (1 * dirMod) : -1 * dirMod);
      break;

    case 'Date':
      studentsBase.sort((a, b) => a.birthDate > b.birthDate ? (1 * dirMod) : -1 * dirMod);
      break;

    case 'Year':
      studentsBase.sort((a, b) => a.startDate > b.startDate ? (1 * dirMod) : -1 * dirMod);
      break;

    default:
      console.log('No cases')
  }

}

const clearTable = () => {
  while ($studentsTable.firstChild) {
    $studentsTable.removeChild($studentsTable.firstChild);
  }
}

headers.forEach(el => {
  el.addEventListener('click', (e) => {
    const currentIsAsc = e.target.classList.contains('th-asc');
    clearTable();
    sortTable(!currentIsAsc, e.target);
    renderTable(studentsBase);
  })
})

addBtn.addEventListener('click', (e) => {
  e.preventDefault();

  if (validateInputs() === true) {
    addToBase();
    renderTable(studentsBase);
    form.querySelectorAll('input').forEach((el) => {
      if (el.id === 'birth-date') {
        el.value = '1900-01-01';
      } else if (el.id === 'start-date') {
        el.value = '2002';
      } else {
        el.value = '';
      }
    });
    isEmptyTable();
  } else {
    alert(validateInputs())
  }

});

const filterInputs = document.querySelectorAll('.filter-input')
filterInputs.forEach(el => {
  el.addEventListener('keyup', () => {
    filterTable()
  })
})

function filterTable() {

  const filteredArr = studentsBase.filter(student => {

    const nameFilter = document.getElementById('nameFilter');
    const surNameFilter = document.getElementById('surNameFilter');
    const lastNameFilter = document.getElementById('lastNameFilter');
    const facultyFilter = document.getElementById('facultyFilter');
    const startDateFilter = document.getElementById('startDateFilter');
    const endDateFilter = document.getElementById('endDateFilter');

    let result = true;

    if(nameFilter.value && !student.name.toLowerCase().startsWith(nameFilter.value.toLowerCase())) {
      return false;
    }
    if(surNameFilter.value && !student.surName.toLowerCase().startsWith(surNameFilter.value.toLowerCase())) {
      return false;
    }
    if(lastNameFilter.value && !student.lastName.toLowerCase().startsWith(lastNameFilter.value.toLowerCase())) {
      return false;
    }
    if(facultyFilter.value && !student.faculty.toLowerCase().startsWith(facultyFilter.value.toLowerCase())) {
      return false;
    }
    if(startDateFilter.value && !student.startDate.toLowerCase().startsWith(startDateFilter.value.toLowerCase())) {
      return false;
    }
    if(endDateFilter.value && !student.endDate.toLowerCase().startsWith(endDateFilter.value.toLowerCase())) {
      return false;
    }

    return result;

  })

  clearTable();
  renderTable(filteredArr);
  isEmptyTable()

}

function isEmptyTable() {

  if (tBody.hasChildNodes()) {
    document.querySelector('.no-info').classList.remove('active')
  } else {
    document.querySelector('.no-info').classList.add('active')
  }

}

isEmptyTable();
