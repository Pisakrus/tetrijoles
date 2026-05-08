createBoard(game);
createPiece(game, 1);

game.state.board[6][1] = 1
game.state.board[6][2] = 2
game.state.board[6][3] = 3
game.state.board[6][4] = 4
game.state.board[6][5] = 5

game.state.board[7][1] = 1
game.state.board[7][2] = 2
game.state.board[7][3] = 3
game.state.board[7][4] = 4
game.state.board[7][5] = 5


createCanvas(game);
drawCanvasBoard(game);
drawCanvasPiece(game);


//---Game loop---

let LastTime = 0;

let moveTimer = 0;
const MOVE_STEP = 90;

let gravityTimer = 0;
const GRAVITY_STEP = 500;

// Render at 30 FPS
let frameTimer = 0;
const FPS = 30;
const STEP = 1000 / FPS;



function gameLoop(timestamp) {
    let deltaTime = timestamp - LastTime;
    frameTimer += deltaTime;
    moveTimer += deltaTime;

    updateInput(game);

    while (moveTimer >= MOVE_STEP) {
        move(game);
        moveTimer -= MOVE_STEP;
    };

    while (frameTimer >= STEP) {
        drawCanvasBoard(game);
        drawCanvasPiece(game);
        frameTimer -= STEP;
    };
    

    LastTime = timestamp;

    requestAnimationFrame(gameLoop);
};

requestAnimationFrame(gameLoop);