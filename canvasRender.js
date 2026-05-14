// Functions to render canvas later used in main.js


function createCanvas(game) {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    game.state.canvas = canvas;
    game.state.canvasCtx = ctx;
};


function drawGridLines(game) {
    const CELL_SIZE = game.config.CELL_SIZE;
    const canvas = game.state.canvas;
    const ctx = game.state.canvasCtx;

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.4;

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

    ctx.globalAlpha = 1;
};

const COLORS = ["red", "lime", "cyan", "orange", "pink"];


function drawCanvasCell(game, x, y, color="white") { //White color in case something goes wrong

    const ctx = game.state.canvasCtx;
    const  CELL_SIZE = game.config.CELL_SIZE;
    const previousColor = ctx.fillStyle;

    ctx.fillStyle = color;
    ctx.fillRect(CELL_SIZE * x + 1.5,
                 CELL_SIZE * y + 1.5,
                 CELL_SIZE - 2.5,
                 CELL_SIZE - 2.5);
    ctx.fillStyle = previousColor;
};

function drawCanvasPiece(game) {
    const blockMap = game.activePiece.blockMap;
    const ox = game.activePiece.x;
    const oy = game.activePiece.y;
    const shapeId = game.activePiece.shapeId;

    for(let block of blockMap) {
        let x = ox + block.x;
        let y = oy + block.y;
        drawCanvasCell(game, x, y, COLORS[shapeId]);
    };

};


function drawCanvasGhost(game) {
    const ctx = game.state.canvasCtx;
    const ghostPiece = game.activePiece.ghostPiece;
    const shapeId = game.activePiece.shapeId;

    ctx.globalAlpha = 0.3;
    for (block of ghostPiece) {
        drawCanvasCell(game, block.x, block.y, COLORS[shapeId]);
    }
    ctx.globalAlpha = 1;
}   

function drawCanvasBoard(game) {
    const ROWS = game.config.ROWS;
    const COLUMNS = game.config.COLUMNS;
    const ctx = game.state.canvasCtx;

    ctx.clearRect(0, 0, game.state.canvas.width, game.state.canvas.height);
    drawGridLines(game);

    for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLUMNS; x++) {

            const cellValue = game.state.board[y][x];
            if (cellValue !== 0) {
                drawCanvasCell(game, x, y, COLORS[cellValue - 1]); // Assumes colors index starts at 0
            };

        };
    };
};