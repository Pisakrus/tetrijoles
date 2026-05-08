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
        shape : 0,
        blockmap : []
    },

    input : {
        left : false,
        right : false,
        down : false,
        rotate : false
    }

};