keys = {};


window.addEventListener("keydown", (key) => {
    keys[key.code] = true;
});

window.addEventListener("keyup", (key) => {
    keys[key.code] = false;
});



function updateInput(game) {
    game.input.left =  keys["ArrowLeft"] || keys["KeyA"];
    game.input.right = keys["ArrowRight"] || keys["KeyD"];
    game.input.down = keys["ArrowDown"] || keys["KeyS"] ;
    game.input.up = keys["ArrowUp"] || keys["KeysW"];
};


