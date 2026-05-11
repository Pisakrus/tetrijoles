const game = {

    config : {
        COLUMNS : 10,
        ROWS : 14,
        CELL_SIZE : 80,
        DIFFICULTY : 1
    },

    state : {
        board : [],
        score : 0,
        canvas : null,
        canvasCtx : null,
    },

    activePiece : {
        x : 5,
        y : 3,
        rotation : 0,
        shapeId : 0,
        blockMap : []
    },

    input : {
        leftPressed : false,
        leftHeld : false,

        rightPressed : false,
        rightHeld : false,

        downPressed : false,
        downHeld : false,

        rotatePressed : false,
    }

};