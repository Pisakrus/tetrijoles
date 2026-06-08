// Pause button

function clickPauseGame(game) {

    //Paused to running
    if (game.state.paused) {
        game.ui.pauseLabel.textContent = "Pause Game";
        game.ui.pauseIcon.textContent = "⏸";
        game.state.paused = false;

    // Running to paused
    } else {
        drawGameIsPaused(game);
        game.ui.pauseLabel.textContent = "Resume Game";
        game.ui.pauseIcon.textContent = "▶";
        game.state.paused = true;
    }
}

game.ui.pauseButton.onclick = () => clickPauseGame(game);


game.ui.restartButton.onclick = () => {
    game.state.restarting = true;
}