const game = {

    config : {
        COLUMNS : 10,
        ROWS : 14,
        CELL_SIZE : 80,
    },

    state : {
        board : [],
        score : 0,
        canvas : null,
        canvasCtx : null
    },

    input : {
        left : false,
        right : false,
        down : false,
        rotate : false
    }

};