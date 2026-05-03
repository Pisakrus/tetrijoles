// Functions to render canvas later used in main.js

CELL_SIZE = game.config.CELL_SIZE
function createCanvasGrid(game) {    
    
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    // Draw grid lines

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2
    ctx.globalAlpha = 0.3

    // Vertical lines
    for (let i = CELL_SIZE; i < canvas.width; i+=CELL_SIZE) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
        console.log(i);
        
    }

    // Horizontal lines
    for (let i = CELL_SIZE; i < canvas.height; i+=CELL_SIZE) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
        console.log(i);
    }

    ctx.globalAlpha = 1

    return ctx
}


function fillGrid(x, y, color="red") {
    ctx = game.state.canvasrender
    const previousColor = ctx.fillStyle
    ctx.fillStyle = color;
    ctx.fillRect(CELL_SIZE * x + 1.5,
                 CELL_SIZE * y + 1.5,
                 CELL_SIZE - 2.5,
                 CELL_SIZE - 2.5);
    ctx.fillStyle = previousColor
}

