async function loadGame() {

    await loadBeansTextures(game);
    console.log("assets: ", game.assets)

    if (!localStorage.getItem("highScore")) localStorage.setItem("highScore", "0"); // Create maxScore if it has no value
    createBoard(game);
    createPiece(game);
    createCanvas(game);
    drawCanvasBoard(game);
    drawCanvasPiece(game);
}


document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        game.state.paused = true;
    } else {
        game.state.paused = false;
    }
});


//---Game loop---

let LastTime = 0;

let moveTimer = 0;
const MOVE_BUFFER = game.config.MOVE_BUFFER; // Creates a difference beetween an instant action and a continous action
const MOVE_STEP = game.config.MOVE_STEP;

let gravityTimer = 0;
const GRAVITY_STEP = game.config.GRAVITY_STEP;

let lockDelayTimer = 0;
const LOCK_DELAY = game.config.LOCK_DELAY;
let lockResetCounter = 0
const MAX_LOCK_RESETS = game.config.MAX_LOCK_RESETS;


// Render at 30 FPS
let frameTimer = 0;
const FPS = game.config.FPS;
const STEP = 1000 / FPS;



function gameLoop(timestamp) {


    // No playing states

    if (game.state.restarting) {
        createBoard(game);
        createPiece(game);
        saveHighScore(game);

        game.state.score = 0;
        game.state.combo = 0;
        game.state.playingTime = 0;


        //Restore pauseButton state
        game.state.paused = true;
        clickPauseGame(game);

        moveTimer = 0;
        gravityTimer = 0;
        lockDelayTimer = 0;
        lockResetCounter = 0;
        frameTimer = 0;
        game.state.restarting = false;
        game.state.gameIsOver = false;
        game.state.gameOverAlreadyShown = false;
    }
    
    if (game.state.paused) {
        LastTime = timestamp;
        requestAnimationFrame(gameLoop);
        return;
    }

    if (game.state.gameIsOver) {

        if (!game.state.gameOverAlreadyShown) {
            game.assets.youLostPayitoSound.play()
            saveHighScore(game);
            
            window.alert(`You ate more beans than you could handle... GAME OVER\n\n Score: ${game.state.score}\n High Score: ${localStorage.getItem("highScore")}`);
            game.state.gameOverAlreadyShown = true;
        }

        LastTime = timestamp;
        requestAnimationFrame(gameLoop);
        return;
    } 

    // Playing state

    if (!LastTime) LastTime = timestamp;
    game.state.deltaTime = timestamp - LastTime;
    let deltaTime = game.state.deltaTime;
    game.state.playingTime += deltaTime;

    game.activePiece.movedThisFrame = false; // move and rotate make this true
    if (game.activePiece.grounded) lockDelayTimer += deltaTime;
    frameTimer += deltaTime;
    gravityTimer += deltaTime;

    updateInput(game); // Add deltaTime to input if key is pressed
    
    //Check instant presses
    if (game.input.rotate == deltaTime && deltaTime != 0) rotate(game);
    if (game.input.drop == deltaTime && deltaTime != 0) {
        hardDrop(game);
        gravityTimer = 0;
        lockDelayTimer = 0;
        lockResetCounter = 0;
    }

    if (game.input.left == deltaTime && deltaTime != 0) move(game, -1, 0);
    if (game.input.right == deltaTime && deltaTime != 0) move(game, 1, 0);
    if (game.input.down == deltaTime && deltaTime != 0 && canMove(game, 0, 1)) {
        game.state.score += 2;
        move(game, 0, 1);
    }

    let maxDirection = Math.max(game.input.left, game.input.right, game.input.down);

    if (maxDirection < moveTimer + MOVE_STEP) moveTimer = maxDirection;
    else moveTimer += deltaTime;

    // Check continous presses
    if (moveTimer >= MOVE_STEP && maxDirection >= MOVE_BUFFER) {
        if (game.input.left) move(game, -1, 0);
        if (game.input.right) move(game, 1, 0);
        if (game.input.down && canMove(game, 0, 1)) {
            game.state.score += 1;
            move(game, 0, 1);
        }
        moveTimer -= MOVE_STEP;
    }


    // Updates grounded state
    if (canMove(game, 0, 1)) game.activePiece.grounded = false;
    else game.activePiece.grounded = true;

    if (gravityTimer >= GRAVITY_STEP) {
        if (!game.activePiece.grounded) game.activePiece.y += 1;
        gravityTimer -= GRAVITY_STEP;
    }

    // Resets lockDelayTimer if any movement is done. 
    if (game.activePiece.grounded && game.activePiece.movedThisFrame && lockResetCounter <= MAX_LOCK_RESETS) {
        lockDelayTimer = 0;
        lockResetCounter += 1;
    }

    // Lock Piece
    if (lockDelayTimer >= LOCK_DELAY) {
        console.log("Piece placed at: ", timestamp)
        lockPiece(game);
        createPiece(game);
        lockDelayTimer = 0;
        lockResetCounter = 0;
    }



    // Render Everything
    if (frameTimer >= STEP) {

        drawCanvasBoard(game);
        updateGhostPiece(game);
        drawCanvasGhost(game);
        drawCanvasPiece(game);

        updateUiScore(game);
        updateUiCombo(game);
        updateUiTime(game);
        frameTimer -= STEP;
    }


    LastTime = timestamp;

    requestAnimationFrame(gameLoop);
}


async function start() {

    await loadGame();
    requestAnimationFrame(gameLoop);
}

start();