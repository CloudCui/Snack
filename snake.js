/**
 * Variables
 */
var x = y = 1;

const up = 1;
const right = 2;
const down = 3;
const left = 4;

var started = false;
var stopper;
var nextStep = '9_11';
var nextDirection = up;
var snake = ['9_10', '9_9'];

/**
 * Init after page is loaded
 */
document.addEventListener("DOMContentLoaded", function(event) { 
    init();
});

// CURRENTLY NOT BEING USED
// ---------------------------------------------------------------------
// /**
//  * Use input to Draw grid
//  */
// document.getElementById('submit').onclick = function (event) {
//     event.preventDefault();
//     var row = document.getElementById('row').value;
//     var col = document.getElementById('col').value;
//     // document.getElementById('table').innerHTML = createTable(row, col);
//     // document.getElementById('table').innerHTML = createTable(20, 20);
// };
// ---------------------------------------------------------------------

/**
 * Start / Stop
 *
 * If Started is clicked, start to move, by the interval of 1000 ms
 */
document.getElementById('switch').onclick = function (event) {
    event.preventDefault();
    if(!started) {
        // init();
        stopper = setInterval('move()', 1000);
        started = true;
    } else {
        window.clearInterval(stopper);
        started = !started;
    }
};

/**
 * Direction Listener
 */
document.onkeydown = function (e) {
    switch(e.keyCode) {
        case 37:
            nextDirection = left;
            break;
        case 38:
            nextDirection = up;
            break;
        case 39:
            nextDirection = right;
            break;
        case 40:
            nextDirection = down;
            break;
        default:
            break;
    }
};

/**
 * Init the grid, including:
 * - create the table
 * - create the snake
 */
function init() {
    document.getElementById('table').innerHTML = createTable(20, 20);
    render(snake);

}

/**
 * Create the table
 * TODO: to merge createRow() and createCell() together all in this function
 *       since they are doing the creating table, and nowhere else is using it
 */
function createTable(row, col) {
    var table = '<table><tbody>';
    for(var i = row; i > 0; i--) {
        table += createRow(i - 1, col);
    }
    table += '</tbody></table>';
    return table;
}

/**
 * create the row
 */
function createRow(r, col) {
    var row = '<tr>';
    for(var i = col; i > 0; i--) {
        row += createCell(r, col - i);
    }
    row += '</tr>';
    return row;
}

/**
 * create the cell
 */
function createCell(y, x) {
    var id = x + '_' + y;
    return '<td id = ' + id + '></td>';
}




/**
 * Draw the snake. Add the 'snakebody' class to the snake
 * This function does not care whether snake part needs to be removed
 *
 * @param s Snake
 */
function render(s) {
    for(var i = 0; i < s.length; i++) {
        var pos = s[i].split('_');
        console.log(pos);
        var sPart = document.getElementById(pos[0] + '_' + pos[1]);
        sPart.classList.add('snakebody');
    }
}


/**
 * Move, the next direction before actual move depends on the global @var nextStep
 */
function move() {

    console.log('move --> ' + nextDirection);

    var tmpPos = strToPos(snake[0]);
    switch(nextDirection) {
        case up:
            tmpPos[1]++;
            break;
        case right:
            tmpPos[0]++;
            break;
        case down:
            tmpPos[1]--;
            break;
        case left:
            tmpPos[0]--;
            break;
        default:
            break;
    }

    nextStep = posToStr(tmpPos);


    console.log(snake);


    rebuildSnake();

    // var el = document.getElementById(x + '_' + y);
    // el.classList.add('snakebody');
    // render(snake);
}


/**
 * Add the new cell to snake and remove the last from snake
 */
function rebuildSnake() {
    snake.unshift(nextStep);

    var tail = document.getElementById(snake.pop());
    tail.classList.remove('snakebody');


    for(var i = 0; i < snake.length; i++) {
        var el = document.getElementById(snake[i]);
        el.classList.add('snakebody');
    }
}

/**
 * return first element in Snake
 */
function getSnakeHead() {

}

function getSnakeHead() {
    return snake[0];
}

/**
 * x is array[0], y is array[1]
 * @param str
 * @returns {Array}
 */
function strToPos(str) {
    return str.split('_');
}

function posToStr(pos) {
    return pos[0] + '_' + pos[1];
}