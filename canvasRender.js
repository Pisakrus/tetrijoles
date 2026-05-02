const CELL_SIZE = 80

const canvas = document.getElementById("gameCanvas");

const ctx = canvas.getContext("2d");

ctx.fillStyle = "red";
ctx.fillRect(0, 0, CELL_SIZE - 1, CELL_SIZE - 1);

ctx.strokeStyle = "grey";

// Vertical lines
for (let i = CELL_SIZE + 1; i < canvas.width; i+=CELL_SIZE) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
    ctx.stroke();
    console.log(i);
    
}

// Horizontal lines
for (let i = CELL_SIZE + 1; i < canvas.height; i+=CELL_SIZE) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(canvas.width, i);
    ctx.stroke();
    console.log(i);
}
