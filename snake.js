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
var nextDirection = 1;

var snake = [];

/**
 * Init after page is loaded
 */
document.addEventListener("DOMContentLoaded", function(event) { 
    init();
});

/**
 * Use input to Draw grid
 */
document.getElementById('submit').onclick = function (event) {
    event.preventDefault();
    var row = document.getElementById('row').value;
    var col = document.getElementById('col').value;
    // document.getElementById('table').innerHTML = createTable(row, col);
    // document.getElementById('table').innerHTML = createTable(20, 20);
};

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
    // console.log(e.keyCode);
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
    
    snake = ['9_10', '9_9'];

    render(snake);
    // var cell;
    for(i = 0; i < snake.length; i++) {
        var pos = snake[i].split('_');
        console.log(pos);
        var snakePart = document.getElementById(pos[0] + '_' + pos[1]);
        snakePart.classList.add('snakebody');
    }
    
    x = 9;
    y = 10;
}

function render(snake) {

}

function log() {
    x++;
    y++;
    console.log(x + ' ' +  y);

}
function update() {

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
 * Move, the next direction before actual move depends on the global @var nextDirection
 */
function move() {
    switch(nextDirection) {
        case up:
            y++;
            break;
        case right:
            x++;
            break;
        case down:
            y--;
            break;
        case left:
            x--;
            break;
        default:
            break;
    }

    var el = document.getElementById(x + '_' + y);
    el.classList.add('snakebody');

}

function render() {

}
