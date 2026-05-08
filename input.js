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

    game.input.up =
        keys["ArrowUp"] || keys["KeyW"];
};


