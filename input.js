const keys = {};

// Prevents keys from scrolling the page
const blockedKeys = [
  "ArrowUp",
  "ArrowDown"  
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
    game.input.left =
        keys["ArrowLeft"] || keys["KeyA"];

    game.input.right =
        keys["ArrowRight"] || keys["KeyD"];

    game.input.down =
        keys["ArrowDown"] || keys["KeyS"] ;

    game.input.rotate =
        keys["ArrowUp"] || keys["KeyW"];
    
    game.input.drop = keys["Space"];
};

function saveInput(game) {
    game.input.sLeft = game.input.left;
    game.input.sRight = game.input.right;
    game.input.sDown = game.input.down;
    game.input.sRotate = game.input.rotate;
}

function deleteSavedInput(game) {
    game.input.sLeft = false;
    game.input.sRight = false;
    game.input.sDown = false;
    game.input.sRotate = false;
}

