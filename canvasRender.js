// Functions to render canvas later used in main.js

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
}


function fillGrid(x, y, color="red") {
    const previousColor = ctx.fillStyle
    ctx.fillStyle = color;
    ctx.fillRect(CELL_SIZE * x + 1.5,
                 CELL_SIZE * y + 1.5,
                 CELL_SIZE - 2.5,
                 CELL_SIZE - 2.5);
    ctx.fillStyle = previousColor
}

ctx.fillStyle = "red";


fillGrid(3, 5, "blue")
fillGrid(2, 4)
fillGrid(3, 4)
fillGrid(4,4)
fillGrid(5, 4, "green")
fillGrid(3, 3)
fillGrid(2, 3)
fillGrid(4, 3, "darkgreen")
fillGrid(5, 3, "darkgreen")