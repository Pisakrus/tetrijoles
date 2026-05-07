createBoard(game);

game.state.board[3][5] = 1
game.state.board[4][5] = 1
game.state.board[5][5] = 2
game.state.board[3][4] = 3

createCanvas(game)
DrawCanvasBoard(game)



//---Game loop---

let LastTime = 0;
let dropTimer = 0;
// Render at 30 FPS
const FPS = 30;
const STEP = 1000 / FPS;



function gameLoop(timestamp) {
    let deltaTime = timestamp - LastTime;
    dropTimer += deltaTime;

    if (dropTimer > STEP) {
        // Update logic and input (placeholder)
        dropTimer -= STEP;
    };
    DrawCanvasBoard(game);

    LastTime = timestamp;

    requestAnimationFrame(gameLoop);
};

requestAnimationFrame(gameLoop);