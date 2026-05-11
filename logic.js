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

    for (let y = 0; y < board.length; y++) {
        if (board[y].every(x => x !== 0)) {
            fullRows.push(y);
        };
    };
    return fullRows; 
};      


// Deletes n full rows and insert n new ones at top.
function clearRows(board, ...rowsToBeCleared) {
    
    for (i of rowsToBeCleared) {
        board.slice(i, 1);
        board.unshift(new Array(board.length).fill(0));
    };
};

function comboScore(nrows) {
    return nrows ** 2 * 10;
};

const SHAPES = ["L", "T", "I", "O"];


const SHAPE_MAPS = {
    // Shape = central block and vectors from central block to other cells.
    // First coords are the central block. 
    // Priority is top to bottom (negative to positive) and left to right (negative to positive).

    "EMPTY" :[{x : 0, y : 0},
             {x : 0, y : 0},
             {x : 0, y : 0},
             {x : 0, y : 0}],

    /*
    0 1 0
    0 1 0
    0 1 1
    */
   "L" : [{x : 0, y : 0},
          {x : 0, y : -1},
          {x : 0, y : 1},
          {x : 1, y : 1}],

     /*
    1 1 1
    0 1 0
    0 0 0
    */         
    "T" : [{x : 0, y : 0},
           {x : 0, y : -1},
           {x : -1, y : -1},
           {x : 1, y : -1}],

    /*
    0 1 0
    0 1 0
    0 1 0
    0 1 0
    */
   // Center is at the lower block  
    "I" : [{x : 0, y : 0},
           {x : 0, y : -1},
           {x : 0, y : -2},
           {x : 0, y : 1}],

    /*
    0 0 0
    0 1 1
    0 1 1
    */   
    "O" : [{x : 0, y : 0},
           {x : 0, y : 1},
           {x : 1, y : 0},
           {x : 1, y : 1}],
     
};

function createPiece(game, newShapeId,) {
    game.activePiece.shapeId = newShapeId;
    game.activePiece.x = 4;
    game.activePiece.y =0;
    game.activePiece.blockMap = SHAPE_MAPS[SHAPES[newShapeId]]

}

// Check if movement of pieces collides with board.
function canMove(game, dx, dy) {
    const ROWS = game.config.ROWS;
    const COLUMNS = game.config.COLUMNS;
    const board = game.state.board;
    const ox = game.activePiece.x;
    const oy = game.activePiece.y;
    const blockMap = game.activePiece.blockMap;
    
    // Checks target position of every block
    for(let block of blockMap) {
        let x = ox + block.x + dx;
        let y = oy + block.y + dy;

        if (x < 0 || x >= COLUMNS) return false; // Checks collision with lateral walls

        if (y >= ROWS) return false; // Checks collision with floor of the board

        if (y < 0) continue; // Prevents an index error. Blocks above the visible board are ignored for collision checks

        if (board[y][x]) return false; // Checks collision with board blocks

    };

    return true;
};


function move(game) {
    const left = game.input.sLeft;
    const right = game.input.sRight;
    const down = game.input.sDown;

    let dx = 0;
    let dy = 0;

    if (right) dx += 1;
    else if (left) dx -= 1;
    if (down) dy += 1;

    if (canMove(game, dx, dy)) {
        game.activePiece.x += dx;
        game.activePiece.y += dy;
    }
};

