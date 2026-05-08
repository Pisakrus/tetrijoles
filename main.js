createBoard(game);


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
    drawCanvasBoard(game);

    LastTime = timestamp;

    requestAnimationFrame(gameLoop);
};

requestAnimationFrame(gameLoop);