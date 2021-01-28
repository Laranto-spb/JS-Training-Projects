function make3x3() {

    const field = document.createElement('div');
    field.className = 'field';
    document.body.append(field);
    field.style.height = `${300}px`
    field.style.width = `${300}px`
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
            return cell.value === cell.top * 3 + cell.left;
        });

        if (isFinished) {
            setTimeout("alert('You won!')", 600);
        }

    }

    const numbers = [...Array(8).keys()]
    //.sort(() => Math.random() - 0.5);

    for (let i = 1; i <= 8; i++) {
        const cell = document.createElement('div');
        const value = numbers[i - 1] + 1;
        cell.className = 'cell';

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

make3x3();