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


    function updateUiScore(game) {

        const scoreDiff = game.state.score - game.ui.growingScore;
        const scoreRatio = game.state.score / game.ui.growingScore;

        game.ui.growingScore += Math.round(game.state.deltaTime ** scoreRatio);
        if (game.ui.growingScore >= game.state.score || scoreDiff < 1) game.ui.growingScore = game.state.score; 
        
        game.ui.scoreDisplay.textContent = game.ui.growingScore;
    }

function updateUiCombo(game) {
    game.ui.comboDisplay.textContent = game.state.combo;
}


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

function playFartCombo(game) {
    const dryFartSound = game.assets.dryFartSound;
    const combo = game.state.combo; 


    // const scale = [0, 2, 4, 5, 7, 9, 11, 12]; Major scale
    const scale = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const octave = Math.floor(combo / scale.length)
    const index = combo % scale.length;
    const rate =  octave - 0.03 + 2 ** (scale[index] / 12);

    dryFartSound.preservesPitch = false; // Chrome/Safari
    dryFartSound.mozPreservesPitch = false; // Firefox
    dryFartSound.webkitPreservesPitch = false; // Older Safari

    dryFartSound.playbackRate = rate;
    dryFartSound.play().catch(console.error);
}