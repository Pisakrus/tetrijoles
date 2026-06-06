const pauseButton = document.getElementById("pauseButton");
const pauseLabel = pauseButton.querySelector(".label");
const pauseIcon = pauseButton.querySelector(".icon");

pauseButton.onclick = () => {
    if (game.state.pause) {
        pauseLabel.textContent = "Pause Game";
        pauseIcon.textContent = "⏸";
        game.state.pause = false;
    } else {
        pauseLabel.textContent = "Resume Game";
        pauseIcon.textContent = "▶";
        game.state.pause = true;
    }
};