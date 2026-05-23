const game = {

    config : {
        COLUMNS : 10,
        ROWS : 16,
        CELL_SIZE : 70,
        DIFFICULTY : 1,
        MOVE_BUFFER : 120,
        MOVE_STEP : 85,
        GRAVITY_STEP : 750,
        FPS : 30
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
        blockMap : [],
        ghostPiece : []

    },

    //Input is tracked in ms pressed
    input : {
        left : 0,

        right : 0,

        down : 0,

        rotate : 0,

        drop : 0
    }

};