const time = document.querySelector('.time'),
    date = document.querySelector('.date'),
    greeting = document.querySelector('.greeting'),
    name = document.querySelector('.name'),
    focus = document.querySelector('.focus');

// Опции

const showAmPm = false;

function showTime () { // показать  время
    let today = new Date(), //узнать дату сегодня
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();

    const amPm = hour >= 12 ? 'PM' : 'AM';  // АМ или РМ  

    // hour = hour % 12 || 12;  //12-ти часовой формат 

    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}<span></span> ${showAmPm ? amPm : ''}`; // создает спаны внутри time и вставляет переменные

    setTimeout(showTime, 1000)  // setTimeot  - самовыз функция, аргументы (что вызвать, задержка вызова)

}



// Добавить нули перед минутами и секундами, когда единицы

function addZero (n) {  // n берем значение секунд и минут
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Показать дату

function showDate ()  {
    let weekDays = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
        months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
    let today = new Date(),
        weekDay = weekDays[today.getDay()],
        day = today.getDate(),
        month = months[today.getMonth()],
        year = today.getFullYear();

    date.innerHTML = `${weekDay}<span>,</span> ${day}<span></span> ${month}<span></span> ${year}<span></span>`;
}

// Добавление фона и приветствия 

function changeBgGreet () {

    let today = new Date(),
        hour = today.getHours();
    if (hour < 4) {
        // night
        document.body.style.backgroundImage = 'url("assets/images/night/05.jpg")';
        greeting.textContent = 'Good night, ';

    } else if (hour < 12) {
        // morning 
        document.body.style.backgroundImage = 'url("assets/images/morning/05.jpg")';
        greeting.textContent = 'Good morning, ';
    } else if (hour < 18) {
        // day
        document.body.style.backgroundImage = 'url("assets/images/day/05.jpg")';
        greeting.textContent = 'Good day, ';
        
    } else {
        // evening 
        document.body.style.backgroundImage = 'url("assets/images/evening/05.jpg")';
        greeting.textContent = 'Good evening,';
        
    }
}



// Получить имя для хранения 

function getName ()  {
    if (localStorage.getItem('name') === null) { // Если в поле name ничего не было введено ранее, хранится null
        name.textContent = '[Enter your Name]';
    } else {
        name.textContent = localStorage.getItem('name'); // Получить, что было в хранилище в поле name 
    }
}

// Получить Focus для хранения 

function getFocus() {
    if (localStorage.getItem('focus') === null) { // Если в поле focus ничего не было введено ранее, хранится null
        focus.textContent = '[Enter your Focus]';
    } else {
        focus.textContent = localStorage.getItem('focus'); // Получить, что было в хранилище в поле focus 
    }
}


// Задать имя 


name.addEventListener('click', () => { /// очистка поля NAME
    name.textContent = '';
})


function setName (e)  {  // узнаем в е, что нажали (какая кнопка)
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) { // Убедится что нажат keypress именно enter. Which (keycode - все браузеры) - это идентификатор 1-13
            if (!name.textContent.trim()) {
                name.textContent = localStorage.getItem('name');
                getName();
            } else {
                localStorage.setItem('name', e.target.innerText);
            }
            name.blur();
        }
    } else { // Задать в поле name, то что было введено при клике вне (не enter) 
        if (!name.textContent.trim()) {
            name.textContent = localStorage.getItem('name');
            getName();
        } else {
            localStorage.setItem('name', e.target.innerText);
        }
    }
}

// Задать Focus 



focus.addEventListener('click', () => { /// очистка поля FOCUS
    focus.textContent = '';
})


function setFocus (e)  {  // узнаем в е, что нажали (какая кнопка)
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) { // Убедится что нажат keypress именно enter. Which (keycode - все браузеры) - это идентификатор 1-13
            if (!focus.textContent.trim()) {
                focus.textContent = localStorage.getItem('focus');
                getFocus();
            } else {
                localStorage.setItem('focus', e.target.innerText);              
            }
            focus.blur();
        }
    } else { // Задать в поле name, то что было введено при клике вне (не enter) 
        if (!focus.textContent.trim()) {
            focus.textContent = localStorage.getItem('focus');
            getFocus();
        } else {
            localStorage.setItem('focus', e.target.innerText);
        }
    }
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

// Запустить 

showTime();
showDate();
changeBgGreet();
getName();
getFocus();
