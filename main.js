async function loadGame() {

    await loadBeansTextures(game);
    console.log("assets: ", game.assets)
    createBoard(game);
    createPiece(game, 1);
    createCanvas(game);
    drawCanvasBoard(game);
    drawCanvasPiece(game);
}


//---Game loop---

let LastTime = 0;

let moveTimer = 0;
const MOVE_BUFFER = game.config.MOVE_BUFFER; // Creates a difference beetween an instant action and a continous action
const MOVE_STEP = game.config.MOVE_STEP;

let gravityTimer = 0;
const GRAVITY_STEP = game.config.GRAVITY_STEP;

// Render at 30 FPS
let frameTimer = 0;
const FPS = game.config.FPS;
const STEP = 1000 / FPS;



function gameLoop(timestamp) {
    if (game.state.gameIsOver) return; 

    if (!LastTime) LastTime = timestamp;
    game.state.deltaTime = timestamp - LastTime;
    let deltaTime = game.state.deltaTime;

    frameTimer += deltaTime;
    gravityTimer += deltaTime;

    updateInput(game); // Add deltaTime to input if key is pressed
    
    //Check instant presses
    if (game.input.rotate == deltaTime && deltaTime != 0) rotate(game);
    if (game.input.drop == deltaTime && deltaTime != 0) hardDrop(game);

    if (game.input.left == deltaTime && deltaTime != 0) move(game, -1, 0);
    if (game.input.right == deltaTime && deltaTime != 0) move(game, 1, 0);
    if (game.input.down == deltaTime && deltaTime != 0) move(game, 0, 1);

    maxDirection = Math.max(game.input.left, game.input.right, game.input.down);

    if (maxDirection < moveTimer + MOVE_STEP) moveTimer = maxDirection;
    else moveTimer += deltaTime;

    // Check continous presses
    if (moveTimer >= MOVE_STEP && maxDirection >= MOVE_BUFFER) {
        if (game.input.left) move(game, -1, 0);
        if (game.input.right) move(game, 1, 0);
        if (game.input.down) move(game, 0, 1);    
        moveTimer -= MOVE_STEP;
    }

    while (frameTimer >= STEP) {

        drawCanvasBoard(game);
        updateGhostPiece(game);
        drawCanvasGhost(game);
        drawCanvasPiece(game);
        drawCanvasCellBean(game, 6, 6); // Test

        frameTimer -= STEP;
    }

    while (gravityTimer >= GRAVITY_STEP) {
        gravity(game);
        gravityTimer -= GRAVITY_STEP;
    }

    clearRows(game);
    if (game.state.gameIsOver) gameOver(game);


    LastTime = timestamp;

    requestAnimationFrame(gameLoop);
}


async function start() {

    await loadGame();
    requestAnimationFrame(gameLoop);
}

start();