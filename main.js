createBoard(game);
createPiece(game, 1);

createCanvas(game);
drawCanvasBoard(game);
drawCanvasPiece(game);

//---Game loop---

let LastTime = 0;

let moveTimer = 0;
const MOVE_STEP = game.config.MOVE_STEP;

let gravityTimer = 0;
const GRAVITY_STEP = game.config.GRAVITY_STEP;

// Render at 30 FPS
let frameTimer = 0;
const FPS = game.config.FPS;
const STEP = 1000 / FPS;



function gameLoop(timestamp) {

    if (!LastTime) LastTime = timestamp;
    game.state.deltaTime = timestamp - LastTime;
    let deltaTime = game.state.deltaTime;

    frameTimer += deltaTime;
    moveTimer += deltaTime;
    gravityTimer += deltaTime;

    updateInput(game);
    
    if (game.input.rotate == deltaTime) rotate(game);
    if (game.input.drop == deltaTime) hardDrop(game);

    if (moveTimer >= MOVE_STEP) {
        move(game);
        updateGhostPiece(game);
        clearRows(game);
        moveTimer -= MOVE_STEP;
    };
    while (frameTimer >= STEP) {

        drawCanvasBoard(game);
        drawCanvasGhost(game);
        drawCanvasPiece(game);

        frameTimer -= STEP;
    };
    while (gravityTimer >= GRAVITY_STEP) {
        gravity(game);
        clearRows(game);
        gravityTimer -= GRAVITY_STEP;
    };

    LastTime = timestamp;

    requestAnimationFrame(gameLoop);
};

requestAnimationFrame(gameLoop);