// Functions to render canvas later used in main.js


function createCanvas(game) {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    game.state.canvas = canvas
    game.state.canvasCtx = ctx
};


function DrawGridLines(game) {
    const CELL_SIZE = game.config.CELL_SIZE;
    const canvas = game.state.canvas
    const ctx = game.state.canvasCtx;

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.3;

    // Vertical lines
    for (let i = CELL_SIZE; i < canvas.width; i+=CELL_SIZE) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
        
    };

    // Horizontal lines
    for (let i = CELL_SIZE; i < canvas.height; i+=CELL_SIZE) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
    };

    ctx.globalAlpha = 1
};

const COLORS = [null ,"red", "blue", "darkgreen", "yellow"] 


function fillCanvasCell(game, x, y, color="red") {
    const ctx = game.state.canvasCtx
    const  CELL_SIZE = game.config.CELL_SIZE
    const previousColor = ctx.fillStyle

    ctx.fillStyle = color;
    ctx.fillRect(CELL_SIZE * x + 1.5,
                 CELL_SIZE * y + 1.5,
                 CELL_SIZE - 2.5,
                 CELL_SIZE - 2.5);
    ctx.fillStyle = previousColor;
};


function DrawCanvasBoard(game) {
    const ctx = game.state.canvasCtx
    ctx.clearRect(0, 0, game.state.canvas.width, game.state.canvas.height)
    DrawGridLines(game)

    for (let y = 0; y < game.config.ROWS; y++) {
        for (let x = 0; x < game.config.COLUMNS; x++) {

            const cellValue = game.state.board[y][x]
            if (cellValue !== 0){ 
                fillCanvasCell(game, x, y, COLORS[cellValue])
            };

        };
    };

};