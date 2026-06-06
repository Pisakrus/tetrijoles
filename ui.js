// Pause button

function pauseGame(game) {
    if (game.state.paused) {
        game.ui.pauseLabel.textContent = "Pause Game";
        game.ui.pauseIcon.textContent = "⏸";
        game.state.paused = false;
    } else {
        game.ui.pauseLabel.textContent = "Resume Game";
        game.ui.pauseIcon.textContent = "▶";
        game.state.paused = true;
    }
}

game.ui.pauseButton.onclick = () => pauseGame(game);


game.ui.restartButton.onclick = () => {
    game.state.restarting = true;
}