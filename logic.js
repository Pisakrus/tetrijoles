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
    
    return board
}

