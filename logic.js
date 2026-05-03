// ---Tetris---

function createBoard(config) {

    let board = [];
    for (let i = 0; i < config.ROWS; i++) {
        let row = [];
        for (let j = 0; j < config.COLUMNS; j++) {
            row.push(0);
        }
        board.push(row);
    };
    
    return board;
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

