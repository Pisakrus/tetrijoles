// ---Tetris---

function createBoard(game) {
    const ROWS = game.config.ROWS;
    const COLUMNS = game.config.COLUMNS;

    let board = [];
    for (let i = 0; i < ROWS; i++) {
        let row = [];
        for (let j = 0; j < COLUMNS; j++) {
            row.push(0);
        }
        board.push(row);
    };
    
    game.state.board = board;
};

// Checks full rows and returns their index in a list.
function rowsToClear(board) {
    let fullRows = [];

    for(let y = 0; y < board.length; y++) {
        if (board[y].every(x => x !== 0)) {
            fullRows.push(y);
        };
    };
    return fullRows; 
};      


function clearRows(board, ...rowsToBeCleared) {
    
    for(i of rowsToBeCleared) {
        board.slice(i, 1)
        board.unshift(new Array(board.length).fill(0))
    };
}

function comboScore(nrows) {
    return nrows ** 2 * 10;
};

