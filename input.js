const keys = {};

// Prevents keys from scrolling the page
const blockedKeys = [
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "Space"
];


window.addEventListener("keydown", (event) => {
    keys[event.code] = true;

    if (blockedKeys.includes(event.code)) {
        event.preventDefault();
    };
});

window.addEventListener("keyup", (event) => {
    keys[event.code] = false;
});


// When called, process keys pressed to update game.input
function updateInput(game) {

    //Add input
    deltaTime = game.state.deltaTime;

    if (keys["ArrowLeft"] || keys["KeyA"]) game.input.left += deltaTime;
    if (keys["ArrowRight"] || keys["KeyD"]) game.input.right += deltaTime;
    if (keys["ArrowDown"] || keys["KeyS"]) game.input.down += deltaTime;


    if (keys["ArrowUp"] || keys["KeyW"]) game.input.rotate += deltaTime;

    if (keys["Space"]) game.input.drop += deltaTime;


    //Delete input
    if (!keys["ArrowLeft"] && !keys["KeyA"]) game.input.left = 0;
    if (!keys["ArrowRight"] && !keys["KeyD"]) game.input.right = 0;
    if (!keys["ArrowDown"] && !keys["KeyS"]) game.input.down = 0;


    if (!keys["ArrowUp"] && !keys["KeyW"]) game.input.rotate = 0;

    if (!keys["Space"]) game.input.drop = 0;

};





