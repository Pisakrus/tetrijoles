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

const COLORS = ["red", "lime", "black", "orange", "pink"];

function loadBeansTextures(game) {
    const BEANS_SOURCE = game.assets.BEANS_SOURCE;

    BEANS = BEANS_SOURCE.map(src => {
                const img = new Image();
                img.src = src;
                return img;
                })

    game.assets.BEANS = BEANS;
}


function drawCanvasCellBean(game, x, y, colorId) {

    const ctx = game.state.canvasCtx;
    const CELL_SIZE = game.config.CELL_SIZE;
    const beanTexture = game.assets.BEANS[colorId];


    function drawResizedBean(sx, sy, sw, sh) {
        ctx.drawImage(beanTexture,
                          sx, // top left corner of cropped image
                          sy,
                          sw,
                          sh,
                          CELL_SIZE * x + 1.5, // Where to draw image
                          CELL_SIZE * y + 1.5,
                          CELL_SIZE - 2.5, // How big the image is drawn 
                          CELL_SIZE - 2.5);
    }

    switch (colorId) {
        case 0 : // Case Red
            drawResizedBean(100, 100, 400, 400);
            break;

        case 1 : // Case Green
            drawResizedBean(100, 100, 600, 600);
            break;
        case 2 : // Case Black
            drawResizedBean(100, 100, 125, 125)
            break;
        case 3 : // Case Yellow
            drawResizedBean(50, 50, 300, 300)
            break;
    }
}


function drawCanvasCellColor(game, x, y, color="white") { //White color in case something goes wrong

    const ctx = game.state.canvasCtx;
    const CELL_SIZE = game.config.CELL_SIZE;
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
        drawCanvasCellBean(game, x, y, shapeId);
    };

};


function drawCanvasGhost(game) {
    const ctx = game.state.canvasCtx;
    const ghostPiece = game.activePiece.ghostPiece;
    const shapeId = game.activePiece.shapeId;

    ctx.globalAlpha = 0.3;
    for (block of ghostPiece) {
        drawCanvasCellColor(game, block.x, block.y, COLORS[shapeId]);
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
                drawCanvasCellBean(game, x, y, cellValue - 1);
            };

        };
    };
};