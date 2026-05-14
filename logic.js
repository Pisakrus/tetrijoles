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

// Check full rows and returns their index in a list.
function rowsToClear(game) {
    const board = game.state.board; 
    const fullRows = new Array();

    for (let y = 0; y < board.length; y++) {
        if (board[y].every(x => x !== 0)) {
            fullRows.push(y);
        };
    };
    return fullRows; 
};      


// Delete n full rows and insert n new ones at top.
function clearRows(game) {
    const COLUMNS = game.config.COLUMNS;
    const board = game.state.board;
    const toClear = rowsToClear(game);

    for (let i of toClear) {
        board.splice(i, 1); // Delete row
        board.unshift(new Array(COLUMNS).fill(0)); // Create new row at the top
        const fartSound = new Audio("sounds/dry-fart.mp3");
        fartSound.play().catch(console.error);
    };
};  

function comboScore(nrows) {
    return nrows ** 2 * 10;
};

const SHAPES = ["O", "L", "T", "I"];


const SHAPE_MAPS = {
    // Shape = central block and vectors from central block to other cells.
    // First coords are the central block. 
    // Priority is top to bottom (negative to positive) and left to right (negative to positive).

    "EMPTY" :[{x : 0, y : 0},
             {x : 0, y : 0},
             {x : 0, y : 0},
             {x : 0, y : 0}],
    /*
    0 0 0
    0 1 1
    0 1 1
    */   
    "O" : [{x : 0, y : 0},
           {x : 0, y : 1},
           {x : 1, y : 0},
           {x : 1, y : 1}],

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
     
};

function createRandomShapeId() {
    return Math.floor(Math.random() * SHAPES.length);
}

function createPiece(game) {
    const newShapeId = createRandomShapeId();
    game.activePiece.shapeId = newShapeId;
    game.activePiece.x = 4;
    game.activePiece.y =0;
    game.activePiece.blockMap = SHAPE_MAPS[SHAPES[newShapeId]].map(b => ({...b})); 

}

// Check if movement of pieces collides with board.
function canMove(game, dx, dy) {
    const ROWS = game.config.ROWS;
    const COLUMNS = game.config.COLUMNS;
    const board = game.state.board;
    const ox = game.activePiece.x;
    const oy = game.activePiece.y;
    const blockMap = game.activePiece.blockMap;
    
    // Check target position of every block
    for(let block of blockMap) {
        let x = ox + block.x + dx;
        let y = oy + block.y + dy;

        if (x < 0 || x >= COLUMNS) return false; // Check collision with lateral walls

        if (y >= ROWS) return false; // Check collision with floor of the board

        if (y < 0) continue; // Prevent an index error. Blocks above the visible board are ignored for collision checks

        if (board[y][x]) return false; // Check collision with board blocks

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


function placePiece(game) {
    const ox = game.activePiece.x;
    const oy = game.activePiece.y;
    const shapeId = game.activePiece.shapeId;
    const blockMap = game.activePiece.blockMap;
    
    for(block of blockMap) {
        let x = ox + block.x;
        let y = oy + block.y

        game.state.board[y][x] = shapeId + 1;
    }
}


function gravity(game) {
    if (canMove(game, 0, 1)) {
        game.activePiece.y += 1
    }
    else {
        placePiece(game);
        createPiece(game); 
    }
}


function rotate(game, rotations=1) {
    if (!game.input.sRotate) return;
    if (game.activePiece.shapeId === 0) return; 

    const blockMap = game.activePiece.blockMap;
    const originalBlockMap = blockMap.map(block => ({...block}));

    game.input.sRotate = false;
    for (let i = 0; i < rotations; i++) {
        for (const block of blockMap) {
            [block.x, block.y] = [block.y, -block.x]; // Turn clockwise a block.
        }
    };

    // ---Check for collisions and correct position---

    if (canMove(game, 0, 0)) {
        return; // Simple rotation was succesful
    }
    else if (canMove(game, 0, -1)) {
        game.activePiece.y -= 1; // Piece collisions with something under it, so it goes one cell up.
    }


    // Check 1 cell lateral movements
    else if  (canMove(game, 1, 0)) {
        game.activePiece.x += 1;
    }
    else if  (canMove(game, -1, 0)) {
        game.activePiece.x -= 1;
    }

    // Check 2 cell movements
    else if (canMove(game, 0, -2)) {
        game.activePiece.y -= 2; // Piece collisions with something under it, so it goes one cell up.
    }
    else if  (canMove(game, 2, 0)) {
        game.activePiece.x += 2;
    }
    else if  (canMove(game, -2, 0)) {
        game.activePiece.x -= 2;x   
    }

    // Check diagonals
    else if  (canMove(game, 1, 1)) {
        game.activePiece.x += 1;
        game.activePiece.y += 1;
    }
    else if  (canMove(game, 1, -1)) {
        game.activePiece.x += 1;
        game.activePiece.y -= 1;
    }
    else if  (canMove(game, -1, 1)) {
        game.activePiece.x -= 1;
        game.activePiece.y += 1;
    }
    else if  (canMove(game, -1, -1)) {
        game.activePiece.x -= 1;
        game.activePiece.y -= 1;
    }

    else {
        game.activePiece.blockMap = originalBlockMap; // Reverts rotation attempt
    }
}   


function getGhostY(game) {
    const oy = game.activePiece.y;
    const ROWS = game.config.ROWS;
    let dy = 0;
    let y = oy + dy;
    while (y < ROWS) {
        dy++;
        y = oy + dy;
        if (!canMove(game, 0, dy)) return y - 1;
    };
    return y;
}

function updateGhostPiece(game) {
    const ox = game.activePiece.x;
    const y = getGhostY(game);
    const blockMap = game.activePiece.blockMap;

    game.activePiece.ghostPiece = blockMap.map(block => ({
        x : ox + block.x,
        y : y + block.y
    }))
}

function hardDrop(game) {
    const drop = game.input.drop;

    if (!drop) return; // Leave function if drop is false

    game.activePiece.y = getGhostY(game);
    placePiece(game);
    createPiece(game);
}

