const game = {

    config : {
        COLUMNS : 10,
        ROWS : 16,
        CELL_SIZE : 50,
        DIFFICULTY : 1,
        MOVE_BUFFER : 120,
        MOVE_STEP : 85,
        GRAVITY_STEP : 750,
        LOCK_DELAY : 400,
        MAX_LOCK_RESETS : 10,
        FPS : 30
    },

    state : {
        board : [],
        score : 0,
        gameIsOver : false,
        canvas : null,
        canvasCtx : null,

    },

    activePiece : {
        x : 5,
        y : 3,
        rotation : 0,
        movedThisFrame : false,
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
    },

    assets : {
        // O L T J I Z
        BEANS_SOURCE : ["images/red-beans.jpg", "images/green-peas.jpg", "images/black-beans.jpg", "images/tomato-beans.jpg", "images/chick-peas.jpg", "images/lentils.png"],
        BEANS : [],
        dryFartSound : new Audio("sounds/dry-fart.mp3"),
        youLostPayitoSound : new Audio("sounds/you-lost-payito.mp3")
    }

};