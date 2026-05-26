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
    ctx.lineWidth = 3;
    ctx.globalAlpha = 0.5;

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
                          CELL_SIZE * x + 3, // Where to draw image
                          CELL_SIZE * y + 3,
                          CELL_SIZE - 3, // How big the image is drawn 
                          CELL_SIZE - 3);
    }

    switch (colorId) {
        case 0 : // Case Red
            drawResizedBean(125, 125, 300, 300);
            break;

        case 1 : // Case Green
            drawResizedBean(100, 100, 600, 600);
            break;
        case 2 : // Case Black
            drawResizedBean(0, 0, 425, 425)
            break;
        case 3 : // Case Orange
            drawResizedBean(50, 50, 300, 300)
            break;
        case 4 : // Case chick peas
            drawResizedBean(250, 250, 330, 350)
    }
}


function drawCanvasCellColor(game, x, y, color="white") { //White color in case something goes wrong

    const ctx = game.state.canvasCtx;
    const CELL_SIZE = game.config.CELL_SIZE;
    const previousColor = ctx.fillStyle;

    ctx.fillStyle = color;
    ctx.fillRect(CELL_SIZE * x + 3,
                 CELL_SIZE * y + 3,
                 CELL_SIZE - 3,
                 CELL_SIZE - 3);
    ctx.fillStyle = previousColor;
};

function drawCell(game, x, y, shapeId, isBean=true) {
    if (isBean) drawCanvasCellBean(game, x, y, shapeId);
    else drawCanvasCellColor(game, x, y, COLORS[shapeId]);
}

function drawCanvasPiece(game) {
    const blockMap = game.activePiece.blockMap;
    const ox = game.activePiece.x;
    const oy = game.activePiece.y;
    const shapeId = game.activePiece.shapeId;

    for(let block of blockMap) {
        let x = ox + block.x;
        let y = oy + block.y;
        drawCell(game, x, y, shapeId);
    };

};


function drawCanvasGhost(game) {
    const ctx = game.state.canvasCtx;
    const ghostPiece = game.activePiece.ghostPiece;
    const shapeId = game.activePiece.shapeId;

    ctx.globalAlpha = 0.3;
    for (block of ghostPiece) {
        drawCell(game, block.x, block.y, shapeId);
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
                drawCell(game, x, y, cellValue - 1);
            };

        };
    };
};