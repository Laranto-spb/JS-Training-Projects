const menu = document.createElement('div');
menu.className = 'start__menu';
document.body.append(menu);

menu.innerHTML = '<h1 class="title"> Добро пожаловать в игру Пятнашки!</h1><p class="choose__level">Выберите сложность (размер поля): <button  class="field-btn easy"> 3 на 3 </button> <button class="field-btn hard"> 4 на 4 </button> </p><h2>Правила</h2><p class="rules">Игроку доступно поле размером 4x4 или 3х3, состоящее из 16 или 9 клеток соответственно. Все клетки кроме одной заняты костяшками с номерами, которые перемешаны между собой. Цель игры - упорядочить костяшки по порядку используя свободное поле. Свободное поле в конце игры дожно быть на первом месте. </p>';



const easyLevel = document.querySelector('.easy');
const hardLevel = document.querySelector('.hard');

const soundOnOff = document.createElement('div');
soundOnOff.className = 'sound__trigger';
document.body.append(soundOnOff);






function make3x3() {
    document.body.style.backgroundImage = "url('img/sand-bg.jpg')";
  
    const field = document.createElement('div');
    field.className = 'field';
    document.body.append(field);
    field.style.height = `${300}px`;
    field.style.width = `${300}px`;
    field.style.marginTop = `${-150}px`;
    field.style.marginLeft = `${-150}px`;
    const cellSize = 100;

    const empty = {
        value: 0,
        top: 0,
        left: 0
    }

    const cells = [];
    cells.push(empty);

    function move(index) {
        const cell = cells[index];

        const leftDiff = Math.abs(empty.left - cell.left);
        const topDiff = Math.abs(empty.top - cell.top);

        if (leftDiff + topDiff > 1) {
            soundOut();
            return;
        }
        soundClick();

        cell.element.style.left = `${empty.left * cellSize}px`;
        cell.element.style.top = `${empty.top * cellSize}px`;
        const emptyLeft = empty.left;
        const emptyTop = empty.top;
        empty.left = cell.left;
        empty.top = cell.top;
        cell.left = emptyLeft;
        cell.top = emptyTop;

        const isFinished = cells.every(cell => {
            return cell.value === cell.top * 3 + cell.left;
        });

        if (isFinished) {
            setTimeout("alert('You won!')", 600);
        }


    }

    const numbers = [...Array(8).keys()]
        .sort(() => Math.random() - 0.5);

    for (let i = 1; i <= 8; i++) {
        const cell = document.createElement('div');
        const value = numbers[i - 1] + 1;
        cell.className = 'cell';
        cell.style.width = `${100}px`;
        cell.style.height = `${100}px`;

        cell.innerHTML = value;
        field.append(cell);

        const left = i % 3;
        const top = (i - left) / 3;

        cells.push({
            value: value,
            top: top,
            left: left,
            element: cell
        })

        cell.style.left = `${left * cellSize}px`;
        cell.style.top = `${top * cellSize}px`;

        cell.addEventListener('click', () => {
            move(i);
        })
    }
}

function make4x4() {

    document.body.style.backgroundImage = "url('img/sand-bg.jpg')";

    const field = document.createElement('div');
    field.className = 'field';
    document.body.append(field);
    field.style.height = `${300}px`;
    field.style.width = `${300}px`;
    field.style.marginTop = `${-150}px`;
    field.style.marginLeft = `${-150}px`;
    const cellSize = 75;

    const empty = {
        value: 0,
        top: 0,
        left: 0
    }

    const cells = [];
    cells.push(empty);

    function move(index) {
        const cell = cells[index];

        const leftDiff = Math.abs(empty.left - cell.left);
        const topDiff = Math.abs(empty.top - cell.top);

        if (leftDiff + topDiff > 1) {
            soundOut();
            return;
        }

        cell.element.style.left = `${empty.left * cellSize}px`;
        cell.element.style.top = `${empty.top * cellSize}px`;

        const emptyLeft = empty.left;
        const emptyTop = empty.top;
        empty.left = cell.left;
        empty.top = cell.top;
        cell.left = emptyLeft;
        cell.top = emptyTop;

        const isFinished = cells.every(cell => {
            return cell.value === cell.top * 4 + cell.left;
        });

        if (isFinished) {
            setTimeout("alert('You won!')", 600);
        }
        soundClick();

    }

    const numbers = [...Array(15).keys()]
        .sort(() => Math.random() - 0.5);

    for (let i = 1; i <= 15; i++) {
        const cell = document.createElement('div');
        const value = numbers[i - 1] + 1;
        cell.className = 'cell';
        cell.style.width = `${75}px`;
        cell.style.height = `${75}px`;

        cell.innerHTML = value;
        field.append(cell);

        const left = i % 4;
        const top = (i - left) / 4;

        cells.push({
            value: value,
            top: top,
            left: left,
            element: cell
        })

        cell.style.left = `${left * cellSize}px`;
        cell.style.top = `${top * cellSize}px`;

        cell.addEventListener('click', () => {
            move(i);
            
        })
    }
}


soundOnOff.addEventListener('click', () => {
    soundOnOff.classList.toggle('off');


})

function soundClick() {
    const audio = new Audio();
    audio.src = 'sound/move.mp3';
    if (soundOnOff.classList.contains('off')) {
        audio.muted = true;
    } else {
    audio.autoplay = true;
    audio.muted = false;        
    }

}

function soundOut() {
    const audio = new Audio();
    audio.src = 'sound/out.mp3';
    if (soundOnOff.classList.contains('off')) {
        audio.muted = true;
    } else {
    audio.autoplay = true;
    audio.muted = false;        
    }
    
}


easyLevel.addEventListener('click', () => {
    menu.remove();
    make3x3();
})

hardLevel.addEventListener('click', () => {
    menu.remove();
    make4x4();
})