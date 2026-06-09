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



// Update gui stats

function updateUiTime(game) {

    const timeDisplay = game.ui.timeDisplay;
    const v = 1; // speed
    const playingTime = game.state.playingTime * v; // This is measured in miliseconds

    function timeToValidText(time) {
        time = String(Math.floor(time));
        if (time.length == 1) return "0" + time;
        else return time
    }

    const centiseconds = timeToValidText((playingTime / 10) % 100)
    const seconds = timeToValidText((playingTime / 1000) % 60);
    const minutes = timeToValidText(playingTime / 60000);
    
    timeDisplay.textContent = minutes + ":" + seconds + ":" + centiseconds;
    
}